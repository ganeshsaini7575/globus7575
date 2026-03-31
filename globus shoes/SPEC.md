# Globus Shoes - E-Commerce Website Specification

## 1. Project Overview

- **Project Name**: Globus Shoes
- **Type**: Single Page Application (SPA) E-Commerce Website
- **Core Functionality**: A modern shoe store with animated homepage, product catalog, shopping cart, and user profile
- **Target Users**: Online shoe shoppers looking for premium footwear

## 2. UI/UX Specification

### Layout Structure

**Navigation Bar (Fixed)**
- Logo on left (GLUBUS text logo)
- Nav links: Home, Catalog, Cart, Profile
- Cart icon with item count badge on right

**Pages**
1. **Home Page** - Hero section, featured products, brand story
2. **Catalog Page** - Product grid with filters
3. **Cart Page** - Cart items with quantity controls
4. **Profile Page** - User info and order history

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**
- Primary: `#1a1a2e` (Deep Navy)
- Secondary: `#16213e` (Dark Blue)
- Accent: `#e94560` (Coral Red)
- Accent Secondary: `#0f3460` (Royal Blue)
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`
- Background: `#0f0f1a`
- Card Background: `#1e1e32`
- Success: `#00d9a5`

**Typography**
- Headings: 'Bebas Neue', sans-serif
- Body: 'Poppins', sans-serif
- Logo: 'Bebas Neue', 32px
- H1: 48px (mobile: 32px)
- H2: 36px (mobile: 24px)
- H3: 24px (mobile: 18px)
- Body: 16px
- Small: 14px

**Spacing System**
- Section padding: 80px 0
- Container max-width: 1200px
- Card padding: 20px
- Grid gap: 30px

**Visual Effects**
- Box shadows: `0 10px 30px rgba(233, 69, 96, 0.1)`
- Border radius: 12px for cards, 8px for buttons
- Gradient overlays on hero
- Glassmorphism effect on cards

### Components

**Product Card**
- Image with hover zoom effect
- Product name
- Price
- Rating stars
- "Add to Cart" button
- Hover: scale up, glow effect

**Button Styles**
- Primary: Coral red background, white text
- Secondary: Transparent with border
- Hover: brightness increase, slight scale

**Cart Item**
- Product thumbnail
- Name and size
- Quantity controls (+/-)
- Price
- Remove button

**Animations**
- Hero text: Fade in and slide up on load
- Product cards: Staggered fade in on scroll
- Page transitions: Smooth fade
- Cart badge: Bounce on add
- Buttons: Hover scale and glow
- Floating shoes in hero background

## 3. Functionality Specification

### Core Features

**Home Page**
- Animated hero section with floating shoe images
- Featured products carousel (6 products)
- Brand story section with stats
- Newsletter signup
- Smooth scroll navigation

**Catalog Page**
- Product grid (9 products)
- Category filter (All, Running, Casual, Formal, Sports)
- Price range display
- Sort by price
- Add to cart from catalog

**Cart System**
- Add/remove items
- Update quantities
- Calculate total
- Show item count in header
- Persist cart in localStorage

**Profile Page**
- User profile card (mock data)
- Order history section
- Saved addresses (mock)

### Products Data (9 Products)
1. Nike Air Max - $129.99 - Running
2. Adidas Ultraboost - $179.99 - Running
3. Converse Chuck Taylor - $89.99 - Casual
4. Vans Old Skool - $79.99 - Casual
5. Clarks Desert Boot - $149.99 - Formal
6. Puma RS-X - $119.99 - Sports
7. Reebok Classic - $99.99 - Casual
8. New Balance 574 - $109.99 - Running
9. Timberland Boot - $189.99 - Casual

### User Interactions
- Click navigation to switch pages
- Click product to add to cart
- Click +/- to adjust quantity
- Click remove to delete item
- Smooth scroll animations

## 4. Acceptance Criteria

1. ✅ Home page loads with animated hero section
2. ✅ Navigation works between all 4 pages
3. ✅ Products display in catalog with category filtering
4. ✅ Add to cart updates cart count badge
5. ✅ Cart shows all added items with correct totals
6. ✅ Quantity can be adjusted in cart
7. ✅ Items can be removed from cart
8. ✅ Profile page shows mock user data
9. ✅ All animations work smoothly
10. ✅ Responsive on mobile, tablet, desktop
11. ✅ Cart persists on page refresh (localStorage)
