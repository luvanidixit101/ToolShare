package com.toolshare.model;

import java.time.LocalDate;

public class Booking {
    private Long id;
    private String bookingId;
    private Long toolId;
    private String toolName;
    private String toolImage;
    private String ownerName;
    private String renterName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalPrice;
    private String status; // pending, approved, active, completed, cancelled
    private String location;

    public Booking() {}

    public Booking(Long id, String bookingId, Long toolId, String toolName, String toolImage,
                   String ownerName, String renterName, LocalDate startDate, LocalDate endDate,
                   Double totalPrice, String status, String location) {
        this.id = id;
        this.bookingId = bookingId;
        this.toolId = toolId;
        this.toolName = toolName;
        this.toolImage = toolImage;
        this.ownerName = ownerName;
        this.renterName = renterName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
        this.status = status;
        this.location = location;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }
    public Long getToolId() { return toolId; }
    public void setToolId(Long toolId) { this.toolId = toolId; }
    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
    public String getToolImage() { return toolImage; }
    public void setToolImage(String toolImage) { this.toolImage = toolImage; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getRenterName() { return renterName; }
    public void setRenterName(String renterName) { this.renterName = renterName; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
