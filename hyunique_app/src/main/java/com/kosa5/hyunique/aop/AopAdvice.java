package com.kosa5.hyunique.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;
@Log4j2
@Aspect
@Component
public class AopAdvice {

//   @Before("execution(* com.kosa5.hyunique.user.controller.UserController.*(..))")
//   public void ad_before() {
//      log.info("★★★★★★★★★★★");
//      log.info("★   before advice  ★");
//      log.info("★★★★★★★★★★★");
//   }
   
/*   @After("execution(* com.kosa5.hyunique.user.controller.UserController.*(..))")
   public void ad_after() {
      log.info("★★★★★★★★★★★");
      log.info("★   after advice   ★");
      log.info("★★★★★★★★★★★");
   }
   */
   @Around("execution(* com.kosa5.hyunique.*.controller.*.*(..))")
   public Object ad_around(ProceedingJoinPoint joinPoint) {
      
      Object obj = null;
      
      MethodSignature signature = (MethodSignature) joinPoint.getSignature();
      String methodName = signature.getMethod().getName();
      
      try {
         long start = System.currentTimeMillis();
         obj = joinPoint.proceed();
         long end = System.currentTimeMillis();
         log.info("메소드 [" + methodName + "] 소요시간 : " + ((double)end - start)/1000 + "초");
         
      } catch (Throwable e) {
         e.printStackTrace();
      }
      
      return obj;
   }
   
   
 
	
    @AfterThrowing(value = "execution(* com.kosa5.hyunique.user.service.UserService.*(..))", throwing = "ex")
    public void afterThrowingAdvice(JoinPoint joinPoint, Exception ex) {

        log.info("Exception is:" + ex.getMessage());
    }
	
}
