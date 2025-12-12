const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

// ALWAYS use static data on GitHub Pages - no backend needed!
const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io')

export const movieService = {
  // Get all movies with optional search
  async getMovies(search = '') {
    try {
      // On GitHub Pages, ALWAYS use static JSON file
      if (isGitHubPages) {
        console.log('Using static data from GitHub Pages')
        const response = await fetch('/movie-reviews-frontend/data/movies.json')
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json()
        let movies = data.data
        
        // Filter by search if provided
        // Support both Strapi v4 (attributes) and v5 (direct properties) formats
        if (search) {
          movies = movies.filter(movie => {
            const title = movie.title || movie.attributes?.title || ''
            return title.toLowerCase().includes(search.toLowerCase())
          })
        }
        return movies
      }
      
      // Development mode - use Strapi API
      let url = `${API_URL}/api/movie-reviews?populate=*`
      
      if (search) {
        url += `&filters[title][$containsi]=${search}`
      }
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  },

  // Get a single movie by ID
  async getMovieById(id) {
    try {
      // On GitHub Pages, ALWAYS use static JSON file
      if (isGitHubPages) {
        console.log('Getting movie by ID from static data')
        const response = await fetch('/movie-reviews-frontend/data/movies.json')
        if (!response.ok) {
          throw new Error('Failed to fetch movie')
        }
        const data = await response.json()
        return data.data.find(movie => movie.id === parseInt(id))
      }
      
      // Development mode - use Strapi API
      const response = await fetch(`${API_URL}/api/movie-reviews/${id}?populate=*`)
      if (!response.ok) {
        throw new Error('Failed to fetch movie')
      }
      
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error fetching movie:', error)
      throw error
    }
  },

  // Helper to get image URL (supports Strapi v4 and v5 formats)
  getImageUrl(image) {
    if (!image) return null
    
    // Handle different image object structures
    let url = null
    
    // Strapi v5 format: direct url property
    if (image.url) {
      url = image.url
    }
    // Strapi v4 format: nested under data.attributes
    else if (image.data && image.data.attributes) {
      url = image.data.attributes.url
    }
    // Alternative v4 format: nested under attributes
    else if (image.attributes) {
      url = image.attributes.url
    }
    
    if (!url) return null
    
    // On GitHub Pages, serve images from /movie-reviews-frontend/uploads/
    if (isGitHubPages) {
      // Convert /uploads/image.webp to /movie-reviews-frontend/uploads/image.webp
      if (url.startsWith('/uploads/')) {
        return `/movie-reviews-frontend${url}`
      }
      return url
    }
    
    // Development mode - use API URL for relative paths
    if (url.startsWith('/')) {
      return `${API_URL}${url}`
    }
    
    return url
  }
}
