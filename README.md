# Sukhanwar Open Mic - Event Registration Flow

> A modern, responsive frontend prototype for event registration and ticket generation.

## 📌 Overview

This is a **frontend prototype** designed to showcase a complete event registration and ticketing flow for the **Sukhanwar Open Mic** event hosted by The Aviyaan. 

**⚠️ Note:** This is a **proof-of-concept prototype**, not a production-ready application. It demonstrates frontend functionality with client-side state management and does not include backend integration or live payment processing.

## ✨ Features

- **Landing Page** – Event information, date/time/venue details, and call-to-action
- **Dynamic Registration Form** – Capture attendee details with real-time validation
- **Payment Information Section** – Display ticket amount and payment instructions
- **Confirmation & Summary** – Review registration details before submission
- **Ticket Generation** – Display unique ticket with serial number and event details
- **Print & Download** – Export tickets for digital or physical use
- **Local State Management** – Persist user data using browser localStorage
- **Responsive Design** – Mobile-friendly interface built with Bootstrap 5
- **Multi-Step Flow** – Smooth navigation through landing → registration → payment → success → ticket

## 🛠️ Tech Stack

- **HTML5** – Semantic markup structure
- **CSS3** – Custom styling with responsive utilities
- **JavaScript (Vanilla ES6)** – Pure JS, no frameworks or dependencies
- **Bootstrap 5.3.3** – Responsive grid and component framework
- **LocalStorage API** – Client-side data persistence

## � Project Structure

```
Sukhanwar/
├── index.html          # Main HTML markup - registration flow UI
├── style.css           # Custom CSS styling and responsive design
├── script.js           # Vanilla JavaScript - form logic & state management
├── README.md           # This file
└── assets/             # Images and logos
    ├── image.png
    ├── sukhanva-color-logo.png
    ├── golden-logo-aviyaan.png
    ├── white-logo-aviyaan.png
    └── sukhanvar.png
```

## �📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for serving static files)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sukhanwar
   ```

2. **Serve the project locally**
   
   Using Node.js (with http-server):
   ```bash
   npx http-server
   ```
   
   Or use VS Code Live Server extension:
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   - Navigate to `http://localhost:8000` (or the port shown in your server output)

## 🎯 Usage

1. **Start at Landing Page** – View event details and click "Apply Now"
2. **Fill Registration Form** – Enter your name, age, gender, contact details, and performance preference
3. **Review Summary** – Confirm your registration details
4. **Payment Information** – See the ticket cost (₹399) and payment instructions
5. **Generate Ticket** – Upon confirmation, a unique ticket is generated
6. **Print or Download** – Use the ticket buttons to print or download your ticket

## 🔄 How It Works

**index.html** – Contains the complete HTML structure with 5 sections:
- Landing section with event details
- Registration form with validation
- Payment information display
- Success confirmation message
- Ticket generation and display

**style.css** – Provides:
- Custom branded styling (colors, fonts, spacing)
- Responsive grid layout (mobile, tablet, desktop)
- Bootstrap 5 utilities for modern design
- Smooth transitions and animations

**script.js** – Handles:
- Form validation and event listeners
- State management using JavaScript objects
- LocalStorage persistence for user data
- Section navigation and visibility toggling
- Ticket generation with unique serial numbers
- Print and download functionality

## 🚀 Future Improvements

- **Backend Integration** – Connect to real payment gateway (Razorpay, Stripe, etc.)
- **Email Confirmation** – Auto-send tickets and confirmation emails
- **QR Code on Tickets** – Generate scannable QR codes for event check-in
- **Admin Dashboard** – View registrations, attendee list, and event analytics
- **Database Storage** – Move from localStorage to persistent database (MongoDB, PostgreSQL)
- **User Authentication** – Implement login/signup for registered users
- **Multiple Event Support** – Extend to handle multiple events dynamically
- **Payment Status Tracking** – Real-time payment confirmation and refund management
- **SMS Notifications** – Send SMS reminders and ticket confirmations
- **Accessibility Improvements** – Full WCAG 2.1 compliance enhancements

## 👨‍💻 About the Developer

**Harsh Pandey** | Web Developer

I'm a passionate web developer focused on creating user-centric frontend experiences. This project showcases my ability to build responsive, interactive prototypes with clean code and modern web technologies.

**Portfolio:** [https://lucifer01430.github.io/Portfolio](https://lucifer01430.github.io/Portfolio)

Let's connect and build amazing web experiences together! 🚀

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

You are free to use, modify, and distribute this code for personal or commercial projects.

---

