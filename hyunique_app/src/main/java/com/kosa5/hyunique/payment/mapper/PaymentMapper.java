package com.kosa5.hyunique.payment.mapper;
import com.kosa5.hyunique.payment.vo.ProductInfoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PaymentMapper {

    //오더 아이디 만드는 매퍼
    int insertPurchaseHistory(@Param("orderId")String orderId, @Param("userId")int userId, @Param("totalPrice")int totalPrice);
    //오더 아이디와 해당하는 상품리스트를 만드는 매퍼
    int insertPurchaseProduct(ProductInfoVO productInfoVO);
}
