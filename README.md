# FashionHub - Mobile E-Commerce App

A production-quality mobile-responsive Product Details flow built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

- **Onboarding Screen** - Beautiful hero image with Sign Up/Sign In buttons
- **Home/Explore Screen** - Product grid with category filters (All, Men, Women, Kids, Other)
- **Product Details** - Size selector, color swatches, add to cart functionality
- **Cart** - View items, remove items, order summary with checkout
- **Checkout** - Delivery address, payment method selection, order confirmation

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Sonner** for toast notifications

## 📱 API Endpoints (Simulated)

The app simulates backend API routes using in-memory storage:

- `GET /api/products` - Returns all products
- `GET /api/products/:id` - Returns product details
- `POST /api/cart` - Add item to cart (session-backed)
- `POST /api/orders` - Create order from cart, simulate payment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

## 📁 Project Structure

```
src/
├── assets/           # Product images
├── components/       # Reusable UI components
│   ├── BottomNav.tsx
│   ├── CartItemCard.tsx
│   ├── CategoryFilter.tsx
│   ├── ColorSwatches.tsx
│   ├── GridLogo.tsx
│   ├── PageHeader.tsx
│   ├── ProductCard.tsx
│   └── SizeSelector.tsx
├── context/          # React Context providers
│   └── CartContext.tsx
├── data/             # Seed data
│   └── products.ts
├── pages/            # Page components
│   ├── OnboardingPage.tsx
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── SearchPage.tsx
│   └── SettingsPage.tsx
├── services/         # API service layer
│   └── api.ts
└── types/            # TypeScript types
    └── index.ts
```

## 🎨 Design Decisions

1. **Mobile-First Design** - The app is optimized for mobile viewports with a max-width container for larger screens
2. **In-Memory Storage** - Cart and orders are stored in memory for simplicity (resets on page refresh)
3. **Session-Based Auth** - A mock session user ID is used to simulate authentication
4. **Component-Based Architecture** - Reusable components for consistency and maintainability
5. **Design System** - All colors and styles are defined in the Tailwind config and CSS variables

## 📝 Environment Variables

No environment variables are required. The app uses seeded product data.

```bash
# env.example (empty - no env vars needed)
# This app uses in-memory storage and seeded data
```

## 🔧 Shortcuts & Trade-offs

- **No persistent storage** - Data resets on refresh (acceptable for demo)
- **Mock authentication** - Uses a static session user ID
- **Simulated payments** - Always returns success
- **Generated images** - Product images are AI-generated to match the design
- **React + Vite instead of Next.js** - This is a Lovable project which uses Vite, so API routes are simulated via a service layer

## 📸 Demo Flow

1. Open the app → Onboarding screen
2. Click "Sign In" → Home/Explore page
3. Browse products by category
4. Click a product → Product Details
5. Select size and color → Add to Cart
6. View cart → Checkout Now
7. Review order → Pay Now
8. Order confirmed!

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain?

Yes! Navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📄 License

MIT
