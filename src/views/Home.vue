<script setup>
import { ref, onMounted, computed } from 'vue'
import { movieService } from '../services/api'
import MovieCard from '../components/MovieCard.vue'

const movies = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const fetchMovies = async () => {
  try {
    loading.value = true
    error.value = null
    movies.value = await movieService.getMovies()
  } catch (err) {
    error.value = 'Failed to load movies. Please make sure the backend is running.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const filteredMovies = computed(() => {
  if (!searchQuery.value) {
    return movies.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return movies.value.filter(movie => {
    const title = movie.title?.toLowerCase() || ''
    const reviewText = movie.review?.[0]?.children?.[0]?.text?.toLowerCase() || ''
    return title.includes(query) || reviewText.includes(query)
  })
})

const clearSearch = () => {
  searchQuery.value = ''
}

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="container text-center">
          <h1 class="display-2 fw-bold mb-3 netflix-title">
            Unlimited movies, reviews, and more
          </h1>
          <p class="lead mb-4 netflix-subtitle mx-auto">
            Watch anywhere. Discover great movies with honest reviews.
          </p>
          
          <!-- Search Bar -->
          <div class="search-container mx-auto">
            <div class="input-group">
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Search for a movie..."
                @keyup.enter="fetchMovies"
              >
              <button 
                v-if="searchQuery"
                class="btn btn-outline-light" 
                type="button"
                @click="clearSearch"
              >
                <i class="bi bi-x-lg"></i>
              </button>
              <button class="btn btn-primary btn-lg" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mb-5 pt-4">
      <!-- Loading State -->
      <div v-if="loading" class="loading-spinner">
        <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger bg-dark border-danger text-white" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ error }}
        <button @click="fetchMovies" class="btn btn-sm btn-danger ms-3">
          <i class="bi bi-arrow-clockwise"></i> Retry
        </button>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredMovies.length === 0" class="text-center py-5 empty-state">
        <i class="bi bi-search display-1 text-danger"></i>
        <h3 class="mt-4 mb-2 text-white">No movies found</h3>
        <p class="text-muted mb-4">Try adjusting your search terms</p>
        <button @click="clearSearch" class="btn btn-primary">
          <i class="bi bi-arrow-clockwise me-2"></i>Clear Search
        </button>
      </div>

      <!-- Movies Grid -->
      <div v-else>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
          <h2 class="mb-0 section-title">
            {{ searchQuery ? 'Search Results' : 'Popular Movies' }}
          </h2>
          <span class="badge bg-danger px-3 py-2 rounded-pill">
            {{ filteredMovies.length }} {{ filteredMovies.length === 1 ? 'movie' : 'movies' }}
          </span>
        </div>

        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 g-md-4">
          <MovieCard 
            v-for="movie in filteredMovies" 
            :key="movie.id" 
            :movie="movie" 
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(234, 88, 118, 0.3), transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to bottom, transparent, #0f0c29);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.netflix-title {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  line-height: 1.1;
}

.netflix-subtitle {
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  max-width: 700px;
  font-size: 1.3rem;
}

.search-container {
  max-width: 600px;
}

.search-container .form-control {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #1a1a1a;
  font-weight: 500;
}

.search-container .form-control::placeholder {
  color: #666;
  opacity: 1;
}

.search-container .form-control:focus {
  background: white;
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  color: #1a1a1a;
}

.empty-state {
  background: var(--netflix-dark-gray);
  border-radius: 8px;
  padding: 4rem 2rem;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 60vh;
  }
  
  .netflix-title {
    font-size: 2rem !important;
  }
  
  .netflix-subtitle {
    font-size: 1rem !important;
  }
  
  .row {
    row-gap: 1rem !important;
  }
}
</style>