# THREAD – Minimal T-Shirt E-Commerce Store

A modern, minimal, and fully responsive e-commerce website for selling premium t-shirts. Designed for a seamless shopping experience with smooth animations, clean UI, and integrated Razorpay payments.

---

## 🛠️ Tech Stack

- **React** (with functional components & hooks)
- **React Router** (for client-side routing)
- **Tailwind CSS** (utility-first styling)
- **GSAP** (GreenSock Animation Platform for smooth UI animations)
- **Lucide React** (icon library)
- **Razorpay** (secure payment processing for India)
- **Unsplash** (for high-quality t-shirt images)
- **Vite** (for fast development and build)

---

## ✨ Features

- **Modern, Minimal UI:** Clean, distraction-free design with a focus on products.
- **Responsive Design:** Looks great on all devices, from mobile to desktop.
- **Animated Hero & About Sections:** Smooth entrance and scroll-triggered animations using GSAP.
- **Lazy Loading Images:** Fast initial load and smooth image transitions.
- **Razorpay Payment Integration:** Secure payment processing with support for UPI, Cards, Wallets & more.
- **Multi-step Checkout:** Streamlined checkout process with address, delivery, and payment steps.
- **Shopping Cart:** Full-featured cart with quantity management and real-time totals.
- **Product Details:** Detailed product pages with color and size selection.
- **User Profile & Orders:** User account management and order history.

---

## 💳 Payment Integration

This project uses **Razorpay** for secure payment processing - perfect for Indian businesses and personal projects:

### Why Razorpay?
- **Easy Setup:** Simple onboarding process for Indian developers
- **No Complex KYC:** Minimal documentation required for test accounts
- **Multiple Payment Methods:** UPI, Cards, Net Banking, Wallets
- **Free Test Environment:** Unlimited testing with test keys
- **Indian-focused:** Built specifically for the Indian market

### Supported Payment Methods
- **Credit/Debit Cards:** Visa, Mastercard, Rupay, American Express
- **UPI:** Google Pay, PhonePe, Paytm, BHIM, and all UPI apps
- **Digital Wallets:** Paytm, Mobikwik, Freecharge, Amazon Pay
- **Net Banking:** All major Indian banks
- **EMI:** Easy installment options

### Setting Up Razorpay Payments

1. **Create a Razorpay Account**
   - Visit [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
   - Sign up with your email and phone number
   - Complete basic verification (much simpler than other providers)

2. **Get Your API Keys**
   - Go to Settings → API Keys in your Razorpay Dashboard
   - Generate Test API Keys (no documentation required)
   - Copy your Test Key ID (starts with `rzp_test_`)

3. **Update the Integration**
   - Replace the test key in `CheckoutPayment.jsx`:
   ```javascript
   key: 'rzp_test_YOUR_KEY_HERE', // Replace with your test key
   ```

4. **Test Payments**
   - Use test card numbers provided by Razorpay
   - Test UPI with VPA: `success@razorpay`
   - All test payments are free and unlimited

5. **Go Live** (when ready)
   - Complete KYC verification in Razorpay Dashboard
   - Get Live API Keys
   - Replace test keys with live keys

### Test Payment Details
For testing, you can use these credentials:
- **Test Cards:** 4111 1111 1111 1111 (Visa), 5555 5555 5555 4444 (Mastercard)
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **UPI:** success@razorpay (for successful payments)
- **UPI:** failure@razorpay (for failed payments)

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

5. **Test Payments**
   - Add items to cart and proceed to checkout
   - Use the test payment credentials mentioned above
   - Experience the complete payment flow

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
- **Payment Options:** Razorpay (UPI, Cards, Wallets) and demo payment for testing
- **Order Confirmation:** Detailed confirmation with payment tracking information

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

## 🔧 Configuration

### Razorpay Configuration
Update the Razorpay configuration in `src/components/Checkout/CheckoutPayment.jsx`:

```javascript
const options = {
  key: 'rzp_test_YOUR_KEY_HERE', // Your Razorpay Test Key
  amount: getTotalPrice() * 100, // Amount in paise
  currency: 'INR',
  name: 'THREAD',
  description: 'Premium T-shirt Purchase',
  // ... other options
};
```

### Environment Variables (Optional)
For production, you can use environment variables:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
```

Then update the code:
```javascript
key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
```

---

## 📄 License

This project is for educational and demonstration purposes.  
Product images are used under Unsplash's free-to-use license.

---

## 🔗 Live Demo

Experience the live demo at: [Your deployment URL]

For the best experience, try the complete checkout flow including the Razorpay payment integration with test credentials!

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

For any questions or issues, please open an issue in the repository or contact the maintainer.