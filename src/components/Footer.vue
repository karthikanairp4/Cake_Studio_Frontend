<template>
  <footer class="footer">
    <!-- Newsletter -->
    <section class="newsletter">
      <div class="newsletter-content">
        <div class="newsletter-title">
          <h2>Join Our Sweet Community</h2>

          <p>
            Receive exclusive offers, seasonal cake collections, and the latest handcrafted
            creations.
          </p>
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
        <h2>Paprika Bakes</h2>

        <p>
          Handcrafted cakes made with premium ingredients for birthdays, weddings, anniversaries and
          every special celebration.
        </p>
      </div>

      <!-- Navigation -->

      <div class="footer-links">
        <h3>Explore</h3>

        <router-link to="/"> Home </router-link>

        <router-link to="/classic-cakes"> Classic Cakes </router-link>

        <router-link to="/theme-cakes"> Themed Cakes </router-link>

        <router-link to="/contact-us"> Contact Us </router-link>
      </div>

      <!-- Social -->

      <div class="footer-social">
        <h3>Follow Us</h3>

        <a href="#">
          <i class="bi bi-facebook"></i>
          Facebook
        </a>

        <a href="#">
          <i class="bi bi-instagram"></i>
          Instagram
        </a>

        <a href="#">
          <i class="bi bi-pinterest"></i>
          Pinterest
        </a>
      </div>
    </div>

    <hr />

    <div class="copyright">© {{ currentYear }} Paprika Bakes. All Rights Reserved.</div>
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
  background: var(--background);
}

/* ==================================
      NEWSLETTER
================================== */

.newsletter {
  width: min(92%, 1400px);
  margin: auto;
  transform: translateY(-60px);
}

.newsletter-content {
  background: var(--primary);
  border-radius: 30px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
  box-shadow: 0 20px 45px rgba(23, 20, 20, 0.15);
}

.newsletter-title {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsletter-title h2 {
  color: white;
  font-size: clamp(2.8rem, 4vw, 4rem);
  margin-bottom: 18px;
  text-align: center;
}

.newsletter-title p {
  color: rgba(255, 255, 255, 0.85);
  /* text-align: center; */
  line-height: 1.8;

  max-width: 520px;
}

.newsletter-form {
  flex: 1;

  display: flex;

  background: white;

  border-radius: 50px;

  overflow: hidden;

  max-width: 600px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.newsletter-form input {
  flex: 1;

  border: none;

  outline: none;

  padding: 18px 28px;

  font-size: 1rem;
}

.newsletter-form button {
  border: none;

  padding: 0 38px;

  background: var(--secondary);

  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.newsletter-form button:hover {
  background: #8c6642;
}

.footer-container {
  width: min(92%, 1400px);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;
  align-items: start;
  padding-bottom: 25px;
}

.footer-links,
.footer-social {
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-self: center;
}

.footer-logo {
  justify-self: start;
}

.footer-logo h2,
.footer-logo p {
  text-align: left;
}

.footer-logo h2 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 18px;
  text-align: left;
}

.footer-logo p {
  color: var(--text-light);
  line-height: 1.9;
  max-width: 380px;
  text-align: left;
}

.footer-links h3,
.footer-social h3 {
  color: var(--primary);
  text-align: left;
  margin-bottom: 8px;
  font-size: 1.15rem;
}

.footer-links a,
.footer-social a {
  text-decoration: none;
  text-align: left;
  color: var(--text-light);
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-links a:hover,
.footer-social a:hover {
  color: var(--secondary);
}

.footer-social i {
  font-size: 1.1rem;
}

hr {
  width: min(92%, 1400px);
  margin: auto;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.copyright {
  text-align: center;
  padding: 28px;
  color: var(--text-light);
  font-size: 0.95rem;
}

@media (max-width: 992px) {
  .newsletter-content {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-title p {
    margin: auto;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;

    max-width: 100%;
  }

  .footer-container {
    grid-template-columns: 1fr;

    text-align: center;

    gap: 45px;
  }

  .footer-links,
  .footer-social {
    align-items: center;
  }
}

@media (max-width: 768px) {
  .newsletter {
    transform: none;

    margin-bottom: 50px;
  }

  .newsletter-content {
    padding: 35px 25px;
  }

  .newsletter-form {
    flex-direction: column;

    border-radius: 18px;
  }

  .newsletter-form input {
    padding: 18px;
  }

  .newsletter-form button {
    padding: 18px;
  }

  .footer {
    margin-top: 60px;
  }
}
</style>
