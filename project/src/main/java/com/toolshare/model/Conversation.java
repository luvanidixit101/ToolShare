package com.toolshare.model;

public class Conversation {
    private Long id;
    private String name;
    private String avatarInitials;
    private String lastMessage;
    private String time;
    private Integer unreadCount;
    private Boolean online;
    private String toolName;

    public Conversation() {}

    public Conversation(Long id, String name, String avatarInitials, String lastMessage,
                        String time, Integer unreadCount, Boolean online, String toolName) {
        this.id = id;
        this.name = name;
        this.avatarInitials = avatarInitials;
        this.lastMessage = lastMessage;
        this.time = time;
        this.unreadCount = unreadCount;
        this.online = online;
        this.toolName = toolName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAvatarInitials() { return avatarInitials; }
    public void setAvatarInitials(String avatarInitials) { this.avatarInitials = avatarInitials; }
    public String getLastMessage() { return lastMessage; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public Integer getUnreadCount() { return unreadCount; }
    public void setUnreadCount(Integer unreadCount) { this.unreadCount = unreadCount; }
    public Boolean getOnline() { return online; }
    public void setOnline(Boolean online) { this.online = online; }
    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
}
