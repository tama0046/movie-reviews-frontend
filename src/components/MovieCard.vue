<script setup>
import { RouterLink } from 'vue-router'
import { movieService } from '../services/api'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const getImageUrl = (image) => {
  return movieService.getImageUrl(image) || 'https://via.placeholder.com/300x450?text=No+Image'
}

const getRatingColor = (rating) => {
  if (rating >= 8) return 'success'
  if (rating >= 6) return 'warning'
  return 'danger'
}
</script>

<template>
  <div class="col">
    <div class="card movie-card h-100">
      <div class="position-relative overflow-hidden">
        <img 
          :src="getImageUrl(movie.poster)" 
          :alt="movie.title"
          class="card-img-top movie-poster"
          @error="$event.target.src='https://via.placeholder.com/300x450?text=No+Image'"
        >
        <span :class="`badge rating-badge`">
          <i class="bi bi-star-fill me-1"></i>{{ movie.rating }}
        </span>
        <div class="card-img-overlay">
          <h5 class="text-white fw-bold mb-2">{{ movie.title }}</h5>
          <p class="text-white-50 small mb-2">
            <i class="bi bi-calendar-event me-1"></i>{{ movie.year }}
          </p>
          <p class="text-white small mb-3" style="line-height: 1.4;">
            {{ movie.review[0]?.children[0]?.text?.substring(0, 100) || 'No review available' }}...
          </p>
          <RouterLink 
            :to="`/movie/${movie.documentId}`" 
            class="btn btn-sm btn-primary"
            style="pointer-events: auto;"
          >
            <i class="bi bi-book me-1"></i>Read More
          </RouterLink>
        </div>
      </div>
      <div class="card-body">
        <h6 class="card-title mb-1">{{ movie.title }}</h6>
        <p class="card-text small mb-0">
          <i class="bi bi-calendar-event me-1"></i>{{ movie.year }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1e1e2e 0%, #1a1a2e 100%);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.movie-card:hover {
  transform: translateY(-5px);
  border-color: #e50914;
}

.movie-poster {
  aspect-ratio: 2/3;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-poster {
  opacity: 0.9;
}

.card-img-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

.movie-card:hover .card-img-overlay {
  opacity: 1;
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(229, 9, 20, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  z-index: 2;
}

.card-body {
  background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-title {
  color: white;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-text {
  color: #999;
}

.btn-primary {
  background: #e50914;
  border: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #c40812;
}
</style>
