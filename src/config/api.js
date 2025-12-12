// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

export const api = {
  baseURL: API_BASE_URL,
  strapiURL: STRAPI_URL,
  
  // Helper function to get full image URL
  getImageURL: (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    return `${STRAPI_URL}${imageUrl}`
  },
  
  // API endpoints
  endpoints: {
    movies: `${API_BASE_URL}/api/movie-reviews`,
    upload: `${API_BASE_URL}/api/upload`
  }
}

// Fetch wrapper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export default api
