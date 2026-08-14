package com.toolshare.model;

public class Category {
    private String name;
    private String icon;
    private Integer count;

    public Category() {}

    public Category(String name, String icon, Integer count) {
        this.name = name;
        this.icon = icon;
        this.count = count;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
}
