package com.toolshare.model;

public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String location;
    private String bio;
    private String password;
    private String memberSince;
    private Double rating;
    private Integer reviewCount;
    private Boolean loggedIn;

    public User() {}

    public User(Long id, String firstName, String lastName, String email, String phone,
                String location, String bio, String memberSince, Double rating,
                Integer reviewCount, Boolean loggedIn) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.bio = bio;
        this.memberSince = memberSince;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.loggedIn = loggedIn;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getMemberSince() { return memberSince; }
    public void setMemberSince(String memberSince) { this.memberSince = memberSince; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public Boolean getLoggedIn() { return loggedIn; }
    public void setLoggedIn(Boolean loggedIn) { this.loggedIn = loggedIn; }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
