<template>
  <footer class="footer">
    <!-- Newsletter -->
    <section class="newsletter">
      <div class="newsletter-content">
        <div class="newsletter-title">
          <h2>Subscribe</h2>
          <p>Get updates about new cakes, seasonal offers and exclusive discounts.</p>
        </div>

        <div class="newsletter-form">
          <input type="email" placeholder="Enter your email address" />

          <button>Subscribe</button>
        </div>
      </div>
    </section>

    <!-- Main Footer -->

    <div class="footer-container">
      <!-- Logo -->

      <div class="footer-logo">
        <h2>The Cake Studio</h2>

        <p>Freshly baked happiness made with love.</p>
      </div>

      <!-- Links -->

      <div class="footer-links">
        <router-link to="/"> Home </router-link>

        <router-link to="/cakes"> Cakes </router-link>

        <router-link to="/make-cake"> Make Your Own Cake </router-link>

        <router-link to="/theme-cakes"> Themed Cakes </router-link>

        <router-link to="/contact"> Contact </router-link>
      </div>

      <!-- Social -->

      <div class="footer-social">
        <a href="#"> Facebook </a>

        <a href="#"> Instagram </a>

        <a href="#"> YouTube </a>
      </div>
    </div>

    <hr />

    <div class="copyright">© {{ currentYear }} The Cake Studio. All Rights Reserved.</div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
.footer {
  margin-top: 120px;

  background: white;
}

/* ==========================
      NEWSLETTER
========================== */

.newsletter {
  width: 90%;

  max-width: 1450px;

  margin: auto;

  transform: translateY(-60px);
}

.newsletter-content {
  background: #5ed3d1;

  border-radius: 25px;

  padding: 55px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 40px;
}

.newsletter-title h2 {
  color: white;

  font-size: 4rem;

  margin-bottom: 15px;
}

.newsletter-title p {
  color: white;

  font-size: 1.15rem;
}

.newsletter-form {
  flex: 1;

  display: flex;

  background: white;

  border-radius: 50px;

  overflow: hidden;

  max-width: 700px;
}

.newsletter-form input {
  flex: 1;

  border: none;

  padding: 22px 30px;

  font-size: 1.1rem;

  outline: none;
}

.newsletter-form button {
  background: #ffc43d;

  color: white;

  border: none;

  padding: 0 45px;

  font-size: 1.1rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.newsletter-form button:hover {
  background: #ffb300;
}

/* ==========================
      FOOTER
========================== */

.footer-container {
  width: 90%;

  max-width: 1450px;

  margin: auto;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-bottom: 40px;
}

.footer-logo h2 {
  color: #ffc43d;

  font-size: 3rem;

  margin-bottom: 10px;
}

.footer-logo p {
  color: #666;
}

.footer-links {
  display: flex;

  gap: 35px;
}

.footer-links a {
  text-decoration: none;

  color: #564743;

  font-weight: 600;

  transition: 0.3s;
}

.footer-links a:hover {
  color: #5ed3d1;
}

.footer-social {
  display: flex;

  gap: 25px;
}

.footer-social a {
  text-decoration: none;

  color: #ffc43d;

  font-weight: 600;

  transition: 0.3s;
}

.footer-social a:hover {
  color: #5ed3d1;
}

hr {
  width: 90%;

  margin: auto;

  border: none;

  border-top: 2px solid #5ed3d1;
}

.copyright {
  text-align: center;

  padding: 35px;

  color: #666;
}

/* ==========================
      RESPONSIVE
========================== */

@media (max-width: 992px) {
  .newsletter-content {
    flex-direction: column;
  }

  .footer-container {
    flex-direction: column;

    gap: 35px;
  }

  .footer-links {
    flex-wrap: wrap;

    justify-content: center;
  }

  .newsletter-form {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .newsletter-title h2 {
    font-size: 2.8rem;
  }

  .newsletter-form {
    flex-direction: column;

    border-radius: 20px;
  }

  .newsletter-form button {
    padding: 18px;
  }
}
</style>
