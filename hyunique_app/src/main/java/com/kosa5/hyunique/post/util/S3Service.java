package com.kosa5.hyunique.post.util;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
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


}
