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

    // 업로드 트랜잭션 처리
    public boolean decodingBase64Img(List<String> base64Images) {
        List<URL> urls = new ArrayList<>();
        Map<String, URL> imgUploadState = new HashMap<>();

        for(String base64Img : base64Images) {
            String fileName = UUID.randomUUID().toString() + ".jpg";
            URL returnUrl = uploadBase64Img(base64Img, fileName);

            Iterator<String> keyIterator = imgUploadState.keySet().iterator();

            while (keyIterator.hasNext()) {
                String key = keyIterator.next();
                System.out.println("Key: " + key + ", Value: " + imgUploadState.get(key));
            }
//            return false;

/*            // s3에 이미지 업로드를 실패한 경우
            if (returnUrl == null) {

                Iterator<String> keyIterator = imgUploadState.keySet().iterator();

                while (keyIterator.hasNext()) {
                    String key = keyIterator.next();
                    System.out.println("Key: " + key + ", Value: " + imgUploadState.get(key));
                }
                return false;
            }*/
            imgUploadState.put(fileName, returnUrl);
        }
        return true;
    }

    // base64 디코딩 및 업로드
    public URL uploadBase64Img(String base64Img, String fileName) {
        byte[] imgBytes = Base64.getDecoder().decode(base64Img);

        try (InputStream inputStream = new ByteArrayInputStream(imgBytes)) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imgBytes.length);
            amazonS3.putObject(new PutObjectRequest(bucketName, "post/" + fileName, inputStream, metadata));

            return amazonS3Client.getUrl(bucketName, fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 이미지 삭제
    public void deleteImg(String[] files) {

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();

        try {
            DeleteObjectsRequest dor = new DeleteObjectsRequest(bucketName).withKeys(files);
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
