package com.kosa5.hyunique.post.util;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.*;

import javax.imageio.ImageIO;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.*;


@Service
public class S3Service {

    private final AmazonS3 amazonS3;
    private final String bucketName;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    public S3Service(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucketName, AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    public List<URL> getUploadImgURL(List<String> base64Images) {
        Map<String, URL> imgUploadState = new HashMap<>();

        for(String base64Img : base64Images) {
            String fileName = createImgFileName();

            URL returnUrl = uploadBase64Img(base64Img, fileName, "post/");

            // s3에 이미지 업로드를 실패한 경우
            if (returnUrl == null) {
                List<String> deleteKeys = new ArrayList<>();
                Iterator<String> keyIterator = imgUploadState.keySet().iterator();

                while (keyIterator.hasNext()) {
                    String key = keyIterator.next();
                    deleteKeys.add("/post"+key);
                }
                deleteImgFile(deleteKeys);
                return null;
            }
            // 업로드 성공한 경우
            imgUploadState.put(fileName, returnUrl);
        }
        return new ArrayList<>(imgUploadState.values());
    }

    public String createImgFileName() {
        return UUID.randomUUID().toString() + ".jpg";
    }

    // base64 디코딩 및 업로드
    public URL uploadBase64Img(String base64Img, String fileName, String dir) {
    	
        byte[] imgBytes = Base64.getDecoder().decode(base64Img);

        try (InputStream inputStream = new ByteArrayInputStream(imgBytes)) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imgBytes.length);
            metadata.setContentType("image/jpeg");
            amazonS3.putObject(new PutObjectRequest(bucketName, dir + fileName, inputStream, metadata));

            return amazonS3Client.getUrl(bucketName, dir + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 이미지 삭제
    public void deleteImgFile(List<String> files) {

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();

        try {
            DeleteObjectsRequest dor = new DeleteObjectsRequest(bucketName).withKeys(String.valueOf(files));
            DeleteObjectsResult deleteObjectsResult = s3.deleteObjects(dor);
            List<DeleteObjectsResult.DeletedObject> deletedObjects = deleteObjectsResult.getDeletedObjects();

            System.out.println("Successfully deleted all the specified objects");

            for (DeleteObjectsResult.DeletedObject deletedObject : deletedObjects) {
                System.out.println("Deleted Object Key: " + deletedObject.getKey());
            }

        } catch (MultiObjectDeleteException e) {
            System.out.println("One or more objects could not be deleted");
            System.out.println("Error Message: " + e.getErrorMessage());
            System.out.println("Status Code: " + e.getStatusCode());
            System.out.println("Error Code: " + e.getErrorCode());
            System.out.println("Request ID: " + e.getRequestId());

            List<MultiObjectDeleteException.DeleteError> errors = e.getErrors();
            for (MultiObjectDeleteException.DeleteError error : errors) {
                System.out.println("Error: " + error.getCode() + ", Key: " + error.getKey());
            }
        }

    }

}
