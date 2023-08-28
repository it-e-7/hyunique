package com.kosa5.hyunique.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
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
   
   
 */
	
    @AfterThrowing(value = "execution(* com.kosa5.hyunique.user.service.UserService.*(..))", throwing = "ex")
    public void afterThrowingAdvice(JoinPoint joinPoint, Exception ex) {

        log.info("Exception is:" + ex.getMessage());
    }
	
}
