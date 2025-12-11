<script setup>
import { defineProps } from 'vue'
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
.overflow-hidden {
  overflow: hidden;
}
</style>
