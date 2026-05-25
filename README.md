# 🌿 Botanica - Luxury Botanical E-Commerce Boutique

Botanica is a premium, high-end plant e-commerce application built with **React.js** and **Tailwind CSS**. Rebuilt from a simple landing page, it now features a sophisticated, warm editorial design inspired by luxury botanical boutiques. It integrates dynamic client-side routing, full cart checkout systems, custom review boards, and hardware-accelerated 3D parallax interactions.

---

## ✨ Features

- 🎨 **Luxury Editorial Theme**: A sophisticated color palette consisting of a warm Linen background (`#F9F8F6`), Deep Forest Green headings (`#1B362F`), and Warm Sand accents (`#C2A684`). Uses elegant serif headers paired with clean sans-serif details.
- 🧭 **Multi-Page Client-Side Routing**: Instant, lightweight navigation between pages without full page reloads:
  - **Home View**: Curated brand intro, best-seller showcases, O2 collection highlights, and client stories.
  - **Shop View**: Plant catalog with search inputs, category filter tags, max-price range sliders, and sorting options.
  - **Product Detail View**: Full visual display, botanical descriptions, detailed care specs (light, watering cycles, dimensions, pet safety), and basket additions.
  - **Cart & Checkout View**: Itemized shopping basket, quantity controls, billing summaries (shipping, taxes, totals), and a shipping address checkout form.
  - **Contact View**: Greenhouse addresses, phone details, opening hours, stylized maps, and inquiry submission forms.
  - **Reviews Board**: Testimonial list with a real-time review posting form.
- 🏺 **Interactive 3D Hover & Parallax Effects**: 
  - Dynamic cursor parallax on the Hero layout where layers (background, main plant, card) shift independently.
  - Hardware-accelerated 3D card tilt on hover, causing plant assets to "float" off the card face using `translate3d(..., 50px)`.
- 📱 **Fully Responsive**: Optimized fluid grid layouts for Mobile, Tablet, and Desktop screens.

---

## 🛠️ Tech Stack

- **Frontend Core:** React.js (v19)
- **Styling Engine:** Tailwind CSS (v3)
- **Icons Library:** Lucide React
- **Typography:** Plus Jakarta Sans & Playfair Display (via Google Fonts)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/iam-rishab07/Botanica.git
cd Botanica
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```
The app will open automatically at [http://localhost:3000](http://localhost:3000).

### 4. Create a production build
```bash
npm run build
```
The optimized bundle will be compiled inside the `build/` directory.