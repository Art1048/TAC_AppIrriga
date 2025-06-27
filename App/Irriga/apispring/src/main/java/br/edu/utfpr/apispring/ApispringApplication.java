package br.edu.utfpr.apispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@SecurityScheme(
		name = "Authentication",
		type = SecuritySchemeType.HTTP,
		scheme = "bearer",
		bearerFormat = "JWT"
	)
@SpringBootApplication
public class ApispringApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApispringApplication.class, args);
	}

}
