<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', 'navbar-expand-lg', 'navbar-dark', { 'scrolled': scrolled }]">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold d-flex align-items-center">
        <span class="netflix-logo">MOVIE</span>
        <span class="reviews-text ms-1">REVIEWS</span>
      </RouterLink>
      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link nav-link-custom">
              <i class="bi bi-house-door-fill me-1"></i>
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <a href="https://github.com/tama0046/movie-reviews-frontend" target="_blank" class="nav-link nav-link-custom">
              <i class="bi bi-github me-1"></i>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  transition: all 0.3s ease;
  background: #0f0f0f !important;
  border-bottom: 1px solid #333;
}

.navbar.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.netflix-logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: #e50914;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.reviews-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.nav-link-custom {
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #e5e5e5;
}

.nav-link-custom:hover {
  background: rgba(229, 9, 20, 0.1);
  color: white !important;
}

.router-link-active.nav-link-custom {
  background: #e50914;
  color: white !important;
}

.navbar-toggler:focus {
  box-shadow: none;
}

@media (max-width: 991px) {
  .nav-link-custom {
    margin: 0.25rem 0;
  }
  
  .netflix-logo {
    font-size: 1.5rem;
  }
  
  .reviews-text {
    font-size: 1rem;
  }
}
</style>
