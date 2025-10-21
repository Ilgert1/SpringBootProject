package com.example.nobsv2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Nobsv2Application {

	public static void main(String[] args) {

		System.out.println("Hello World!");
		System.out.println("Testing nobsv2!");

		SpringApplication.run(Nobsv2Application.class, args);
	}

}
