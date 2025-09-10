package com.digital.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "users")
public class User{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@Min(value = 18, message = "Age must be at least 18")
	@Max(value = 100, message = "Age must be less than 100")
	private int age;
	
	@NotBlank(message = "Gender is required")
	private String gender;
	
	@NotBlank(message = "Hobby is required")
	private String hobby;
	
	@Email(message = "Email should be valid")
	private String email;
		
	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be valid 10 digits starting with 6-9")
	private String phone;
	
	
	//default constructor
	public User() {}


	public User(Long id, @NotBlank(message = "Name is required") String name,
			@Min(value = 18, message = "Age must be at least 18") @Max(value = 100, message = "Age must be less than 100") int age,
			@NotBlank(message = "Gender is required") String gender,
			@NotBlank(message = "Hobby is required") String hobby,
			@Email(message = "Email should be valid") String email,
			@NotBlank(message = "Phone number is required") @Pattern(regexp = "^[6-9]\\\\d{9}$\", message = \"Phone number must be valid 10 digits starting with 6-9") String phone) {		
		this.id = id;
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.hobby = hobby;
		this.email = email;
		this.phone = phone;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getAge() {
		return age;
	}


	public void setAge(int age) {
		this.age = age;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getHobby() {
		return hobby;
	}


	public void setHobby(String hobby) {
		this.hobby = hobby;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", hobby=" + hobby
				+ ", email=" + email + ", phone=" + phone + "]";
	}
	
	
	
	
	
	
	
	
}
