package com.toolshare.model;

import java.util.ArrayList;
import java.util.List;

public class Tool {
    private Long id;
    private String name;
    private String category;
    private String description;
    private String condition;
    private String location;
    private Double pricePerDay;
    private Double securityDeposit;
    private String ownerName;
    private Double rating;
    private Integer reviewCount;
    private Boolean available;
    private String imageUrl;
    private List<String> galleryImages = new ArrayList<>();
    private Integer bookingCount;
    private Integer viewCount;
    private String status; // active, draft, disabled
    private String specifications;

    public Tool() {}

    public Tool(Long id, String name, String category, String description, String condition,
                String location, Double pricePerDay, Double securityDeposit, String ownerName,
                Double rating, Integer reviewCount, Boolean available, String imageUrl) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.condition = condition;
        this.location = location;
        this.pricePerDay = pricePerDay;
        this.securityDeposit = securityDeposit;
        this.ownerName = ownerName;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.available = available;
        this.imageUrl = imageUrl;
        this.galleryImages = new ArrayList<>();
        this.bookingCount = 0;
        this.viewCount = 0;
        this.status = "active";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }
    public Double getSecurityDeposit() { return securityDeposit; }
    public void setSecurityDeposit(Double securityDeposit) { this.securityDeposit = securityDeposit; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public List<String> getGalleryImages() { return galleryImages; }
    public void setGalleryImages(List<String> galleryImages) { this.galleryImages = galleryImages; }
    public Integer getBookingCount() { return bookingCount; }
    public void setBookingCount(Integer bookingCount) { this.bookingCount = bookingCount; }
    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getSpecifications() { return specifications; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
}
