# VetClinic Frontend

Frontend application built with **React + TypeScript + Vite**, demonstrating modern **MACH architecture** principles and real-world integrations.

---

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **UI Library**: Chakra UI
- **Routing**: React Router DOM
- **State / Forms**: react-hook-form (if used in project)
- **CMS**: Contentful (GraphQL API)
- **External API**: JSONPlaceholder (demo microservice)
- **Deployment**: Vercel / GitHub Pages

---

## 🧠 Architecture Overview

This project follows MACH principles:

- **Microservices** → External APIs (JSONPlaceholder)
- **API-first** → Contentful GraphQL
- **Cloud-native** → Vercel deployment ready
- **Headless** → CMS-driven pages

---

## 📁 Project Structure

```
src/
├── pages/              # Route-level pages
├── services/           # API & CMS services
├── routes/             # Routing configuration
├── components/         # Reusable UI components
├── hooks/              # Custom hooks
└── utils/              # Helpers
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env` file:

```bash
VITE_CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
VITE_CONTENTFUL_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
```

### 3. Run development server

```bash
npm run dev
```

---

## 🏗️ Build & Deploy

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deploy

- Vercel (recommended)
- GitHub Pages

---

## 🔌 Services

- **ContentfulClient** — GraphQL client
- **PetService** — fetch pets list & details
- **ContentPageService** — CMS-driven pages by slug
- **JsonPlaceholderService** — demo posts/comments API

---

## 🌐 Routing

Routes are defined in:

```
src/routes/pageRouteMap.ts
```

Using:

- `createBrowserRouter`
- `RouterProvider`

---

## 📌 Features

- CMS-driven pages
- Pagination (pets listing)
- Dynamic routing (pet details)
- External API integration
- Clean separation of concerns

---

## 🧪 Future Improvements

- Add caching layer for API calls
- Introduce global state (Zustand / Redux)
- Improve SEO (meta tags from CMS)
- Add error boundaries
- Add unit & integration tests

---

## 📄 License

MIT
