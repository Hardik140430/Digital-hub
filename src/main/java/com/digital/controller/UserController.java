package com.digital.controller;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digital.entity.User;
import com.digital.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UserController {

	private final UserRepository userRepository;

	@Autowired
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		System.out.println("in usr");
		User savedUser = userRepository.save(user);
		throw new RuntimeException();
	
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		return userOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PatchMapping("/{id}")
	public ResponseEntity<User> updateField(@PathVariable Long id, @RequestParam String field,
			@RequestParam String value) {
		Optional<User> userOptional = userRepository.findById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		User user = userOptional.get();

		switch (field) {
		case "name":
			user.setName(value);
			break;
		case "age":
			try {
				user.setAge(Integer.parseInt(value));
			} catch (NumberFormatException e) {
				return ResponseEntity.badRequest().body(null);
			}
			break;
		case "gender":
			user.setGender(value);
			break;
		case "hobby":
			user.setHobby(value);
			break;
		case "email":
			user.setEmail(value);
			break;
		case "phone":
			user.setPhone(value);
			break;
		default:
			return ResponseEntity.badRequest().body(null);			
		}
		
		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

}
