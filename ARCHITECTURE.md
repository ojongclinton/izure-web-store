# Nike Clone - Project Architecture

## Overview
This is a full-featured e-commerce Nike clone built with Next.js 15, Firebase, Stripe, and Zustand. The application follows modern best practices with a scalable folder structure, type-safe development, and modular architecture.

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components (future: shadcn/ui integration)
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form + Zod (to be installed)
- **Icons**: Lucide React (to be installed)

### Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Payments**: Stripe
- **Email**: Resend (to be integrated)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main public routes (with header/footer)
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Main layout with Header/Footer
│   │   ├── products/            # Products listing
│   │   ├── product/[id]/        # Product detail page
│   │   ├── cart/                # Shopping cart
│   │   ├── checkout/            # Checkout flow
│   │   ├── orders/              # Order history
│   │   ├── wishlist/            # User wishlist
│   │   └── account/             # User account
│   ├── (auth)/                   # Auth routes (no header/footer)
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── reset-password/      # Password reset
│   ├── (admin)/                  # Admin routes (protected)
│   │   ├── dashboard/           # Admin dashboard
│   │   ├── products/            # Product management
│   │   ├── orders/              # Order management
│   │   ├── customers/           # Customer management
│   │   └── analytics/           # Analytics
│   ├── api/                      # API routes
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   ├── modal/
│   │   ├── dropdown/
│   │   ├── badge/
│   │   ├── skeleton/
│   │   └── toast/
│   ├── layout/                  # Layout components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   └── navigation/
│   ├── product/                 # Product-related components
│   │   ├── card/
│   │   ├── gallery/
│   │   ├── details/
│   │   ├── filters/
│   │   └── reviews/
│   ├── cart/                    # Cart components
│   │   ├── item/
│   │   ├── summary/
│   │   └── sidebar/
│   ├── checkout/                # Checkout components
│   │   ├── steps/
│   │   ├── forms/
│   │   └── payment/
│   ├── auth/                    # Auth components
│   │   ├── login/
│   │   ├── register/
│   │   └── profile/
│   ├── admin/                   # Admin components
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   └── analytics/
│   └── shared/                  # Shared components
│       ├── search/
│       ├── breadcrumb/
│       ├── pagination/
│       └── loader/
│
├── lib/                         # Utility libraries
│   ├── firebase/
│   │   └── config.ts           # Firebase initialization
│   ├── stripe/                 # Stripe utilities (to be created)
│   ├── validation/             # Zod schemas (to be created)
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-debounce.ts
│   │   ├── use-media-query.ts
│   │   └── use-scroll-lock.ts
│   └── utils/                  # Helper functions
│       ├── cn.ts               # Class name utility
│       └── format.ts           # Formatting utilities
│
├── store/                       # Zustand stores
│   ├── cart-store.ts           # Cart state management
│   ├── user-store.ts           # User/auth state
│   ├── ui-store.ts             # UI state (modals, toasts)
│   └── wishlist-store.ts       # Wishlist state
│
├── services/                    # API/Service layer
│   ├── products.ts             # Product-related API calls
│   ├── auth.ts                 # Authentication services
│   └── orders.ts               # Order-related API calls
│
├── types/                       # TypeScript type definitions
│   └── index.ts                # All type definitions
│
├── constants/                   # App constants
│   └── index.ts                # Categories, routes, config
│
└── styles/                      # Additional styles
```

## Key Features

### 1. State Management (Zustand)
- **Cart Store**: Manages cart items, quantities, pricing, tax, shipping
- **User Store**: Handles authentication state and user data
- **UI Store**: Controls modals, toasts, mobile menu, cart sidebar
- **Wishlist Store**: Manages user's saved products

All stores use persistence middleware to survive page refreshes.

### 2. Route Groups
- `(main)`: Public pages with header/footer layout
- `(auth)`: Authentication pages without main layout
- `(admin)`: Protected admin pages with admin layout

### 3. Type Safety
Comprehensive TypeScript types for:
- Products, Variants, Categories
- Cart, Orders, Users
- Filters, Pagination, API Responses
- Forms, Validation schemas

### 4. Services Layer
Abstracted Firebase operations:
- `products.ts`: CRUD operations for products
- `auth.ts`: Authentication (email, Google OAuth)
- `orders.ts`: Order creation and management

### 5. Utilities
- **Formatting**: Currency, dates, phone numbers
- **Hooks**: Debounce, media queries, scroll lock
- **Helpers**: Class names (cn), slugify, truncate

## Data Models

### Product
```typescript
{
  id, name, description, price, compareAtPrice,
  category, subCategory, sport, gender, brand,
  images[], variants[], tags[], featured,
  rating, reviewCount, status, createdAt, updatedAt
}
```

### Product Variant
```typescript
{
  id, productId, size, color, colorCode,
  sku, stock, price, images[]
}
```

### Cart Item
```typescript
{
  id, productId, variantId, quantity,
  product: Product, variant: ProductVariant
}
```

### Order
```typescript
{
  id, userId, orderNumber, items[],
  subtotal, tax, shipping, discount, total,
  status, shippingAddress, billingAddress,
  paymentMethod, trackingNumber, createdAt, updatedAt
}
```

## Configuration

### Environment Variables
See `.env.example` for required variables:
- Firebase config (API key, project ID, etc.)
- Stripe keys (publishable, secret, webhook)
- Resend API key
- App URLs

### TypeScript Paths
Configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/store/*` → `./src/store/*`
- `@/types/*` → `./src/types/*`
- `@/constants/*` → `./src/constants/*`
- `@/services/*` → `./src/services/*`
- `@/hooks/*` → `./src/lib/hooks/*`
- `@/utils/*` → `./src/lib/utils/*`

## Next Steps

### Required Dependencies to Install
```bash
npm install zustand firebase stripe @stripe/stripe-js
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react clsx tailwind-merge
npm install date-fns resend
```

### Development Priorities
1. Set up Firebase project and add credentials to `.env.local`
2. Set up Stripe account and add keys
3. Build out UI components library
4. Implement authentication flow
5. Create product listing and filtering
6. Build product detail page
7. Implement shopping cart
8. Build checkout flow with Stripe
9. Create admin dashboard
10. Add email notifications

### Firebase Collections Structure
```
users/
  {userId}/
    - id, email, name, photoURL, role, createdAt, updatedAt

products/
  {productId}/
    - id, name, description, price, category, variants[], etc.

orders/
  {orderId}/
    - id, userId, orderNumber, items[], total, status, etc.

reviews/
  {reviewId}/
    - id, productId, userId, rating, comment, createdAt

addresses/
  {addressId}/
    - id, userId, firstName, lastName, addressLine1, city, etc.
```

## Best Practices

1. **Components**: Keep components small and focused
2. **Server vs Client**: Use Server Components by default, Client Components only when needed
3. **Type Safety**: Always define types, no `any`
4. **Error Handling**: Implement proper try-catch blocks
5. **Loading States**: Use Suspense and loading.tsx files
6. **Optimization**: Use Next.js Image component for images
7. **SEO**: Add metadata to each page
8. **Accessibility**: Use semantic HTML and ARIA labels

## Performance Considerations

- Implement virtual scrolling for large product lists
- Use debouncing for search and filters
- Optimize images with Next.js Image
- Implement infinite scroll or pagination
- Use React.memo for expensive components
- Lazy load components when appropriate
- Cache Firebase queries where possible

## Security

- Firebase security rules for database access
- Protected API routes for sensitive operations
- Server-side validation for all forms
- Stripe webhook signature verification
- Environment variables for secrets
- Rate limiting on API routes
- Input sanitization

---

Built with Next.js 15, TypeScript, Tailwind CSS, Firebase, and Stripe
