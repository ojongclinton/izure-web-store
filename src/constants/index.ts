export const APP_NAME = 'Nike Store';
export const APP_DESCRIPTION = 'Premium athletic footwear and apparel';

// Categories
export const CATEGORIES = [
  { id: 'men', name: 'Men', slug: 'men' },
  { id: 'women', name: 'Women', slug: 'women' },
  { id: 'kids', name: 'Kids', slug: 'kids' },
  { id: 'sale', name: 'Sale', slug: 'sale' },
] as const;

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'shoes', name: 'Shoes', slug: 'shoes' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'equipment', name: 'Equipment', slug: 'equipment' },
] as const;

// Sports
export const SPORTS = [
  { id: 'running', name: 'Running', slug: 'running' },
  { id: 'basketball', name: 'Basketball', slug: 'basketball' },
  { id: 'football', name: 'Football', slug: 'football' },
  { id: 'soccer', name: 'Soccer', slug: 'soccer' },
  { id: 'training', name: 'Training & Gym', slug: 'training' },
  { id: 'yoga', name: 'Yoga', slug: 'yoga' },
  { id: 'skateboarding', name: 'Skateboarding', slug: 'skateboarding' },
] as const;

// Sizes
export const SHOE_SIZES = [
  '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15'
] as const;

export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

// Price Ranges
export const PRICE_RANGES = [
  { id: '0-50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 - $150', min: 100, max: 150 },
  { id: '150-200', label: '$150 - $200', min: 150, max: 200 },
  { id: '200+', label: 'Over $200', min: 200, max: Infinity },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured', value: 'featured' },
  { id: 'newest', label: 'Newest', value: 'createdAt-desc' },
  { id: 'price-asc', label: 'Price: Low to High', value: 'price-asc' },
  { id: 'price-desc', label: 'Price: High to Low', value: 'price-desc' },
  { id: 'rating', label: 'Highest Rated', value: 'rating-desc' },
] as const;

// Pagination
export const ITEMS_PER_PAGE = 24;
export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 96] as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
} as const;

// Tax Rate (percentage)
export const TAX_RATE = 0.08; // 8%

// Shipping
export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard', price: 0, days: '5-7' },
  { id: 'express', name: 'Express', price: 15, days: '2-3' },
  { id: 'overnight', name: 'Overnight', price: 30, days: '1' },
] as const;

export const FREE_SHIPPING_THRESHOLD = 150;

// URLs
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  WISHLIST: '/wishlist',
  ACCOUNT: '/account',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_ANALYTICS: '/admin/analytics',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
  CART: '/api/cart',
  CHECKOUT: '/api/checkout',
  ORDERS: '/api/orders',
  WEBHOOKS: '/api/webhooks',
  SEARCH: '/api/search',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please login to continue.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  OUT_OF_STOCK: 'This item is currently out of stock.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Item added to cart',
  REMOVED_FROM_CART: 'Item removed from cart',
  ORDER_PLACED: 'Order placed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_RESET: 'Password reset email sent',
} as const;

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_REVIEW_LENGTH: 1000,
  MAX_CART_QUANTITY: 10,
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Debounce Delays (ms)
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  FILTER: 500,
  RESIZE: 200,
} as const;
