package com.toolshare.controller;

import com.toolshare.model.MockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private MockData mockData;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("user", mockData.getCurrentUser());
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "profile/index";
    }
}
