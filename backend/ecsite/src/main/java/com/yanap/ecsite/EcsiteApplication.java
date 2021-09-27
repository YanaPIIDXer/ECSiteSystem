package com.yanap.ecsite;

import com.stripe.Stripe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcsiteApplication {

	public static void main(String[] args) {
		Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY");
		SpringApplication.run(EcsiteApplication.class, args);
	}

}
