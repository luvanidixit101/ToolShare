package com.toolshare.model;

import java.time.LocalDateTime;

public class Message {
    private Long id;
    private String senderName;
    private String content;
    private LocalDateTime timestamp;
    private Boolean sentByMe;

    public Message() {}

    public Message(Long id, String senderName, String content, LocalDateTime timestamp, Boolean sentByMe) {
        this.id = id;
        this.senderName = senderName;
        this.content = content;
        this.timestamp = timestamp;
        this.sentByMe = sentByMe;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Boolean getSentByMe() { return sentByMe; }
    public void setSentByMe(Boolean sentByMe) { this.sentByMe = sentByMe; }
}
