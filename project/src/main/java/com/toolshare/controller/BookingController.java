package com.toolshare.controller;

import com.toolshare.model.Booking;
import com.toolshare.model.MockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private MockData mockData;

    @GetMapping
    public String list(Model model) {
        List<Booking> bookings = mockData.getBookings();
        model.addAttribute("bookings", bookings);
        model.addAttribute("currentUser", mockData.getCurrentUser());
        return "bookings/list";
    }
}
