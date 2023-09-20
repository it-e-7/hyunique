package com.kosa5.hyunique.post.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.DeleteObjectsResult;
import com.amazonaws.services.s3.model.MultiObjectDeleteException;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    private final AmazonS3 amazonS3;
    private final String bucketName;
    private final AmazonS3Client amazonS3Client;
    
    Logger log = LogManager.getLogger("case3");

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    public S3Service(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucketName, AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    public List<String> getUploadImgURL(List<String> base64Images) {
        List<String> keys = new ArrayList<>();
        List<String> urls = new ArrayList<>();

        for(String base64Img : base64Images) {
            String fileName = createImgFileName();
            String returnUrl = uploadBase64Img(base64Img, fileName, "post/");

            keys.add("post/" + fileName);
            // s3에 이미지 업로드를 실패한 경우
            if (returnUrl == null) {
                deleteImgFile(keys);
                return null;
            }

            // 업로드 성공한 경우
            urls.add(returnUrl);
        }
        return urls;
    }

    public String createImgFileName() {
        return UUID.randomUUID().toString() + ".jpg";
    }

    // base64 디코딩 및 업로드
    public String uploadBase64Img(String base64Img, String fileName, String dir) {
        byte[] imgBytes = Base64.getDecoder().decode(base64Img);

        try (InputStream inputStream = new ByteArrayInputStream(imgBytes)) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imgBytes.length);
            metadata.setContentType("image/jpeg");
            amazonS3.putObject(new PutObjectRequest(bucketName, dir + fileName, inputStream, metadata));

            return amazonS3Client.getUrl(bucketName, dir + fileName).toString();
        } catch (Exception e) {
            e.printStackTrace();
            log.info("e.printStackTrace(); = " + e.getStackTrace());
            return null;
        }
    }

    // 이미지 파일 업로드
    public String uploadImgFiles(MultipartFile file, String fileName, String dir) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType("image/jpeg");
            amazonS3.putObject(new PutObjectRequest(bucketName, dir + fileName, file.getInputStream(), metadata));

            return amazonS3Client.getUrl(bucketName, dir + fileName).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, String> getUploadImgFileURL(MultipartFile[] files) {
        Map <String, String> keys = new LinkedHashMap<>();

        for(MultipartFile file : files) {
            String fileName = createImgFileName();
            String returnUrl = uploadImgFiles(file, fileName, "post/");

            // s3에 이미지 업로드를 실패한 경우
            if (returnUrl == null) {
                deleteImgFile(new ArrayList<>(keys.keySet()));
                return null;
            }

            // 업로드 성공한 경우
            keys.put("post/" + fileName, returnUrl);
        }
        return keys;
    }

    // 이미지 삭제
    public void deleteImgFile(List<String> files) {

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();
        try {
            DeleteObjectsRequest dor = new DeleteObjectsRequest(bucketName).withKeys(files.toArray(new String[0]));
            DeleteObjectsResult deleteObjectsResult = s3.deleteObjects(dor);
            List<DeleteObjectsResult.DeletedObject> deletedObjects = deleteObjectsResult.getDeletedObjects();
            log.info("Deleted objects: {}", deletedObjects.stream().map(DeleteObjectsResult.DeletedObject::getKey).collect(Collectors.joining(", ")));
        } catch (MultiObjectDeleteException e) {
            List<MultiObjectDeleteException.DeleteError> errors = e.getErrors();
            for (MultiObjectDeleteException.DeleteError error : errors) {
                log.info("Error: " + error.getCode() + ", Key: " + error.getKey());
            }
        }
    }

}
