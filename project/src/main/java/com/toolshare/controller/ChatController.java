package com.toolshare.controller;

import com.toolshare.model.Conversation;
import com.toolshare.model.Message;
import com.toolshare.model.MockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private MockData mockData;

    @GetMapping
    public String index(Model model) {
        List<Conversation> conversations = mockData.getConversations();
        List<Message> messages = mockData.getMessages();
        model.addAttribute("conversations", conversations);
        model.addAttribute("messages", messages);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "chat/index";
    }
}
