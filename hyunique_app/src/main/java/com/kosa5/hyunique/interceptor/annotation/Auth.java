package com.kosa5.hyunique.interceptor.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auth {

	public enum Role {
		AUTH, UNAUTH, ADMIN
	}
	
	public Role role() default Role.AUTH;
}
