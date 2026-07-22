<template>
  <NavBar />

  <section class="profile-page">
    <!-- Page Header -->

    <div class="page-header">
      <h1>My Profile</h1>

      <p>Manage your personal information and shipping details.</p>
    </div>

    <div class="profile-container">
      <!-- Left Panel -->

      <div class="profile-summary">
        <div class="avatar">
          {{ profile.firstName?.charAt(0).toUpperCase() }}
        </div>

        <h2>
          {{ profile.firstName }}
          {{ profile.lastName }}
        </h2>

        <p class="email">
          {{ profile.email }}
        </p>

        <div class="profile-divider"></div>

        <div class="profile-stats">
          <div class="stat">
            <i class="fa-solid fa-user"></i>

            <span>Account</span>

            <strong>Active</strong>
          </div>

          <div class="stat">
            <i class="fa-solid fa-location-dot"></i>

            <span>Address</span>

            <strong>
              {{ profile.street ? 'Saved' : 'Not Added' }}
            </strong>
          </div>
        </div>
      </div>

      <!-- Right Panel -->

      <div class="profile-details">
        <div class="section-title">
          <h2>Contact & Shipping Information</h2>

          <p>Keep your delivery information up to date for faster checkout.</p>
        </div>

        <div class="form-group">
          <label> Phone Number </label>

          <input type="text" v-model="profile.phone" placeholder="Enter your phone number" />
        </div>

        <div class="form-group">
          <label> Street Address </label>

          <input type="text" v-model="profile.street" placeholder="Street Address" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label> City </label>

            <input type="text" v-model="profile.city" placeholder="City" />
          </div>

          <div class="form-group">
            <label> Province </label>

            <input type="text" v-model="profile.province" placeholder="Province" />
          </div>
        </div>

        <div class="form-group">
          <label> Postal Code </label>

          <input type="text" v-model="profile.postalCode" placeholder="Postal Code" />
        </div>

        <button class="save-btn" @click="saveProfile">
          <i class="fa-solid fa-floppy-disk"></i>

          Update Profile
        </button>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { getProfile, updateProfile } from '@/services/profileService'

export default {
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      loading: true,

      saving: false,

      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
      },
    }
  },

  async mounted() {
    await this.loadProfile()
  },

  methods: {
    async loadProfile() {
      try {
        this.loading = true

        this.profile = await getProfile()
      } catch (err) {
        console.error(err)

        alert('Unable to load profile.')
      } finally {
        this.loading = false
      }
    },

    async saveProfile() {
      try {
        this.saving = true

        this.profile = await updateProfile(this.profile)

        alert('Profile updated successfully.')
      } catch (err) {
        console.error(err)

        alert('Unable to update profile.')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
/* ===========================
   Page
=========================== */

.profile-page {
  background: var(--background);
  min-height: 100vh;
  padding: 80px 0;
}

/* ===========================
   Page Header
=========================== */

.page-header {
  width: min(1200px, 92%);
  margin: 0 auto 45px;
}

.page-header h1 {
  margin: 0;

  font-size: 2.8rem;
  color: var(--primary);
}

.page-header p {
  margin-top: 12px;

  color: var(--text-light);

  font-size: 1.05rem;
}

/* ===========================
   Container
=========================== */

.profile-container {
  width: min(1200px, 92%);
  margin: auto;

  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 35px;

  align-items: start;
}

/* ===========================
   Cards
=========================== */

.profile-summary,
.profile-details {
  background: white;

  border-radius: 26px;

  padding: 40px;

  box-shadow: 0 18px 45px rgba(23, 20, 20, 0.06);
}

/* ===========================
   Left Panel
=========================== */

.profile-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Avatar */

.avatar {
  width: 140px;
  height: 140px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, var(--secondary), #f0c27b);

  color: white;

  font-size: 3.5rem;
  font-weight: bold;

  box-shadow: 0 18px 35px rgba(209, 170, 103, 0.3);

  margin-bottom: 25px;
}

.profile-summary h2 {
  margin: 0;

  text-align: center;

  color: var(--primary);

  font-size: 2rem;

  line-height: 1.3;
}

.email {
  margin-top: 15px;

  color: var(--text-light);

  text-align: center;

  word-break: break-word;
}

/* Divider */

.profile-divider {
  width: 100%;
  height: 1px;

  background: #efefef;

  margin: 35px 0;
}

/* Stats */

.profile-stats {
  width: 100%;

  display: flex;

  justify-content: space-around;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
}

.stat i {
  color: var(--secondary);

  font-size: 22px;
}

.stat span {
  color: var(--text-light);

  font-size: 0.85rem;
}

.stat strong {
  color: var(--primary);

  font-size: 0.95rem;
}

/* ===========================
   Right Panel
=========================== */

.section-title {
  margin-bottom: 35px;
}

.section-title h2 {
  margin: 0;

  color: var(--primary);

  font-size: 2rem;
}

.section-title p {
  margin-top: 10px;

  color: var(--text-light);
}

/* ===========================
   Form
=========================== */

.form-group {
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;
}

.form-group label {
  margin-bottom: 8px;

  color: var(--primary);

  font-weight: 600;
}

.form-group input {
  height: 56px;

  padding: 0 18px;

  border-radius: 14px;

  border: 1px solid #e6e6e6;

  transition: 0.3s;

  font-size: 15px;

  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;

  border-color: var(--secondary);

  box-shadow: 0 0 0 4px rgba(209, 170, 103, 0.15);
}

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;
}

/* ===========================
   Save Button
=========================== */

.save-btn {
  width: 100%;
  height: 56px;

  border: none;

  border-radius: 999px;

  background: var(--secondary);

  color: white;

  font-size: 15px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  transition: all 0.3s ease;
}

.save-btn:hover {
  background: var(--secondary-hover);

  transform: translateY(-2px);

  box-shadow: 0 12px 24px rgba(209, 170, 103, 0.25);
}

.save-btn:active {
  transform: scale(0.98);
}

/* ===========================
   Responsive
=========================== */

@media (max-width: 900px) {
  .profile-container {
    grid-template-columns: 1fr;
  }

  .profile-summary,
  .profile-details {
    padding: 30px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .avatar {
    width: 120px;
    height: 120px;

    font-size: 3rem;
  }

  .profile-summary h2 {
    font-size: 1.7rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .section-title h2 {
    font-size: 1.7rem;
  }
}

@media (max-width: 500px) {
  .profile-stats {
    flex-direction: column;
    gap: 25px;
  }
}
</style>
