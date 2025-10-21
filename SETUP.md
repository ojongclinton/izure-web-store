# Nike Clone - Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Firebase account
- Stripe account (for payments)
- Resend account (for emails)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install core dependencies
npm install zustand firebase stripe @stripe/stripe-js

# Install form handling and validation
npm install react-hook-form @hookform/resolvers zod

# Install UI utilities
npm install lucide-react clsx tailwind-merge

# Install additional utilities
npm install date-fns

# Install email service
npm install resend
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "nike-clone" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method
5. Add authorized domains (localhost, your production domain)

#### Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Start in "production mode" or "test mode" (you can change rules later)
4. Choose a location (us-central1 or nearest to your users)

#### Enable Storage
1. Go to "Storage"
2. Click "Get started"
3. Set up storage rules

#### Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click web icon (</>) to add a web app
4. Register app with nickname
5. Copy the firebaseConfig object

#### Create .env.local File
Create `.env.local` in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Firestore Security Rules

Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }

    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Orders collection
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isAdmin();
    }

    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.userId);
    }

    // Addresses collection
    match /addresses/{addressId} {
      allow read, write: if isOwner(resource.data.userId);
    }
  }
}
```

### 4. Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or login
3. Get API keys from Developers → API keys

Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

#### Set up Stripe Webhook (for production)
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret

Add to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 6. Resend Setup (Email)

1. Go to [Resend](https://resend.com/)
2. Create account and verify email
3. Create API key
4. Add domain (for production)

Add to `.env.local`:
```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 7. Application URLs

Add to `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### 8. Seed Database (Optional)

Create a script to seed initial data:

```bash
# Create seed script
node scripts/seed-products.js
```

This will add sample Nike products to your Firestore database.

### 9. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Firestore Collections Structure

### Products Collection
```javascript
{
  id: "auto-generated",
  name: "Air Jordan 1 High",
  description: "Classic high-top sneaker...",
  price: 170,
  compareAtPrice: 200,
  category: "shoes",
  subCategory: "basketball",
  sport: "basketball",
  gender: "unisex",
  brand: "Jordan",
  images: [
    {
      id: "img1",
      url: "https://...",
      alt: "Air Jordan 1 Front",
      order: 0
    }
  ],
  variants: [
    {
      id: "var1",
      productId: "product-id",
      size: "10",
      color: "Black/Red",
      colorCode: "#000000",
      sku: "AJ1-BLK-10",
      stock: 15,
      price: 170
    }
  ],
  tags: ["basketball", "jordan", "high-top"],
  featured: true,
  rating: 4.8,
  reviewCount: 1250,
  status: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Orders Collection
```javascript
{
  id: "auto-generated",
  userId: "user-id",
  orderNumber: "NK-ABC123",
  items: [...],
  subtotal: 150,
  tax: 12,
  shipping: 15,
  discount: 0,
  total: 177,
  status: "pending",
  shippingAddress: {...},
  billingAddress: {...},
  paymentMethod: "card",
  paymentIntentId: "pi_...",
  trackingNumber: null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Troubleshooting

### Firebase Connection Issues
- Verify all environment variables are correct
- Check Firebase project is active
- Ensure you're using the correct Firebase config

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors
```bash
# Check TypeScript version
npm list typescript

# Ensure using TypeScript 5+
npm install typescript@latest
```

### Deployment Issues
- Ensure all environment variables are set in production
- Update Firebase authorized domains
- Update Stripe webhook endpoint to production URL
- Set up proper security rules

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/product-listing
   ```

2. **Make Changes**
   - Write code
   - Test locally
   - Write tests (if applicable)

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add product listing page"
   ```

4. **Push and Deploy**
   ```bash
   git push origin feature/product-listing
   # Create pull request
   # Merge to main
   # Deploy to Vercel
   ```

## Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Firebase Explorer
- Error Lens
- Auto Rename Tag
- Path Intellisense

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

If you encounter any issues, refer to the ARCHITECTURE.md file for more details on the project structure.
