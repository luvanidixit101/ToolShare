package com.toolshare.controller;

import com.toolshare.model.Category;
import com.toolshare.model.MockData;
import com.toolshare.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private MockData mockData;

    @GetMapping("/")
    public String index(Model model) {
        List<Tool> featuredTools = mockData.getFeaturedTools();
        List<Category> categories = mockData.getCategories();
        model.addAttribute("featuredTools", featuredTools);
        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "home/index";
    }
}
