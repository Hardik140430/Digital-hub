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
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full Name is required")
    @Size(min = 3, message = "Full Name must be at least 3 characters")
    private String fullName;

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be valid 10 digits starting with 6-9")
    private String phone;

    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "City is required")
    @Size(min = 3, message = "City must be at least 3 characters")
    private String city;

    @NotBlank(message = "Favorite Sport is required")
    private String favoriteSport;

    @NotBlank(message = "Favorite Team is required")
    private String favoriteTeam;

    @NotBlank(message = "Favorite Sports Icon is required")
    private String favoriteSportsIcon;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getFavoriteSport() {
		return favoriteSport;
	}

	public void setFavoriteSport(String favoriteSport) {
		this.favoriteSport = favoriteSport;
	}

	public String getFavoriteTeam() {
		return favoriteTeam;
	}

	public void setFavoriteTeam(String favoriteTeam) {
		this.favoriteTeam = favoriteTeam;
	}

	public String getFavoriteSportsIcon() {
		return favoriteSportsIcon;
	}

	public void setFavoriteSportsIcon(String favoriteSportsIcon) {
		this.favoriteSportsIcon = favoriteSportsIcon;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", fullName=" + fullName + ", phone=" + phone + ", email=" + email + ", city=" + city
				+ ", favoriteSport=" + favoriteSport + ", favoriteTeam=" + favoriteTeam + ", favoriteSportsIcon="
				+ favoriteSportsIcon + "]";
	}
    
    
    
	
	
	
	
}
