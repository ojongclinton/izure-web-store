# Installation Commands

## Quick Install (All at Once)

```bash
# Install all required dependencies in one command
npm install zustand firebase stripe @stripe/stripe-js react-hook-form @hookform/resolvers zod lucide-react clsx tailwind-merge date-fns resend
```

## Or Install Step-by-Step

### 1. State Management
```bash
npm install zustand
```

### 2. Backend Services
```bash
npm install firebase
```

### 3. Payment Processing
```bash
npm install stripe @stripe/stripe-js
```

### 4. Form Handling
```bash
npm install react-hook-form @hookform/resolvers zod
```

### 5. UI Utilities
```bash
npm install lucide-react clsx tailwind-merge
```

### 6. Additional Utilities
```bash
npm install date-fns resend
```

## Verify Installation

```bash
# Check installed packages
npm list zustand firebase stripe react-hook-form zod lucide-react

# Start development server
npm run dev
```

## After Installation

1. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Follow [SETUP.md](./SETUP.md) for Firebase and Stripe configuration

3. Start building!

---

Need help? Check [SETUP.md](./SETUP.md) for detailed setup instructions.
