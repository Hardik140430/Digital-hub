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

	// Create User
	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		User savedUser = userRepository.save(user);
		return ResponseEntity.ok(savedUser);
	}

	// Get User by ID
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		return userOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// Update a single field
	@PatchMapping("/{id}")
	public ResponseEntity<User> updateField(@PathVariable Long id, @RequestParam String field,
			@RequestParam String value) {

		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		User user = userOptional.get();

		switch (field) {
		case "fullName":
			user.setFullName(value);
			break;
		case "phone":
			user.setPhone(value);
			break;
		case "email":
			user.setEmail(value);
			break;
		case "city":
			user.setCity(value);
			break;
		case "favoriteSport":
			user.setFavoriteSport(value);
			break;
		case "favoriteTeam":
			user.setFavoriteTeam(value);
			break;
		case "favoriteSportsIcon":
			user.setFavoriteSportsIcon(value);
			break;
		default:
			return ResponseEntity.badRequest().body(null);
		}

		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}
}