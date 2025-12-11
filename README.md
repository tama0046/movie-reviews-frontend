# Movie Reviews - Vue Frontend 🎬

> A modern Vue 3 frontend application for our Interactive Media Design movie review website project, connected to a Strapi headless CMS backend.

## Project Information

**Assignment:** Headless CMS Review Site  
**Course:** Interactive Media Design - Algonquin College  
**Due Date:** December 11, 2025  
**Status:** ✅ Complete

## Team Members

**Team Leader:** Manoj Tamang (tama0046) - [@tama0046](https://github.com/tama0046)

**Member:** Saskar Baniya (bani0029) - [@bani0029](https://github.com/bani0029)

**Member:** Roland Park (park0625) - [@park0625](https://github.com/park0625)

## Technologies Used

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite 5
- **Routing:** Vue Router 4
- **Styling:** Bootstrap 5 + Custom CSS
- **Icons:** Bootstrap Icons
- **HTTP Client:** Fetch API
- **Backend:** Strapi CMS (Headless)

## Features

✨ **Core Features:**
- 🎥 Display list of movie reviews with beautiful cards
- 🔍 Real-time search functionality (by title, genre, synopsis)
- 📝 Individual movie review pages with detailed information
- ⭐ Rating system with visual indicators
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern gradient UI with smooth animations
- 🚀 Fast page loads with Vite

**Pages:**
- **Home Page:** Grid layout of all movie reviews with search
- **Movie Detail Page:** Complete review with poster, rating, synopsis, and full review

## Project Structure

```
movie-reviews-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.vue        # Site navigation
│   │   ├── Footer.vue        # Site footer with team info
│   │   └── MovieCard.vue     # Movie card component
│   ├── views/
│   │   ├── Home.vue          # Home page with movie grid
│   │   └── MovieDetail.vue   # Individual movie page
│   ├── services/
│   │   └── api.js            # API service for Strapi backend
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── App.vue               # Root component
│   ├── main.js               # Application entry point
│   └── style.css             # Global styles
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── .env                     # Environment variables

```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Strapi backend running on `http://localhost:1337`

### Installation

```bash
# Clone the repository
git clone https://github.com/tama0046/movie-reviews-frontend.git

# Navigate to project directory
cd movie-reviews-frontend

# Install dependencies
npm install

# Create environment file (optional - defaults to localhost:1337)
cp .env.example .env

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:1337
```

## API Integration

The frontend connects to the Strapi backend API:

- **Get all movies:** `GET /api/movie-reviews?populate=*`
- **Get single movie:** `GET /api/movie-reviews/:id?populate=*`
- **Search movies:** `GET /api/movie-reviews?populate=*&filters[title][$containsi]=query`

## Deployment

- **Live Site:** [URL to be added after deployment]
- **Backend API:** Connected to Strapi CMS

## Development Notes

### Backend Setup Required
Make sure the Strapi backend is running before starting the frontend:

```bash
# In the backend directory
cd ../movie-reviews-cms
npm run develop
```

The backend should be accessible at `http://localhost:1337`

### Content Type Structure
The Strapi backend should have a `movie-review` content type with:
- title (Text)
- synopsis (Text)
- review (Rich Text)
- rating (Number)
- releaseYear (Number)
- genre (Text)
- director (Text)
- poster (Media)

## Screenshots

*Add screenshots here after deployment*

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of the Interactive Media Design course at Algonquin College.

---

**Backend Repository:** https://github.com/tama0046/movie-reviews-cms

**Made with ❤️ by the Movie Reviews Team** 