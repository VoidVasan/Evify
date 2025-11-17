# Evify - Global Student Event Finder

A modern, responsive landing page for Evify - a platform that helps students ages 13-18 discover competitions, olympiads, hackathons, MUNs, debates, science fairs, fests, and online events worldwide.

## Features

- ✨ Modern glassmorphism design
- 🎨 Purple (#7B5CFF) primary color theme
- 📱 Fully responsive (mobile & desktop)
- ⚡ Built with React + Vite
- 🎯 TailwindCSS for styling
- 🔍 Search bar with category filter
- 📊 8 popular event categories
- 🔥 Trending events showcase
- 🎭 Smooth animations and hover effects

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\SABARI\OneDrive\New folder\Evfiy"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Evfiy/
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Hero section with headline and CTAs
│   │   ├── SearchBar.jsx      # Search bar component
│   │   ├── Categories.jsx     # Popular categories section
│   │   └── TrendingEvents.jsx # Trending events showcase
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Components

### Hero
- Main headline and subheadline
- Two CTA buttons (Explore Events, Sign Up)
- Responsive typography

### SearchBar
- Search input field
- Category dropdown filter
- Search button
- Glassmorphism effect

### Categories
- 8 category cards with icons
- Gradient backgrounds
- Hover animations
- Responsive grid layout

### TrendingEvents
- 5 event cards with details
- Category tags
- Location and deadline info
- Bookmark icons
- View Details buttons

## Styling

- **Primary Color**: #7B5CFF (Purple)
- **Design Style**: Glassmorphism with gradient background
- **Typography**: System fonts with responsive sizing
- **Layout**: Mobile-first responsive design

## Technologies Used

- **React 18.3.1** - UI library
- **Vite 5.3.1** - Build tool
- **TailwindCSS 3.4.4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Author

Built for Evify - Global Student Event Finder
