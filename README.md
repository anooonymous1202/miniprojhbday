# 🎉 Haasika's 18th Birthday Website

A beautiful, personalized birthday greeting website featuring photo galleries, celebration animations, and festive pink & gold design themes.

## ✨ Features

- **Animated Birthday Greeting**: Dramatic "18" animation that pops in front then fades to background
- **Personal Photo Gallery**: Showcase of beautiful memories with modal view and navigation
- **Celebration Effects**: Interactive confetti animations triggered by user interaction
- **Responsive Design**: Works perfectly on all devices from mobile to desktop
- **Festive Theme**: Pink and gold color scheme with elegant typography
- **Smooth Animations**: Powered by Framer Motion for delightful user experience

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast development server and build tool
- **Tailwind CSS** - Utility-first styling with custom theme
- **Framer Motion** - Smooth animations and transitions
- **Wouter** - Lightweight client-side routing
- **TanStack React Query** - Data fetching and state management
- **Shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Clean, customizable icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **TypeScript** - Type-safe backend development
- **In-Memory Storage** - No database required, perfect for personal sites

### Development Tools
- **ESBuild** - Fast JavaScript bundling
- **PostCSS** - CSS processing with Autoprefixer
- **Drizzle ORM** - Type-safe database toolkit (configured for future use)

## 🗄️ Data Storage

This project uses **in-memory storage** rather than a database, making it:
- ✅ Simple to deploy and run
- ✅ No database setup required
- ✅ Perfect for personal/demo websites
- ✅ Fast and lightweight

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd birthday-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to see the website

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── confetti-animation.tsx
│   │   │   ├── photo-gallery.tsx
│   │   │   └── photo-modal.tsx
│   │   ├── pages/          # Page components
│   │   │   └── birthday.tsx
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory storage implementation
│   └── vite.ts            # Vite development integration
├── shared/                # Shared TypeScript types
│   └── schema.ts
└── attached_assets/       # Personal photos and images
```

## 🎨 Customization

### Colors
The festive theme uses:
- **Primary Pink**: `#FF69B4` (Festive pink)
- **Secondary Gold**: `#FFD700` (Celebratory gold)
- **Accent Purple**: `#9370DB` (Soft purple)

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body Text**: Montserrat (clean sans-serif)

### Images
Replace images in `attached_assets/` folder and update imports in `photo-gallery.tsx`

## 🌟 Key Components

### Birthday Animation
The main "18" animation creates a dramatic entrance effect that scales up, then fades into the background while text content appears in sequence.

### Photo Gallery
- Responsive grid layout
- Modal view with keyboard navigation
- Smooth hover effects and transitions
- Custom captions for each photo

### Confetti Animation
Interactive celebration effect triggered by the "Celebrate!" button, creating 50 colorful confetti pieces with physics-based animation.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layout for tablets (768px+)
- **Desktop**: Full experience for desktop (1024px+)

## 🚀 Deployment

Since this project uses in-memory storage, it can be easily deployed to:
- **Replit** (recommended for this setup)
- **Vercel**
- **Netlify**
- **Railway**
- Any Node.js hosting platform

No database configuration required!

## 🎂 Perfect For

- Personal birthday websites
- Anniversary celebrations
- Photo showcase sites
- Special occasion greetings
- Portfolio demonstrations

## 💝 Special Thanks

Created with love for Haasika's special 18th birthday celebration! 🎉

---

*Built with modern web technologies and lots of festive spirit* ✨