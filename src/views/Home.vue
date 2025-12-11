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
            <div class="input-group shadow-lg">
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Search movies by title or review..."
              >
              <button 
                v-if="searchQuery"
                class="btn btn-outline-danger" 
                type="button"
                @click="clearSearch"
              >
                <i class="bi bi-x-lg"></i>
              </button>
              <button class="btn btn-danger btn-lg" type="button">
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
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-white">Loading movies...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-5">
        <div class="alert alert-danger d-inline-block" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{ error }}
        </div>
        <div>
          <button @click="fetchMovies" class="btn btn-danger">
            <i class="bi bi-arrow-clockwise me-2"></i>Try Again
          </button>
        </div>
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
  min-height: 70vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 3rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-content {
  width: 100%;
}

.netflix-title {
  line-height: 1.2;
  color: white;
}

.netflix-subtitle {
  max-width: 700px;
  font-size: 1.2rem;
  color: #ccc;
}

.search-container {
  max-width: 600px;
}

.search-container .form-control {
  background: white;
  border: none;
  color: #1a1a1a;
  font-weight: 500;
  padding: 1rem 1.5rem;
}

.search-container .form-control::placeholder {
  color: #999;
}

.search-container .form-control:focus {
  background: white;
  border: none;
  box-shadow: none;
  color: #1a1a1a;
}

.btn-danger {
  background: #e50914;
  border: none;
  padding: 0.5rem 1.5rem;
}

.btn-danger:hover {
  background: #f40612;
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