package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.controller.TaskController;
import com.example.demo.repository.TaskRepository;
import com.example.demo.service.TaskService;

@SpringBootApplication
public class ToDoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoBackendApplication.class, args);
		
	}

}
