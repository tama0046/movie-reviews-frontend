<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { movieService } from '../services/api'

const route = useRoute()
const router = useRouter()

const movie = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchMovie = async () => {
  try {
    loading.value = true
    error.value = null
    movie.value = await movieService.getMovieById(route.params.id)
  } catch (err) {
    error.value = 'Failed to load movie details. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const getImageUrl = (image) => {
  return movieService.getImageUrl(image) || 'https://via.placeholder.com/400x600?text=No+Image'
}

const getRatingColor = computed(() => {
  if (!movie.value) return 'secondary'
  const rating = movie.value.rating
  if (rating >= 8) return 'success'
  if (rating >= 6) return 'warning'
  return 'danger'
})

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchMovie()
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container my-5">
      <div class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ error }}
        <button @click="fetchMovie" class="btn btn-sm btn-danger ms-3">
          <i class="bi bi-arrow-clockwise"></i> Retry
        </button>
      </div>
    </div>

    <!-- Movie Detail -->
    <div v-else-if="movie" class="movie-detail">
      <!-- Hero Section with Clean Gradient -->
      <div class="movie-hero">
        <div class="hero-overlay">
          <div class="container">
            <button @click="goBack" class="btn btn-light mb-4">
              <i class="bi bi-arrow-left me-2"></i>
              Back to Movies
            </button>
          </div>
        </div>
      </div>

      <!-- Movie Content -->
      <div class="container my-5">
        <div class="row">
          <!-- Movie Poster -->
          <div class="col-lg-4 mb-4">
            <div class="poster-container">
              <img 
                :src="getImageUrl(movie.poster)" 
                :alt="movie.title"
                class="img-fluid rounded shadow-lg"
                @error="$event.target.src='https://via.placeholder.com/400x600?text=No+Image'"
              >
            </div>
          </div>

          <!-- Movie Information -->
          <div class="col-lg-8">
            <div class="movie-info-card">
              <h1 class="display-5 fw-bold mb-3">{{ movie.title }}</h1>
              
              <!-- Meta Information -->
              <div class="d-flex flex-wrap gap-3 mb-4">
                <span class="badge bg-primary fs-6 px-3 py-2">
                  <i class="bi bi-calendar-event me-1"></i>
                  {{ movie.year }}
                </span>
                <span :class="`badge bg-${getRatingColor} fs-6 px-3 py-2`">
                  <i class="bi bi-star-fill me-1"></i>
                  {{ movie.rating }}/10
                </span>
              </div>

              <!-- Review -->
              <div class="mb-4">
                <h3 class="mb-3">
                  <i class="bi bi-chat-quote me-2"></i>
                  Our Review
                </h3>
                <div class="review-text">
                  <template v-if="Array.isArray(movie.review)">
                    <div v-for="(paragraph, index) in movie.review" :key="index">
                      <p v-if="paragraph.children" v-for="(child, childIndex) in paragraph.children" :key="childIndex">
                        {{ child.text }}
                      </p>
                      <p v-else>{{ paragraph }}</p>
                    </div>
                  </template>
                  <template v-else-if="typeof movie.review === 'string'">
                    <p>{{ movie.review }}</p>
                  </template>
                  <template v-else>
                    <p class="text-muted">No review available</p>
                  </template>
                </div>
              </div>

              <!-- Rating Breakdown -->
              <div class="rating-section p-4 rounded">
                <h5 class="mb-3">
                  <i class="bi bi-bar-chart me-2"></i>
                  Rating Breakdown
                </h5>
                <div class="d-flex align-items-center">
                  <span class="display-3 fw-bold me-4" :class="`text-${getRatingColor}`">
                    {{ movie.rating }}
                  </span>
                  <div class="flex-grow-1">
                    <div class="progress" style="height: 35px; border-radius: 10px;">
                      <div 
                        class="progress-bar" 
                        :class="`bg-${getRatingColor}`"
                        role="progressbar" 
                        :style="{ width: `${movie.rating * 10}%` }"
                        :aria-valuenow="movie.rating * 10"
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        <strong>{{ movie.rating * 10 }}%</strong>
                      </div>
                    </div>
                    <p class="mb-0 mt-2 text-muted small">
                      <i class="bi bi-info-circle me-1"></i>
                      Out of 10 possible points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-hero {
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
}

.movie-hero::before {
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

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 2rem;
  z-index: 1;
}

.poster-container {
  position: sticky;
  top: 20px;
}

.poster-container img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
}

.movie-info-card {
  background: white !important;
  color: #1a1a1a !important;
  border-radius: 12px;
  padding: 2.5rem !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
}

.movie-info-card h1,
.movie-info-card h3,
.movie-info-card h5 {
  color: #1a1a1a !important;
}

.review-text {
  line-height: 1.9;
  font-size: 1.1rem;
  color: #333 !important;
}

.review-text p {
  color: #333 !important;
  margin-bottom: 1.25rem;
  text-align: left;
}

.rating-section {
  border-left: 4px solid #e50914;
  background: #f8f9fa !important;
}

@media (max-width: 991px) {
  .poster-container {
    position: relative;
    top: 0;
  }
  
  .movie-hero {
    height: 300px;
  }
}
</style>
