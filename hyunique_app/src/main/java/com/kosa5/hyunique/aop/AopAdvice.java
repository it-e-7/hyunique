package com.kosa5.hyunique.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AopAdvice {
   
   // java.util.logging을 사용하려면 이 라인을 살려주세요.
   // private static final Logger log = Logger.getLogger(AopAdvice.class.getName());

   // SLF4J 사용을 위한 로거 생성
   private static final Logger log = LoggerFactory.getLogger(AopAdvice.class);

   @Before("execution(* com.kosa5.hyunique.user.controller.UserController.*(..))")
   public void ad_before() {
      log.info("★★★★★★★★★★★");
      log.info("★   before advice  ★");
      log.info("★★★★★★★★★★★");
   }
   
   @After("execution(* com.kosa5.hyunique.user.controller.UserController.*(..))")
   public void ad_after() {
      log.info("★★★★★★★★★★★");
      log.info("★   after advice   ★");
      log.info("★★★★★★★★★★★");
   }
   
   @Around("execution(* com.kosa5.hyunique.user.controller.UserController.*(..))")
   public Object ad_around(ProceedingJoinPoint joinPoint) {
      log.info("★★★★★★★★★★★★★★★");
      log.info("★   around (before) advice ★");
      log.info("★★★★★★★★★★★★★★★");
      
      Object obj = null;
      
      try {
         log.info("시간측정을 시작합니다");
         long start = System.currentTimeMillis();
         obj = joinPoint.proceed();
         long end = System.currentTimeMillis();
         log.info("시간측정을 종료합니다");
         log.info("소요시간 : " + ((double)end - start)/1000 + "초");
         
      } catch (Throwable e) {
         e.printStackTrace();
      }
      
      log.info("★★★★★★★★★★★★★★★");
      log.info("★   around (after)  advice ★");
      log.info("★★★★★★★★★★★★★★★");
      return obj;
   }
   
   
 
}
