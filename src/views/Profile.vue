<template>
  <NavBar />

  <section class="profile-page">
    <div class="profile-container">
      <!-- Left Panel -->
      <div class="profile-summary">
        <div class="avatar">
          {{ profile.firstName?.charAt(0).toUpperCase() }}
        </div>

        <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>

        <p class="email">
          {{ profile.email }}
        </p>
      </div>

      <!-- Right Panel -->
      <div class="profile-details">
        <h2>Contact & Shipping Information</h2>

        <div class="form-group">
          <label>Phone Number</label>
          <input type="text" v-model="profile.phone" placeholder="Phone Number" />
        </div>

        <div class="form-group">
          <label>Street Address</label>
          <input type="text" v-model="profile.street" placeholder="Street Address" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>City</label>
            <input type="text" v-model="profile.city" placeholder="City" />
          </div>

          <div class="form-group">
            <label>Province</label>
            <input type="text" v-model="profile.province" placeholder="Province" />
          </div>
        </div>

        <div class="form-group">
          <label>Postal Code</label>
          <input type="text" v-model="profile.postalCode" placeholder="Postal Code" />
        </div>

        <button class="save-btn" @click="saveProfile">Update Profile</button>
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
    this.profile = await getProfile()
  },

  methods: {
    async saveProfile() {
      try {
        this.profile = await updateProfile(this.profile)

        alert('Profile updated successfully.')
      } catch (err) {
        console.error(err)

        alert('Unable to update profile.')
      }
    },
  },
}
</script>

<style scoped>
.profile-page {
  background: #fff8e8;
  min-height: 90vh;
  padding: 50px 20px;
}

.profile-container {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 35px;
}

.profile-summary,
.profile-details {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.profile-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 140px;
  height: 140px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #ffd166, #ffb703);

  color: white;

  font-size: 3.6rem;
  font-weight: bold;

  margin-bottom: 25px;

  box-shadow: 0 12px 25px rgba(255, 196, 61, 0.35);
}

.profile-summary h2 {
  margin: 0;
  color: #564743;
  font-size: 2rem;
  text-align: center;
  line-height: 1.3;
}

.email {
  margin-top: 15px;

  color: #777;

  text-align: center;

  font-size: 0.95rem;

  overflow-wrap: anywhere;
}

.profile-details h2 {
  margin-bottom: 35px;

  color: #564743;

  font-size: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;
}

.form-group label {
  margin-bottom: 8px;

  color: #564743;

  font-weight: 600;
}

.form-group input {
  padding: 15px;

  border: 1px solid #ddd;

  border-radius: 12px;

  font-size: 1rem;

  transition: 0.25s;
}

.form-group input:focus {
  outline: none;

  border-color: #ffc43d;

  box-shadow: 0 0 0 3px rgba(255, 196, 61, 0.15);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.save-btn {
  width: 100%;

  margin-top: 15px;

  padding: 16px;

  border: none;

  border-radius: 35px;

  background: linear-gradient(135deg, #ffd166, #ffb703);

  color: white;

  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;
}

.save-btn:hover {
  transform: translateY(-2px);

  box-shadow: 0 10px 20px rgba(255, 183, 3, 0.3);
}

.save-btn:active {
  transform: scale(0.98);
}

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
}
</style>
