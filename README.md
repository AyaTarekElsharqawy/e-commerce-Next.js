This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Project Structure & Key Files

This project uses the Next.js App Router and is organized as follows:

- `app/page.tsx` — Home page (main landing page, hero slider, product overview)
- `app/components/` — Reusable UI components (Navbar, Footer, ProductCard, HeroSlider, etc.)
- `app/products/page.tsx` — Products listing page with search and pagination
- `app/cart/page.tsx` — Shopping cart page
- `app/favorites/page.tsx` — Favorites (wishlist) page
- `app/login/page.tsx` & `app/signup/page.tsx` — Authentication pages
- `app/context/` — React context providers for cart and favorites
- `app/lib/api.ts` — API functions for fetching product data
- `app/types/product.ts` — TypeScript types for products
- `public/` — Static assets (images, icons)
- `app/globals.css` — Global styles (Tailwind CSS)

Implementation period : 2days
