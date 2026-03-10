# Steel Designz — Phase 1 Architecture

Cinematic portfolio website for a professional makeup + hair artist.  
**Domain:** steeldesignz.com

This phase sets up the development environment and architecture only. No final design implementation yet.

---

## 1. Folder Structure

```
steel-designz/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── work/          # Place images here for Phase 2
│   │   └── icons/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── WorkGrid.jsx
│   │   ├── WorkItem.jsx
│   │   ├── Lightbox.jsx
│   │   ├── Categories.jsx
│   │   ├── Experience.jsx
│   │   ├── Bio.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Projects.jsx
│   │   └── SeoHead.jsx
│   ├── animations/
│   │   ├── revealImage.js
│   │   ├── smoothScroll.js
│   │   └── lightboxAnimation.js
│   ├── data/
│   │   ├── categories.js
│   │   └── experience.js
│   ├── hooks/
│   │   ├── useLenis.js
│   │   └── useReveal.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── typography.css
│   │   └── animations.css
│   ├── utils/
│   │   └── responsiveImage.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 2. Installed Dependencies

| Package | Purpose |
|---------|---------|
| react, react-dom | UI framework |
| gsap | Animations |
| lenis | Smooth scrolling |
| vite-imagetools | Responsive image generation |
| sharp | Image optimization (used by imagetools) |
| tailwindcss, @tailwindcss/vite | Styling |
| postcss, autoprefixer | CSS processing |
| react-helmet-async | SEO meta tags |

---

## 3. Run Development Server

```bash
cd steel-designz
npm run dev
```

Opens at **http://localhost:5173/**

---

## 4. Build for Production

```bash
cd steel-designz
npm run build
```

Output: `/dist`

- Minified JS
- Compressed CSS
- Tree-shaken bundles (GSAP, Lenis in separate chunks)
- Optimized images (when imported from `src/assets/images/work/`)

---

## 5. Preview Production Build

```bash
npm run preview
```

---

## Image Processing

Images in `src/assets/images/work/` automatically generate:

- **320px**
- **640px**
- **1024px**
- **1600px**
- **2000px**

Use `src/utils/responsiveImage.js` for helpers. Import example:

```js
import img from '@/assets/images/work/photo.jpg'
// defaultDirectives auto-applies w=320;640;1024;1600;2000
```

---

## Phase 2 Ready

- Modular components for auto-building sections from images
- `revealImage()` supports: fade, slideUp, scale, mask, parallax
- Lenis + GSAP ScrollTrigger synced
- Lightbox with prev/next, ESC, click-outside
- SEO: meta tags, OG, Twitter, Person/CreativeWork/Portfolio schema
