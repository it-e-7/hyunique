package com.kosa5.hyunique.payment.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoVO {
    String productId;
    String productBrand;
    String productName;
    String productSize;
    String productColor;
    String orderId;
}
