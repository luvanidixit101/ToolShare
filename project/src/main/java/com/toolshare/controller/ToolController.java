package com.toolshare.controller;

import com.toolshare.model.Category;
import com.toolshare.model.MockData;
import com.toolshare.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/tools")
public class ToolController {

    @Autowired
    private MockData mockData;

    @GetMapping
    public String list(Model model) {
        List<Tool> tools = mockData.getTools();
        List<Category> categories = mockData.getCategories();
        model.addAttribute("tools", tools);
        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "tools/list";
    }

    @GetMapping("/{id}")
    public String details(@PathVariable Long id, Model model) {
        Tool tool = mockData.getToolById(id);
        if (tool == null) {
            return "redirect:/tools";
        }
        List<Tool> related = mockData.getTools().stream()
                .filter(t -> !t.getId().equals(id))
                .limit(3)
                .toList();
        model.addAttribute("tool", tool);
        model.addAttribute("relatedTools", related);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "tools/details";
    }

    @GetMapping("/add")
    public String add(Model model) {
        List<Category> categories = mockData.getCategories();
        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "tools/add";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        Tool tool = mockData.getToolById(id);
        if (tool == null) {
            return "redirect:/tools/my-tools";
        }
        List<Category> categories = mockData.getCategories();
        model.addAttribute("tool", tool);
        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "tools/edit";
    }

    @GetMapping("/my-tools")
    public String myTools(Model model) {
        List<Tool> tools = mockData.getTools();
        model.addAttribute("tools", tools);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "tools/my-tools";
    }
}
