const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

export const movieService = {
  // Get all movies with optional search
  async getMovies(search = '') {
    try {
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

  // Helper to get image URL
  getImageUrl(image) {
    if (!image) return null
    
    // Handle direct image object (no .data wrapper)
    let url = null
    if (image.url) {
      url = image.url
    } else if (image.data && image.data.attributes) {
      url = image.data.attributes.url
    } else if (image.attributes) {
      url = image.attributes.url
    }
    
    if (!url) return null
    
    // If URL starts with '/', it's relative to the API
    if (url.startsWith('/')) {
      return `${API_URL}${url}`
    }
    
    return url
  }
}
