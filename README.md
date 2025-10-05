This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## About the project

# izure-web-store

A modern, responsive e-commerce web store built with **Next.js 15**, **Tailwind CSS**, and **Firebase**. This project is designed as a full-featured portfolio showcase of an online shopping experience with advanced filtering, smooth checkout flow, and robust user account management.

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

