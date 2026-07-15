<template>
  <NavBar />

  <!-- Hero Section -->

  <section class="contact-hero">
    <div class="hero-content">
      <h1>Contact Us</h1>

      <p>
        We'd love to hear from you. Whether it's a custom cake, wedding cake, birthday cake or
        simply a question, we're here to help.
      </p>
    </div>
  </section>

  <!-- Contact Information -->

  <section class="contact-info">
    <div class="left">
      <h4>Get In Touch</h4>

      <h2>Visit Our Bakery</h2>

      <p>
        We bake every cake with love and premium ingredients. Contact us for birthdays, weddings,
        anniversaries, baby showers and every special celebration.
      </p>

      <div class="info">
        <div class="info-item">
          <div class="icon">📍</div>

          <div>
            <h3>Address</h3>
            <p>Winnipeg, Manitoba, Canada</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">📞</div>

          <div>
            <h3>Phone</h3>
            <p>+1 (204) XXX-XXXX</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">✉️</div>

          <div>
            <h3>Email</h3>
            <p>hello@thecakestudio.ca</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">🕒</div>

          <div>
            <h3>Opening Hours</h3>
            <p>Mon - Sat : 9:00 AM - 8:00 PM</p>
            <p>Sunday : 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->

    <div class="right">
      <div class="contact-card">
        <h2>Send us a Message</h2>

        <form @submit.prevent="submitForm">
          <input type="text" v-model="contact.name" placeholder="Full Name" required />

          <input type="email" v-model="contact.email" placeholder="Email" required />

          <input type="text" v-model="contact.phone" placeholder="Phone Number" />

          <input type="text" v-model="contact.subject" placeholder="Subject" />

          <textarea
            rows="6"
            v-model="contact.message"
            placeholder="Write your message..."
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Google Map -->

  <section class="map-section">
    <iframe
      src="https://www.google.com/maps?q=Winnipeg&output=embed"
      allowfullscreen=""
      loading="lazy"
    >
    </iframe>
  </section>

  <!-- FAQ -->

  <section class="faq">
    <h4>Frequently Asked Questions</h4>

    <h2>Need Help?</h2>

    <div class="faq-item" v-for="item in faqs" :key="item.question">
      <div class="question" @click="item.open = !item.open">
        <span>{{ item.question }}</span>

        <span>{{ item.open ? '-' : '+' }}</span>
      </div>

      <div v-if="item.open" class="answer">
        {{ item.answer }}
      </div>
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      contact: {
        name: '',

        email: '',

        phone: '',

        subject: '',

        message: '',
      },

      faqs: [
        {
          question: 'How many days before should I order?',

          answer: 'We recommend placing your order at least 2–3 days in advance.',

          open: false,
        },

        {
          question: 'Do you make custom cakes?',

          answer: 'Yes. We specialize in birthday, wedding and themed cakes.',

          open: false,
        },

        {
          question: 'Do you provide delivery?',

          answer: 'Yes. Delivery is available within Winnipeg.',

          open: false,
        },

        {
          question: 'Can I order online?',

          answer: 'Yes. You can place your order directly through our website.',

          open: false,
        },
      ],
    }
  },

  methods: {
    submitForm() {
      console.log(this.contact)

      alert('Message Sent Successfully!')
    },
  },
}
</script>

<style scoped>
.contact-hero {
  position: relative;
  background: #5ed3d1;
  color: white;
  padding: 130px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  inset: 0;

  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 0px,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 1px,
    transparent 120px
  );

  z-index: 0;
}

.contact-hero::after {
  content: '';

  position: absolute;

  left: 0;
  bottom: -1px;

  width: 100%;
  height: 22px;

  background:
    radial-gradient(
      circle at 20px 0,
      transparent 20px,
      white 21px
    );
  background-size: 40px 22px;
  background-repeat: repeat-x;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.contact-hero h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

.contact-hero p {
  max-width: 700px;

  margin: auto;

  font-size: 1.2rem;

  line-height: 1.8;
}

.contact-info {
  width: 90%;

  max-width: 1400px;

  margin: 90px auto;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 80px;
}

.left h4 {
  color: #5ed3d1;
}

.left h2 {
  color: #564743;

  margin: 15px 0;

  font-size: 3rem;
}

.left p {
  color: #666;

  line-height: 1.8;
}

.info {
  margin-top: 50px;
}

.info-item {
  display: flex;

  align-items: flex-start;

  gap: 25px;

  margin-bottom: 35px;
}

.icon {
  width: 70px;

  height: 70px;

  border-radius: 50%;

  background: #fff7e4;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 2rem;
}

.contact-card {
  background: #fff8e8;

  padding: 40px;

  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.contact-card h2 {
  margin-bottom: 30px;

  color: #564743;
}

form {
  display: flex;

  flex-direction: column;

  gap: 20px;
}

input,
textarea {
  padding: 18px;

  border: none;

  border-radius: 12px;

  background: white;

  font-size: 1rem;
}

textarea {
  resize: none;
}

button {
  background: #ffc43d;

  color: white;

  border: none;

  padding: 18px;

  border-radius: 40px;

  cursor: pointer;

  font-size: 1rem;

  font-weight: 600;

  transition: 0.3s;
}

button:hover {
  background: #5ed3d1;
}

.map-section {
  width: 90%;

  max-width: 1400px;

  margin: 80px auto;
}

iframe {
  width: 100%;

  height: 450px;

  border: none;

  border-radius: 20px;
}

.faq {
  width: 90%;

  max-width: 1100px;

  margin: 100px auto;
}

.faq h4 {
  color: #5ed3d1;

  text-align: center;
}

.faq h2 {
  text-align: center;

  color: #564743;

  font-size: 3rem;

  margin: 20px 0 50px;
}

.faq-item {
  background: #fff8e8;

  border-radius: 15px;

  margin-bottom: 20px;

  overflow: hidden;
}

.question {
  padding: 22px;

  display: flex;

  justify-content: space-between;

  cursor: pointer;

  font-weight: 600;
}

.answer {
  padding: 0 22px 22px;

  color: #666;

  line-height: 1.8;
}

@media (max-width: 900px) {
  .contact-info {
    grid-template-columns: 1fr;
  }

  .contact-hero h1 {
    font-size: 3rem;
  }
}
</style>
