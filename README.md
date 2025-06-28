# THREAD – Minimal T-Shirt E-Commerce Store

A modern, minimal, and fully responsive e-commerce website for selling premium t-shirts. Designed for a seamless shopping experience with smooth animations, clean UI, and integrated Stripe payments.

---

## 🛠️ Tech Stack

- **React** (with functional components & hooks)
- **React Router** (for client-side routing)
- **Tailwind CSS** (utility-first styling)
- **GSAP** (GreenSock Animation Platform for smooth UI animations)
- **Lucide React** (icon library)
- **Stripe Payment Links** (secure payment processing)
- **Unsplash** (for high-quality t-shirt images)
- **Vite** (for fast development and build)

---

## ✨ Features

- **Modern, Minimal UI:** Clean, distraction-free design with a focus on products.
- **Responsive Design:** Looks great on all devices, from mobile to desktop.
- **Animated Hero & About Sections:** Smooth entrance and scroll-triggered animations using GSAP.
- **Lazy Loading Images:** Fast initial load and smooth image transitions.
- **Stripe Payment Integration:** Secure payment processing with Stripe Payment Links.
- **Multi-step Checkout:** Streamlined checkout process with address, delivery, and payment steps.
- **Shopping Cart:** Full-featured cart with quantity management and real-time totals.
- **Product Details:** Detailed product pages with color and size selection.
- **User Profile & Orders:** User account management and order history.

---

## 💳 Payment Integration

This project uses **Stripe Payment Links** for secure payment processing:

- **No Backend Required:** Payment Links work without server-side code
- **Secure Processing:** All payment data is handled by Stripe's secure infrastructure
- **Multiple Payment Methods:** Supports credit cards, debit cards, and digital wallets
- **Real-time Processing:** Instant payment confirmation and order processing

### Setting Up Stripe Payments

To use real Stripe payments in production:

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. In your Stripe Dashboard, go to **Products** → **Payment Links**
3. Create Payment Links for your products
4. Update the `createStripePaymentLink()` function in `CheckoutPayment.jsx` with your actual Payment Link IDs

For testing, the current implementation uses demo Payment Links that simulate the payment flow.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thread-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

---

## 📱 Features Overview

### Shopping Experience
- **Product Catalog:** Browse through curated t-shirt collections
- **Advanced Filtering:** Filter products by category (Basics, Graphic, Vintage, Oversized)
- **Product Details:** Detailed product pages with multiple images and descriptions
- **Color & Size Selection:** Interactive color and size selectors
- **Shopping Cart:** Add, remove, and modify cart items with real-time updates

### Checkout Process
- **Multi-step Checkout:** Address → Delivery → Payment → Confirmation
- **Form Validation:** Client-side validation for all checkout forms
- **Payment Options:** Stripe Payment Links and demo payment for testing
- **Order Confirmation:** Detailed confirmation with order tracking information

### User Features
- **User Profile:** Manage personal information and preferences
- **Order History:** View past orders and their status
- **Responsive Design:** Optimized for mobile, tablet, and desktop

### Technical Features
- **Smooth Animations:** GSAP-powered animations and transitions
- **Lazy Loading:** Optimized image loading for better performance
- **Context API:** Global state management for cart and user data
- **Modern Routing:** Client-side routing with React Router
- **Component Architecture:** Modular, reusable React components

---

## 📄 License

This project is for educational and demonstration purposes.  
Product images are used under Unsplash's free-to-use license.

---

## 🔗 Live Demo

Experience the live demo at: [Your deployment URL]

For the best experience, try the complete checkout flow including the Stripe payment integration!