# ROAD

ROAD is a techwear storefront and brand website built with React and TypeScript. The application combines a cinematic home page, product catalog, filtering and search, product detail galleries, a browser-persistent cart prototype, local authentication, and a profile interface.

The visual system uses Tailwind CSS, dark surfaces, custom typography, GSAP animations, and locally hosted media.

## Features

- Cinematic home page with a local hero video, animated sections, and brand content
- Responsive desktop navigation and a full-screen mobile sidebar
- Static product catalog loaded from `public/data.json`
- Product search in an overlay interface
- Multiple category filters and a price range
- Ascending and descending sorting by price or product name
- Product galleries with color and size selection
- Cart prototype persisted in `localStorage`
- Registration and sign-in forms using React Hook Form, Zod, and `js-cookie`
- Profile page with static order, loyalty, and wishlist data
- Lazy-loaded About, Contact, Marketplace, and profile routes
- GSAP scroll and entrance animations with reduced-motion support
- Vercel SPA rewrites for direct application URLs

## Technology Stack

| Area | Technology |
| --- | --- |
| UI | React 19, React DOM |
| Language | TypeScript 6 |
| Routing | React Router 7 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | GSAP, `@gsap/react` |
| Forms and validation | React Hook Form, Zod |
| Cookie handling | `js-cookie`, `react-cookie` |
| Icons | Lucide React |
| Code quality | ESLint, Biome |
| Hosting output | Static, Vercel-compatible build |

## Project Structure

```text
road/
├── public/
│   ├── data.json             # Product catalog
│   ├── products/             # Product images and galleries
│   ├── robots.txt
│   └── logo.png
├── src/
│   ├── assets/               # Video, fonts, and static resources
│   ├── components/
│   │   ├── ai/               # AI feature blocks
│   │   ├── authorization/    # Sign-in and registration interface
│   │   ├── contact/          # Contact-page components
│   │   ├── hero/             # Home hero blocks
│   │   ├── layout/           # Header, footer, sidebar, and shared layout
│   │   ├── products/         # Marketplace and product details
│   │   ├── profile/          # Profile sections
│   │   └── ui/               # Reusable UI elements
│   ├── context/
│   │   ├── auth/             # Authentication React Context
│   │   └── data/             # Catalog and cart React Context
│   ├── data/                 # Content, navigation, categories, and mock data
│   ├── hooks/                # Cinematic-scroll helpers
│   ├── lib/                  # GSAP and category helpers
│   ├── pages/                # Page components and lazy exports
│   ├── schema/               # Zod authentication schemas
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Shared application layout
│   └── main.tsx              # Router and application bootstrap
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── README.md
```

## Prerequisites

- Node.js 20.19 or newer
- npm

## Installation

```bash
npm install
```

To install dependencies exactly as recorded in the lockfile, use:

```bash
npm ci
```

## Development

```bash
npm run dev
```

Vite normally serves the application at `http://localhost:5173`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Run the TypeScript project build and create the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

The production build is written to `dist/`.

## Application Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | Home | Brand hero, categories, mission, and feature sections |
| `/marketplace` | Marketplace | Catalog filters, sorting, and product grid |
| `/about` | About | Brand history, positioning, and timeline |
| `/contact` | Contact | Contact information and inquiry interface |
| `/product/:id/:name` | Details | Product gallery, color, size, and cart actions |
| `/profile` | Profile | User profile and mock dashboard |

No catch-all route is currently configured. `vercel.json` rewrites application requests to `index.html` so direct URLs can be handled by the SPA.

## Catalog Data

The `DataProvider` requests `/data.json` when the application mounts and exposes the `allProducts` array through React Context. The current catalog contains 31 products across multiple techwear categories.

Each product follows this data shape:

```json
{
  "category": "Jacket",
  "color": ["Black", "Charcoal"],
  "description": "Stripped-down utility shell built for daily wear in any conditions.",
  "id": 0,
  "images": [
    "/products/jacket1/front.webp",
    "/products/jacket1/behind.webp"
  ],
  "isNew": true,
  "name": "Jacket",
  "price": 100,
  "size": ["S", "M", "L", "XL"],
  "src": "/products/jacket1/front.webp"
}
```

To add a product:

1. Place the image files in `public/products/<product-folder>/`.
2. Add the product object to the `allProducts` array in `public/data.json`.
3. Use a unique numeric `id`.
4. Use root-relative public paths in `src` and `images`.
5. Update the category configuration if the new category is not already available.

## Marketplace Behavior

- Categories are selected with OR-style matching.
- The price control spans from 50 to 1000, with a default maximum of 500.
- Sorting supports price and product name in ascending or descending order.
- The size selector is present in the filter panel, but does not currently filter products.
- Filters become a bottom sheet on mobile screens.

## State Management

The application uses two React Context providers:

- `DataContext` loads the product catalog and manages cart state.
- `AuthContext` reads and writes a browser cookie named `user`.
- Cart entries are stored under the `cartItems` key in `localStorage`.
- A product is represented only once in the current cart implementation.
- `addCart` ignores an existing product ID, while `removeCart` removes an entry by ID.

## Authentication and Profile

Authentication is a browser-side prototype:

- Registration stores JSON in a cookie that expires after seven days.
- Sign-in compares credentials against the user cookie.
- Passwords are not sent to a backend and are not securely verified.
- Passwords are stored in the same browser data used for the prototype and are not suitable as production credentials.
- The user icon is displayed only when a user cookie exists.
- Profile orders, loyalty statistics, and wishlist entries use static mock data.

This authentication flow must be replaced with server-side authentication and secure credential handling before production use.

## Styling and Animation

- Shared colors and global styles are defined in `src/index.css`.
- Tailwind CSS 4 is loaded through the Vite plugin.
- GSAP initialization is located in `src/lib/gsap.ts`.
- Scroll-triggered animations respect the user's reduced-motion preference.

## Build and Deployment

Create a production build:

```bash
npm run build
```

Deploy the generated `dist/` directory to an SPA-compatible static host. For client-side routing, the host must serve `index.html` for application routes while continuing to serve CSS, JavaScript, and public assets normally.

The existing `vercel.json` provides the required SPA fallback for Vercel.

## Current Limitations

- Authentication is not connected to a backend API.
- The cart badge always displays 0 and is not connected to live cart state.
- There is no cart drawer or checkout page.
- `Buy Now` does not submit a checkout action.
- The contact form does not submit to a backend.
- Products, profile orders, and wishlist items come from static JSON or source data.
- Profile sidebar links for orders, wishlist, addresses, payments, settings, security, and notifications are currently not registered as application routes.

## License

No license file is included. Choose and add a license before distributing the project publicly.
