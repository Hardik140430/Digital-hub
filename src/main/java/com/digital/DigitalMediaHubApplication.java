package com.digital;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DigitalMediaHubApplication {

	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(DigitalMediaHubApplication.class);

		String port = System.getenv("PORT");
		if (port != null) {
			app.setDefaultProperties(Collections.singletonMap("server.port", port));
		}

		app.run(args);

	}

}
