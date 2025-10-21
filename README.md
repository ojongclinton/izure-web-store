# Nike Clone - izure-web-store

A modern, production-ready Nike e-commerce clone built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Firebase**. This project showcases a complete online shopping experience with advanced features, scalable architecture, and modern best practices.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (see SETUP.md)
cp .env.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Status

**Architecture**: ✅ Complete
**Core Setup**: ✅ Complete
**Components**: 🚧 In Progress
**Features**: 🚧 In Progress

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Comprehensive architecture and structure guide
- [SETUP.md](./SETUP.md) - Step-by-step setup instructions
- This README - Overview and quick reference

---

## Table of Contents

- [Features](#features)  
  - [Product Catalog](#product-catalog)  
  - [Product Detail Pages](#product-detail-pages)  
  - [Shopping Cart](#shopping-cart)  
  - [Checkout Flow](#checkout-flow)  
  - [User Account](#user-account)  
  - [Admin Dashboard](#admin-dashboard-optional)  
- [Tech Stack](#tech-stack)  
- [Key Libraries](#key-libraries)  
- [Getting Started](#getting-started)  
- [License](#license)  

---

## Features

### Product Catalog
- Grid/list view toggle  
- Advanced filtering by price range, categories, ratings, and availability  
- Search with **debouncing** and **autocomplete**  
- Sorting options: price, popularity, newest, ratings  
- Pagination or infinite scroll with virtual scrolling for 500+ items  

### Product Detail Pages
- Image gallery with zoom functionality  
- Size/color/variant selection  
- Real-time stock availability  
- Related product recommendations  
- Customer reviews and ratings  
- Add to cart with quantity selector  

### Shopping Cart
- Persistent cart that survives page refresh  
- Quantity updates with **optimistic UI**  
- Remove items with undo option  
- Cart summary including tax calculation  
- Promo code application  
- Stock validation before checkout  

### Checkout Flow
- Multi-step form: shipping → payment → review  
- Form validation with clear error messages  
- **Stripe integration** for secure payments  
- Order confirmation page  
- Email confirmation via **Firebase Functions** + **SendGrid/Resend**  

### User Account
- Firebase Authentication (email/password + Google OAuth)  
- Order history with status tracking  
- Saved addresses  
- Wishlist functionality  
- Profile management  

### Admin Dashboard (Optional but impressive)
- Product management (CRUD operations)  
- Order management and status updates  
- Basic analytics (sales, popular products)  
- Inventory tracking  

---

## Tech Stack
- **Framework:** Next.js 15 (App Router)  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **State Management:** Zustand or React Context + useReducer  
- **Backend:** Firebase (Firestore, Storage, Auth, Functions)  
- **Payments:** Stripe  
- **Forms:** React Hook Form + Zod for validation  
- **Images:** Next.js Image component with optimization  
- **Email:** Resend or SendGrid via Firebase Functions  
- **Deployment:** Vercel  

---

## Key Libraries
```json
{
  "next": "^15.x",
  "react": "^19.x",
  "firebase": "^11.x",
  "stripe": "^17.x",
  "@stripe/stripe-js": "^4.x",
  "zustand": "^5.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "tailwindcss": "^3.x",
  "lucide-react": "latest",
  "date-fns": "^4.x",
  "resend": "^4.x"
}

