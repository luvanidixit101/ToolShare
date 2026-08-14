package com.toolshare.model;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class MockData {

    public List<Tool> getTools() {
        List<Tool> tools = new ArrayList<>();
        Tool t1 = new Tool(1L, "DeWalt 20V Cordless Drill", "Power Tools",
                "Heavy-duty cordless drill with two batteries and charger. Perfect for home renovation projects and woodworking.",
                "Excellent", "Austin, TX", 25.0, 50.0, "Mike Johnson", 4.8, 32, true,
                "https://images.pexels.com/photos/8961346/pexels-photo-8961346.jpeg");
        t1.setGalleryImages(Arrays.asList(
                "https://images.pexels.com/photos/8961346/pexels-photo-8961346.jpeg",
                "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg",
                "https://images.pexels.com/photos/8961082/pexels-photo-8961082.jpeg"));
        t1.setBookingCount(12);
        t1.setViewCount(234);
        t1.setSpecifications("Voltage: 20V | Battery: 2Ah | Chuck: 1/2\" | Weight: 3.5 lbs");
        tools.add(t1);

        Tool t2 = new Tool(2L, "Stihl MS 170 Chainsaw", "Garden Tools",
                "Lightweight gasoline chainsaw ideal for cutting firewood and trimming branches. Recently serviced.",
                "Good", "Portland, OR", 35.0, 100.0, "Sarah Chen", 4.9, 18, true,
                "https://images.pexels.com/photos/4583972/pexels-photo-4583972.jpeg");
        t2.setBookingCount(8);
        t2.setViewCount(156);
        t2.setSpecifications("Bar length: 16\" | Engine: 30.1cc | Weight: 8.6 lbs | Power: 1.3 kW");
        tools.add(t2);

        Tool t3 = new Tool(3L, "Bosch Random Orbit Sander", "Power Tools",
                "6-inch random orbit sander with dust collection bag. Great for finishing woodworking projects.",
                "Excellent", "Denver, CO", 15.0, 30.0, "Tom Rivera", 4.6, 11, true,
                "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg");
        t3.setBookingCount(5);
        t3.setViewCount(98);
        t3.setSpecifications("Pad size: 6\" | Speed: 12000 OPM | Dust collection: Microfilter");
        tools.add(t3);

        Tool t4 = new Tool(4L, "Honda EU2200i Generator", "Construction",
                "Quiet portable inverter generator, 2200 watts. Perfect for job sites or outdoor events.",
                "Good", "Phoenix, AZ", 55.0, 200.0, "Lisa Park", 4.7, 24, false,
                "https://images.pexels.com/photos/8961082/pexels-photo-8961082.jpeg");
        t4.setBookingCount(19);
        t4.setViewCount(312);
        t4.setSpecifications("Output: 2200W | Fuel: Gasoline | Runtime: 8h | Noise: 48-57 dB");
        tools.add(t4);

        Tool t5 = new Tool(5L, "Stanley Tool Set (200 pcs)", "Hand Tools",
                "Complete 200-piece mechanic's tool set with sockets, wrenches, and ratchards in a carrying case.",
                "Excellent", "Chicago, IL", 20.0, 75.0, "James Wilson", 4.5, 9, true,
                "https://images.pexels.com/photos/8961107/pexels-photo-8961107.jpeg");
        t5.setBookingCount(7);
        t5.setViewCount(145);
        t5.setSpecifications("Pieces: 200 | Drive sizes: 1/4\", 3/8\", 1/2\" | Case: Included");
        tools.add(t5);

        Tool t6 = new Tool(6L, "Ryobi Pressure Washer", "Cleaning",
                "2300 PSI electric pressure washer with multiple nozzles. Great for cleaning decks and driveways.",
                "Good", "Seattle, WA", 30.0, 80.0, "Emily Davis", 4.4, 14, true,
                "https://images.pexels.com/photos/4606521/pexels-photo-4606521.jpeg");
        t6.setBookingCount(11);
        t6.setViewCount(187);
        t6.setSpecifications("Pressure: 2300 PSI | Flow: 1.2 GPM | Power: Electric | Nozzles: 4");
        tools.add(t6);

        Tool t7 = new Tool(7L, "Milwaukee M18 Circular Saw", "Power Tools",
                "7-1/4 inch circular saw with brushless motor. Battery and charger included.",
                "Excellent", "Nashville, TN", 28.0, 60.0, "Carlos Mendez", 4.9, 21, true,
                "https://images.pexels.com/photos/8961042/pexels-photo-8961042.jpeg");
        t7.setBookingCount(15);
        t7.setViewCount(256);
        t7.setSpecifications("Blade: 7-1/4\" | Motor: Brushless | Battery: M18 5.0Ah | Bevel: 0-50°");
        tools.add(t7);

        Tool t8 = new Tool(8L, "Klein Tools Multimeter", "Electrical",
                "Professional digital multimeter for electrical troubleshooting. CAT IV safety rated.",
                "Excellent", "Boston, MA", 10.0, 25.0, "Priya Sharma", 4.8, 7, true,
                "https://images.pexels.com/photos/8961178/pexels-photo-8961178.jpeg");
        t8.setBookingCount(4);
        t8.setViewCount(76);
        t8.setSpecifications("Range: 1000V AC/DC | CAT IV 600V | Display: 6000 count | True RMS");
        tools.add(t8);

        return tools;
    }

    public Tool getToolById(Long id) {
        return getTools().stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<Tool> getFeaturedTools() {
        return getTools().subList(0, 6);
    }

    public List<Category> getCategories() {
        return Arrays.asList(
                new Category("Power Tools", "bolt", 142),
                new Category("Hand Tools", "screwdriver", 98),
                new Category("Garden Tools", "leaf", 67),
                new Category("Construction", "building", 54),
                new Category("Automotive", "car", 43),
                new Category("Cleaning", "spray-can", 38),
                new Category("Electrical", "plug", 29),
                new Category("Plumbing", "wrench", 22));
    }

    public List<Booking> getBookings() {
        List<Booking> bookings = new ArrayList<>();
        bookings.add(new Booking(1L, "BK-2026-001", 1L, "DeWalt 20V Cordless Drill",
                "https://images.pexels.com/photos/8961346/pexels-photo-8961346.jpeg",
                "Mike Johnson", "You", LocalDate.of(2026, 8, 12), LocalDate.of(2026, 8, 15),
                75.0, "pending", "Austin, TX"));
        bookings.add(new Booking(2L, "BK-2026-002", 2L, "Stihl MS 170 Chainsaw",
                "https://images.pexels.com/photos/4583972/pexels-photo-4583972.jpeg",
                "Sarah Chen", "You", LocalDate.of(2026, 8, 10), LocalDate.of(2026, 8, 14),
                140.0, "approved", "Portland, OR"));
        bookings.add(new Booking(3L, "BK-2026-003", 7L, "Milwaukee M18 Circular Saw",
                "https://images.pexels.com/photos/8961042/pexels-photo-8961042.jpeg",
                "Carlos Mendez", "You", LocalDate.of(2026, 7, 28), LocalDate.of(2026, 8, 2),
                140.0, "active", "Nashville, TN"));
        bookings.add(new Booking(4L, "BK-2026-004", 3L, "Bosch Random Orbit Sander",
                "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg",
                "Tom Rivera", "You", LocalDate.of(2026, 7, 15), LocalDate.of(2026, 7, 18),
                45.0, "completed", "Denver, CO"));
        bookings.add(new Booking(5L, "BK-2026-005", 6L, "Ryobi Pressure Washer",
                "https://images.pexels.com/photos/4606521/pexels-photo-4606521.jpeg",
                "Emily Davis", "You", LocalDate.of(2026, 6, 20), LocalDate.of(2026, 6, 22),
                60.0, "completed", "Seattle, WA"));
        bookings.add(new Booking(6L, "BK-2026-006", 5L, "Stanley Tool Set (200 pcs)",
                "https://images.pexels.com/photos/8961107/pexels-photo-8961107.jpeg",
                "James Wilson", "You", LocalDate.of(2026, 6, 10), LocalDate.of(2026, 6, 12),
                40.0, "cancelled", "Chicago, IL"));
        return bookings;
    }

    public User getCurrentUser() {
        return new User(1L, "Alex", "Morgan", "alex.morgan@email.com", "(555) 123-4567",
                "Austin, TX", "DIY enthusiast and weekend woodworker. Love sharing tools with the community.",
                "March 2025", 4.9, 28, true);
    }

    public List<Conversation> getConversations() {
        return Arrays.asList(
                new Conversation(1L, "Mike Johnson", "MJ", "Sure, you can pick it up at 10am tomorrow.",
                        "10:32 AM", 2, true, "DeWalt 20V Cordless Drill"),
                new Conversation(2L, "Sarah Chen", "SC", "The chainsaw is freshly serviced and ready to go.",
                        "Yesterday", 0, false, "Stihl MS 170 Chainsaw"),
                new Conversation(3L, "Carlos Mendez", "CM", "Thanks for returning it on time!",
                        "Aug 9", 0, false, "Milwaukee M18 Circular Saw"),
                new Conversation(4L, "Emily Davis", "ED", "Let me know if you need the extension wand too.",
                        "Aug 7", 1, false, "Ryobi Pressure Washer"));
    }

    public List<Message> getMessages() {
        return Arrays.asList(
                new Message(1L, "Mike Johnson", "Hi Alex! I saw your booking request for the drill. It's available on those dates.",
                        java.time.LocalDateTime.of(2026, 8, 11, 9, 15), false),
                new Message(2L, "You", "Great! Can I pick it up on Thursday morning?",
                        java.time.LocalDateTime.of(2026, 8, 11, 9, 22), true),
                new Message(3L, "Mike Johnson", "Sure, you can pick it up at 10am tomorrow.",
                        java.time.LocalDateTime.of(2026, 8, 11, 10, 32), false),
                new Message(4L, "You", "Perfect, see you then. Do I need to bring anything?",
                        java.time.LocalDateTime.of(2026, 8, 11, 10, 35), true),
                new Message(5L, "Mike Johnson", "Just a photo ID for the security deposit. The batteries are both fully charged.",
                        java.time.LocalDateTime.of(2026, 8, 11, 10, 40), false));
    }
}
