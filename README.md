# ElectroFusion

ElectroFusion is a multi-vendor e-commerce platform designed to provide a seamless online shopping experience for electronic products and gadgets.

## Abstract

ElectroFusion V2 is built with modern full-stack tools for improved performance, scalability, and developer experience. Vendors can efficiently list and manage their products, while customers enjoy a fast, interactive, and secure shopping journey. With optimized backend handling and dynamic UI/UX features, V2 delivers a responsive and engaging platform for electronic commerce.

## Project Guide

Sulagna Basak


## Team Members

Sattwik Sinha Mahapatra

Sabnam Begum

Arina Dutta

Aditya Prasad

---

## Project Details

### Features

- 🔍 Advanced Search & Filtering — Smart product discovery using query parameters and filters.

- ⭐ Product Ratings & Reviews — Let users provide feedback and improve product credibility.

- 🔐 Authentication & Authorization — Role-based access using Clerk.

- 🛒 Multi-vendor Dashboard — Vendor-specific views to manage product listings and track orders.

- 💳 Secure Checkout Flow — Integration-ready for payment gateways with proper validation.

- 📦 Order Tracking System — Customers can track their order status in real-time.

- ☁️ Image Upload & Optimization — Cloudinary-powered, responsive image handling.

- 🔄 Real-time Data Sync — Convex backend with reactive UI updates and live data.

- 📊 Interactive Charts — Analytics and insights using Recharts.

- 🔔 Notification System — Webhook-based updates using Svix.

- ⚡ Modern UI & UX — Built with Tailwind v4, Framer Motion, and Shadcn UI for sleek interactions.

- 🧠 Schema Validation — Robust input handling with Zod on both frontend and backend.

- 🌐 URL State Management — Using Nuqs to sync filters, sorting, and pagination with URL state.

---

## Architecture

### Tech Stack Overview:

Frontend: Next.js App Router (React 19), Tailwind CSS v4, Zustand, Zod, Framer Motion, Shadcn UI

Backend: Convex (Database + Functions), Clerk (Auth), Cloudinary (Media Storage), Svix (Webhooks)


## Key Architectural Highlights

[Client] ←→ [Next.js Frontend]
   |          ├─ Auth UI (Clerk)
   |          ├─ State Mgmt (Zustand + Nuqs)
   |          └─ UI (Tailwind + Shadcn + Motion)
   ↓
[Convex Functions API Layer]
   ├─ Secure Convex queries & mutations
   ├─ Real-time sync with frontend
   └─ Validated by Zod schemas

[Convex DB] ←→ Schema-less, reactive database

[Cloudinary] ←→ Media uploads via signed URL  
[Clerk] ←→ User management (JWT-based auth)  
[Svix] ←→ Event triggers and notifications (webhooks)


---

## Technologies Used

### Frontend

Next.js 15

React 19

Tailwind CSS v4

Shadcn UI

Zod

Zustand

Nuqs

Framer Motion

Recharts


### Backend

Convex

Clerk

Cloudinary

Svix
