# CineSynthesis - Movie Ratings Aggregator

CineSynthesis is a modern, responsive movie review website that aggregates ratings from popular platforms including IMDb, Rotten Tomatoes, and Metacritic. The application calculates a unique, unified rating called "CineScore" based on these collected ratings, providing users with a comprehensive view of a movie's reception.

## Features

- **Unified Rating System**: Proprietary CineScore algorithm that intelligently weighs and combines ratings from multiple sources
- **Comprehensive Movie Information**: Detailed movie pages with cast, crew, synopsis, and technical details
- **Advanced Search**: Find movies by title, genre, release year, and more
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent user preference
- **Top Rated & New Releases**: Curated collections of the highest-rated films and latest releases
- **Interactive UI**: Modern, clean interface with smooth animations and transitions

## Live Demo

[View Live Demo](https://cinesynthesis.vercel.app)

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://via.placeholder.com/400x225?text=Homepage" alt="Homepage" width="400"/>
  <img src="https://via.placeholder.com/400x225?text=Movie+Detail" alt="Movie Detail" width="400"/>
  <img src="https://via.placeholder.com/400x225?text=Search+Results" alt="Search Results" width="400"/>
  <img src="https://via.placeholder.com/400x225?text=Dark+Mode" alt="Dark Mode" width="400"/>
</div>

## Technologies Used

- **Frontend Framework**: React.js with functional components and hooks
- **UI Library**: Material UI for component styling
- **Routing**: React Router v6
- **State Management**: React Context API
- **API Integration**: Axios for HTTP requests
- **Movie Data**: TMDB API and OMDb API
- **Animations**: CSS transitions and Swiper.js for carousels
- **SEO**: React Helmet for metadata management
- **Build Tool**: Vite for fast development and optimized builds

## CineScore Algorithm

The CineScore is calculated using a weighted average of ratings from different platforms:

- **IMDb**: Weighted at 40% (60% for audience-focused mode)
- **Rotten Tomatoes**: Weighted at 35% (20% for audience-focused mode)
- **Metacritic**: Weighted at 25% (20% for audience-focused mode)

The algorithm also considers:

- Reliability based on the number of available rating sources
- User preference for critic vs. audience focus
- Normalization of different rating scales (e.g., converting percentage scores to a 0-10 scale)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anayy09/cinesynthesis.git
   cd cinesynthesis
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory with your API keys:

   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```
4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## API Integration

CineSynthesis uses two primary APIs:

### TMDB API

- Used for movie details, images, cast information, and search functionality
- Documentation: [TMDB API Docs](https://developers.themoviedb.org/3)

### OMDb API

- Used for aggregated ratings from IMDb, Rotten Tomatoes, and Metacritic
- Documentation: [OMDb API Docs](http://www.omdbapi.com/)

## Testing

```bash
npm run test
# or
yarn test
```

## Responsive Design

CineSynthesis is designed to work seamlessly across all device sizes:

- **Mobile**: Optimized layout with collapsible navigation
- **Tablet**: Adjusted grid layouts and component sizing
- **Desktop**: Full-featured experience with enhanced visual elements

## Dark Mode

The application includes a toggle for switching between light and dark themes. User preference is saved to local storage for persistence across sessions.

## Accessibility

CineSynthesis follows WCAG 2.1 guidelines to ensure accessibility:

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus management

## Future Improvements

- User authentication and personalized recommendations
- User reviews and ratings
- Watchlist functionality
- Advanced filtering options
- Performance optimizations for image loading
- Integration with streaming service availability data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for their comprehensive movie API
- [OMDb API](http://www.omdbapi.com/) for providing aggregated movie ratings
- [Material UI](https://mui.com/) for the component library
- [React](https://reactjs.org/) and the entire React ecosystem

Made with ❤️ by Anay
