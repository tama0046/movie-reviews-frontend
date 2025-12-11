<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="mt-auto">
    <div class="container py-5">
      <div class="row g-4 mb-4">
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-3 text-white">
            <span style="color: #e50914;">MOVIE</span> REVIEWS
          </h5>
          <p class="footer-text">Your ultimate source for honest movie reviews and ratings. Discover, explore, and enjoy cinema.</p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h6 class="fw-bold mb-3 text-white">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="/" class="footer-link">
                <i class="bi bi-house-door me-2"></i>Home
              </a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/tama0046/movie-reviews-frontend" target="_blank" class="footer-link">
                <i class="bi bi-github me-2"></i>Frontend Repo
              </a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/tama0046/movie-reviews-cms" target="_blank" class="footer-link">
                <i class="bi bi-server me-2"></i>Backend Repo
              </a>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-12">
          <h6 class="fw-bold mb-3 text-white">Development Team</h6>
          <div class="team-list">
            <div class="team-member mb-2">
              <i class="bi bi-award-fill text-danger me-2"></i>
              <span class="footer-text">Manoj Tamang </span>
              <a href="https://github.com/tama0046" target="_blank" class="team-link">@tama0046</a>
            </div>
            <div class="team-member mb-2">
              <i class="bi bi-person-circle text-danger me-2"></i>
              <span class="footer-text">Saskar Baniya </span>
              <a href="https://github.com/bani0029" target="_blank" class="team-link">@bani0029</a>
            </div>
            <div class="team-member mb-2">
              <i class="bi bi-person-circle text-danger me-2"></i>
              <span class="footer-text">Roland Park </span>
              <a href="https://github.com/park0625" target="_blank" class="team-link">@park0625</a>
            </div>
          </div>
        </div>
      </div>
      
      <hr style="border-color: #2f2f2f; margin: 2rem 0;">
      
      <div class="row">
        <div class="col-12 text-center">
          <p class="mb-2 footer-text small">
            <i class="bi bi-mortarboard me-2"></i>
            Interactive Media Design - Algonquin College
          </p>
          <p class="mb-0 footer-text small">
            &copy; {{ currentYear }} Movie Reviews. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-text {
  color: #808080;
  line-height: 1.6;
}

.footer-link {
  color: #808080;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #e50914;
  transform: translateX(5px);
}

.team-link {
  color: #e50914;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.team-link:hover {
  color: #f40612;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .team-member, .footer-text {
    font-size: 0.9rem;
  }
}
</style>
