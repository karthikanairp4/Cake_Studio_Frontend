<template>
  <NavBar />

  <!-- Hero Section -->

  <section class="page-header">
    <div class="header-content">
      <p class="page-subtitle">GET IN TOUCH</p>

      <h1>Contact Us</h1>

      <p class="page-description">
        We'd love to hear from you. Whether you're planning a birthday, wedding, anniversary or a
        custom celebration cake, our team is here to help make your special day even sweeter.
      </p>
    </div>
  </section>

  <!-- Contact Information -->

  <section class="contact-section">
    <!-- Contact Information -->

    <div class="contact-card">
      <p class="card-subtitle">OUR BAKERY</p>

      <h2>Let's Create Something Sweet Together</h2>

      <p class="card-description">
        Have questions about our cakes or need a custom design? We'd be happy to help.
      </p>

      <div class="info-list">
        <div class="info-item">
          <div class="icon">
            <i class="bi bi-geo-alt"></i>
          </div>

          <div>
            <h4>Address</h4>
            <p>Winnipeg, Manitoba, Canada</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">
            <i class="bi bi-telephone"></i>
          </div>

          <div>
            <h4>Phone</h4>
            <p>+1 (204) XXX-XXXX</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">
            <i class="bi bi-envelope"></i>
          </div>

          <div>
            <h4>Email</h4>
            <p>hello@paprikabakes.ca</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">
            <i class="bi bi-clock"></i>
          </div>

          <div>
            <h4>Hours</h4>
            <p>Mon - Sat : 9 AM - 8 PM</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->

    <div class="contact-card">
      <h2>Send Us a Message</h2>

      <form @submit.prevent="submitForm">
        <input v-model="contact.name" placeholder="Full Name" />

        <input v-model="contact.email" placeholder="Email Address" />

        <input v-model="contact.phone" placeholder="Phone Number" />

        <input v-model="contact.subject" placeholder="Subject" />

        <textarea
          rows="6"
          v-model="contact.message"
          placeholder="Tell us about your cake..."
        ></textarea>

        <button>Send Message</button>
      </form>
    </div>
  </section>

  <!-- Google Map -->

  <section class="map-section">
    <div class="section-heading">
      <p class="section-subtitle">FIND US</p>

      <h2>Visit Our Bakery</h2>

      <p>
        Stop by our bakery to discuss your custom cake ideas or pick up your freshly baked order.
      </p>
    </div>

    <div class="map-card">
      <iframe
        src="https://www.google.com/maps?q=Winnipeg&output=embed"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
  </section>

  <!-- FAQ -->

<section class="faq-section">

    <div class="section-heading">

        <p class="section-subtitle">
            FREQUENTLY ASKED QUESTIONS
        </p>

        <h2>
            Need Help?
        </h2>

        <p>
            Here are some of the questions we receive most often.
        </p>

    </div>

    <div
        class="faq-item"
        v-for="item in faqs"
        :key="item.question"
    >

        <div
            class="faq-question"
            @click="item.open=!item.open"
        >

            <span>{{ item.question }}</span>

            <i
              class="bi"
              :class="item.open ? 'bi-dash-lg' : 'bi-plus-lg'"
            ></i>

        </div>

        <transition name="faq">

            <div
                v-if="item.open"
                class="faq-answer"
            >
                {{ item.answer }}
            </div>

        </transition>

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
/* ===========================
      PAGE HEADER
=========================== */

.page-header {
  width: min(92%, 1400px);
  margin: 70px auto;
}

.header-content {
  max-width: 760px;
  margin: auto;
  text-align: center;
}

.page-subtitle {
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 18px;
  margin-top: 110px;
}

.page-header h1 {
  color: var(--primary);
  font-size: clamp(3rem, 5vw, 4.8rem);
  margin-bottom: 22px;
}

.page-description {
  color: var(--text-light);
  line-height: 1.9;
  font-size: 1.1rem;
}

/* ===========================
      CONTACT SECTION
=========================== */

.contact-section {
  width: min(92%, 1400px);

  margin: 100px auto;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 45px;
}

.contact-card {
  background: white;

  border-radius: 28px;

  padding: 45px;

  box-shadow: 0 15px 35px rgba(23, 20, 20, 0.08);
}

.card-subtitle {
  color: var(--secondary);

  text-transform: uppercase;

  letter-spacing: 2px;

  font-size: 0.9rem;

  font-weight: 700;
}

.contact-card h2 {
  color: var(--primary);

  font-size: 2.3rem;

  margin: 18px 0;
}

.card-description {
  color: var(--text-light);

  line-height: 1.8;
}

.info-list {
  margin-top: 35px;
}

.info-item {
  display: flex;

  gap: 18px;

  margin-bottom: 30px;
}

.icon {
  width: 58px;

  height: 58px;

  border-radius: 50%;

  background: #f8f5f1;

  color: var(--secondary);

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 1.3rem;
}

.info-item h4 {
  color: var(--primary);

  margin-bottom: 6px;
}

.info-item p {
  color: var(--text-light);
}

form {
  display: flex;

  flex-direction: column;

  gap: 18px;
}

input,
textarea {
  padding: 18px 20px;

  border: 1px solid rgba(0, 0, 0, 0.08);

  border-radius: 14px;

  background: #faf7f4;

  font-size: 1rem;

  outline: none;
}

textarea {
  resize: none;
}

button {
  background: var(--primary);

  color: white;

  border: none;

  padding: 16px;

  border-radius: 40px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

button:hover {
  background: var(--secondary);
}

/* ===========================
        MAP
=========================== */

.map-section{

    width:min(92%,1400px);

    margin:120px auto;

}

.section-heading{

    max-width:700px;

    margin:0 auto 60px;

    text-align:center;

}

.section-subtitle{

    color:var(--secondary);

    text-transform:uppercase;

    letter-spacing:3px;

    font-size:.95rem;

    font-weight:700;

    margin-bottom:18px;

}

.section-heading h2{

    color:var(--primary);

    font-size:clamp(2.5rem,4vw,3.8rem);

    margin-bottom:18px;

}

.section-heading p{

    color:var(--text-light);

    line-height:1.8;

}

.map-card{

    overflow:hidden;

    border-radius:28px;

    box-shadow:0 20px 45px rgba(23,20,20,.10);

}

.map-card iframe{

    width:100%;

    height:520px;

    border:none;

}

/* ===========================
        FAQ
=========================== */

.faq-section{

    width:min(92%,900px);

    margin:120px auto;

}

.faq-item{

    background:white;

    border-radius:20px;

    margin-bottom:20px;

    box-shadow:0 10px 30px rgba(23,20,20,.08);

    overflow:hidden;

}

.faq-question{

    padding:24px 30px;

    display:flex;

    justify-content:space-between;

    align-items:center;

    cursor:pointer;

    font-weight:600;

    color:var(--primary);

}

.faq-question i{

    color:var(--secondary);

    font-size:1.1rem;

}

.faq-answer{

    padding:0 30px 25px;

    color:var(--text-light);

    line-height:1.8;

}

/* Animation */

.faq-enter-active,
.faq-leave-active{

    transition:all .3s ease;

}

.faq-enter-from,
.faq-leave-to{

    opacity:0;

    transform:translateY(-8px);

}

/* ===========================
        MOBILE
=========================== */

@media(max-width:992px){

.contact-section{

grid-template-columns:1fr;

}

.contact-card{

padding:35px;

}

}

@media(max-width:768px){

.page-header{

margin:50px auto;

}

.page-header h1{

font-size:2.8rem;

}

.contact-card h2{

font-size:2rem;

}

.map-card iframe{

height:380px;

}

.faq-question{

padding:20px;

}

.faq-answer{

padding:0 20px 20px;

}

}
</style>
