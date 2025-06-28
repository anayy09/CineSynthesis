# CineSynthesis 🎬

> **A modern movie ratings aggregator that unifies scores from multiple platforms into a single, comprehensive CineScore™**

CineSynthesis is a sophisticated React-based web application that aggregates movie ratings from IMDb, Rotten Tomatoes, and Metacritic, presenting them alongside a proprietary **CineScore™** algorithm. Built with modern web technologies, it provides movie enthusiasts with a comprehensive, unified view of film ratings and detailed information.

[View Live Demo](https://cinesynthesis.vercel.app)

## ✨ Features

### Core Functionality

- **🎯 CineScore™ Algorithm**: Proprietary unified rating system that intelligently combines ratings from multiple platforms
- **🔍 Advanced Movie Search**: Search movies by title with real-time suggestions and comprehensive results
- **📱 Fully Responsive Design**: Optimized experience across desktop, tablet, and mobile devices
- **🎨 Dark/Light Theme Toggle**: System-wide theme switching with persistent user preferences
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and optimized production builds

### Movie Discovery

- **🔥 Trending Movies**: Dynamic carousel showcasing trending films updated weekly
- **⭐ Top Rated Collections**: Curated lists of highest-rated movies across platforms
- **🆕 New Releases**: Latest theatrical releases and now-playing movies
- **🎭 Genre-based Browsing**: Explore movies by specific genres and categories

### Detailed Movie Information

- **📊 Multi-Platform Ratings**: Side-by-side comparison of IMDb, Rotten Tomatoes, and Metacritic scores
- **🎬 Comprehensive Details**: Cast, crew, synopsis, runtime, budget, revenue, and technical information
- **🖼️ Rich Media**: High-quality posters, backdrops, and promotional images
- **👥 Cast & Crew**: Detailed cast information with character names and profile images
- **🎵 Trailers & Videos**: Embedded movie trailers and promotional content

### User Experience

- **🔄 Critic vs Audience Focus**: Toggle between critic-focused and audience-focused scoring algorithms
- **📈 Rating Reliability Indicators**: Visual indicators showing the reliability of scores based on source availability
- **🔝 Back to Top Navigation**: Smooth scrolling and navigation enhancements
- **⚠️ Error Boundaries**: Robust error handling with graceful fallbacks
- **🔄 Loading States**: Skeleton loaders and progress indicators for smooth UX

## 🛠️ Tech Stack

### Frontend Framework & Libraries

- **React 19.0** - Modern functional components with hooks
- **React Router v7** - Client-side routing and navigation
- **Material-UI v6** - Comprehensive React component library
- **Emotion** - CSS-in-JS styling solution
- **Swiper 11** - Touch slider for movie carousels

### Development & Build Tools

- **Vite 6.2** - Next-generation frontend build tool
- **ESLint 9** - Code linting and quality assurance
- **@vitejs/plugin-react** - Vite React integration

### API Integration & Data

- **Axios 1.8** - HTTP client for API requests
- **TMDB API** - Movie database for comprehensive film information
- **OMDb API** - Aggregated ratings from multiple platforms

### SEO & Performance

- **React Helmet Async** - Dynamic document head management
- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Responsive images with multiple resolutions

### State Management & Context

- **React Context API** - Global state management for theme and user preferences
- **Custom Hooks** - Reusable logic for movie data fetching and management

## 🧮 CineScore™ Algorithm

The **CineScore™** is calculated using a sophisticated weighted average system:

### Scoring Weights

**Critic-Focused Mode (Default):**

- IMDb: 40%
- Rotten Tomatoes Tomatometer: 35%
- Metacritic Metascore: 25%

**Audience-Focused Mode:**

- IMDb: 60% (increased weight for user ratings)
- Rotten Tomatoes Tomatometer: 20%
- Metacritic Metascore: 20%

### Algorithm Features

- **Scale Normalization**: Converts all ratings to a 0-10 scale for consistency
- **Reliability Assessment**: Calculates score reliability based on available sources (High/Medium/Low)
- **Dynamic Weighting**: Automatically adjusts weights when certain platforms are unavailable
- **Precision Rounding**: Results rounded to one decimal place for clarity

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or later)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anayy09/CineSynthesis.git
   cd CineSynthesis
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```

   **Get API Keys:**
   - [TMDB API](https://www.themoviedb.org/settings/api) - Free registration required
   - [OMDb API](http://www.omdbapi.com/apikey.aspx) - Free tier available

4. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Application**
   
   Navigate to `http://localhost:5173` in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── layout/         # Navigation, Footer
│   ├── movie/          # Movie-specific components
│   └── ui/             # Generic UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Route-based page components
├── services/           # API integration and data services
├── utils/              # Utility functions and helpers
├── theme.js            # Material-UI theme configuration
└── main.jsx           # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌟 Key Components

### CineScore Calculator

- **Location**: `src/utils/cineScoreCalculator.js`
- **Purpose**: Core algorithm for unified rating calculation
- **Features**: Weighted averaging, scale normalization, reliability assessment

### Movie Service

- **Location**: `src/services/movieService.js`
- **Purpose**: Centralized API integration layer
- **APIs**: TMDB and OMDb API management

### Theme Context

- **Location**: `src/context/ThemeContext.jsx`
- **Purpose**: Global theme state management
- **Features**: Dark/light mode toggle, localStorage persistence

## 🎨 Design System

### Color Palette

- **Primary**: Blue-based theme for professional appearance
- **Secondary**: Complementary accent colors
- **Success/Warning/Error**: Semantic color coding for ratings and states

### Typography

- **Headings**: Bold, clear hierarchy
- **Body Text**: Optimized for readability
- **Ratings**: Prominent, color-coded display

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.
