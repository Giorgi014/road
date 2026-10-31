# ROAD

ROAD is a responsive techwear storefront and brand website built with React, TypeScript, and Vite. It combines a cinematic landing page, animated category navigation, a searchable product catalog, marketplace filters, product detail views, and a browser-persistent cart prototype.

The experience uses a futuristic visual system with dark surfaces, electric blue accents, custom typography, GSAP motion, and a collection of locally hosted product images.

## Features

- Cinematic home page with an imported hero video
- Responsive desktop navigation and full-screen mobile sidebar
- Marketplace category, price, and sorting controls
- Name-based product search
- Product detail galleries with color and size selection
- Client-side cart state persisted in `localStorage`
- About, contact, and brand-feature sections
- Login and sign-up modal interface
- Lazy-loaded route components
- Vercel SPA rewrite configuration for direct route navigation
- Reduced-motion handling for GSAP animations

## Technology Stack

| Area | Technology |
| --- | --- |
| UI | React 19, React DOM |
| Language | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Animation | GSAP and `@gsap/react` |
| Icons | Lucide React |
| Catalog data | Static JSON in `public/data.json` |
| Deployment | Vercel-compatible static output |

## Project Structure

```text
road/
├── public/
│   ├── data.json             # Product catalog
│   └── products/             # Product and gallery images
├── src/
│   ├── assets/               # Video, imagery, and fonts
│   ├── components/
│   │   ├── ai/               # AI feature presentation
│   │   ├── authorization/    # Sign-in and sign-up interface
│   │   ├── contact/          # Contact page components
│   │   ├── hero/             # Hero copy, video, image, and vignette
│   │   ├── layout/           # Header, navigation, sidebar, and footer
│   │   ├── products/         # Marketplace and product-detail components
│   │   └── ui/               # Shared cards, buttons, search, and inputs
│   ├── context/data/         # Product and cart context provider
│   ├── data/                 # Navigation, copy, categories, and options
│   ├── lib/                  # Category helpers and GSAP setup
│   ├── pages/                # Application page components
│   ├── types/                # Shared TypeScript interfaces
│   ├── App.tsx               # Shared layout shell
│   └── main.tsx              # Router and application bootstrap
├── index.html
├── package.json
├── vite.config.ts
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Vite prints the local development URL in the terminal, normally `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The optimized application is written to `dist/`.

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | Home | Brand hero, category cards, mission, and future-tech features |
| `/marketplace` | Marketplace | Filterable and sortable product catalog |
| `/about` | About | Brand story and positioning |
| `/contact` | Contact | Contact page content and inquiry form |
| `/product/:id/:name` | Product details | Product gallery, options, description, and cart action |

`vercel.json` rewrites every application route to `index.html` so React Router can handle direct URLs in production.

## Catalog Data

The application fetches `/data.json` when `DataProvider` mounts. `public/data.json` contains an `allProducts` array, which is exposed through React context.

Each product should follow the `AllProducts` interface:

```json
{
  "id": 0,
  "category": "Jacket",
  "name": "Example Jacket",
  "description": "A brief product description.",
  "price": 180,
  "size": ["S", "M", "L", "XL"],
  "color": ["Black", "Navy"],
  "src": "/products/example/front.webp",
  "images": [
    "/products/example/front.webp",
    "/products/example/back.webp"
  ],
  "isNew": true
}
```

Place referenced assets under `public/products/<product-directory>/` and use root-relative paths such as `/products/example/front.webp`.

## Marketplace Behavior

The marketplace supports:

- Multiple category selections
- A minimum and maximum price range
- Price and name sorting
- A responsive filter panel that becomes a bottom sheet on small screens
- Product cards that open product-detail routes

Category filtering combines configured plural category names with product category values. When adding a new category, update both the catalog data and the category configuration in `src/data/content.tsx`.

## State Management

ROAD uses React Context for application data and cart state:

- `DataProvider` loads the static catalog and stores it in memory.
- `cartItems` is initialized from the `cartItems` local-storage key.
- Cart changes are written back to `localStorage`.
- Duplicate products cannot be added through the current `addCart` implementation.
- `removeCart` is available for cart management UI.

Authentication is currently a client-side presentation prototype. The sign-in and sign-up forms prevent browser navigation but are not connected to an authentication service or backend.

## Styling and Animation

Global styles, design tokens, Tailwind theme configuration, and custom range controls are defined in `src/index.css`. The page layout is composed from reusable components under `src/components`.

GSAP is initialized through `src/lib/gsap.ts`. The home category grid uses scroll-triggered entrance animations and returns early when the user has enabled reduced motion.

## Adding a Product

1. Add gallery assets to `public/products/<product-folder>/`.
2. Add a product object to the `allProducts` array in `public/data.json`.
3. Ensure `id` is unique and every entry in `images` has a valid public path.
4. Add matching colors and sizes in `color` and `size`.
5. Add the category to `ALL_CATEGORIES` in `src/data/content.tsx` if it does not already exist.

## Deployment

Build the project and publish the generated `dist/` directory to any SPA-capable static host:

```bash
npm run build
```

Keep the existing Vercel SPA rewrite for direct-route support. Hosts without SPA rewrite support need an equivalent rule that serves `index.html` for unknown application routes while preserving static asset requests.

## Known Prototype Limitations

- Authentication forms are not connected to a backend.
- The header cart badge does not yet reflect the live cart item count.
- There is no cart drawer or checkout page yet.
- Buy Now, contact submission, and other commerce actions require backend integration.
- Product prices and catalog data are stored in a static JSON file.

## License

No license file is currently included in this repository. Add a license before distributing the project publicly or publishing it as an open-source package.
