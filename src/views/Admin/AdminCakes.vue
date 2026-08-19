<template>
  <div class="admin-page">
    <AdminSidebar />
    <main class="admin-content">
      <div class="page-header">
        <div>
          <h1>
            {{ selectedSection === 'cakes' ? 'Cakes' : 'Cake Options' }}
          </h1>

          <p>
            {{
              selectedSection === 'cakes'
                ? 'Manage the cakes available in your store.'
                : 'Manage the options available for custom cakes.'
            }}
          </p>
        </div>
        <button v-if="selectedSection === 'cakes'" class="add-btn" @click="openAddCakeForm">
          <i class="bi bi-plus-lg"></i>
          Add Cake
        </button>
        <button v-if="selectedSection === 'options'" class="add-btn" @click="openAddOptionForm">
          <i class="bi bi-plus-lg"></i>
          Add Option
        </button>
      </div>

      <div class="section-selector">
        <label class="radio-option">
          <input type="radio" value="cakes" v-model="selectedSection" />
          <span>Cakes</span>
        </label>
        <label class="radio-option">
          <input type="radio" value="options" v-model="selectedSection" />
          <span>Cake Options</span>
        </label>
      </div>
      <div v-if="selectedSection === 'cakes'">
        <div v-if="loading" class="loading">Loading cakes...</div>

        <div v-else class="cakes-grid">
          <div v-for="cake in cakes" :key="cake.id" class="cake-card">
            <div class="cake-image">
              <img :src="getImageUrl(cake.imgUrl)" :alt="cake.name" />

              <span class="status-badge" :class="cake.active ? 'active' : 'inactive'">
                {{ cake.active ? 'Active' : 'Inactive' }}
              </span>
            </div>

            <div class="cake-info">
              <h3>
                {{ cake.name }}
              </h3>

              <p class="category">
                {{ cake.category }}
              </p>

              <p class="description">
                {{ cake.description }}
              </p>

              <div class="cake-bottom">
                <span class="price"> ${{ Number(cake.basePrice).toFixed(2) }} </span>

                <div class="actions">
                  <button class="edit-btn" @click="openEditCakeForm(cake)">
                    <i class="bi bi-pencil"></i>
                    Edit
                  </button>

                  <button
                    class="status-btn"
                    :class="cake.active ? 'deactivate' : 'activate'"
                    @click="toggleCakeStatus(cake)"
                  >
                    {{ cake.active ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedSection === 'options'" class="options-section">
        <div v-if="optionsLoading" class="loading">Loading cake options...</div>

        <div v-else>

          <div class="option-category">
            <div class="option-category-header">
              <div>
                <h2>Sponges</h2>
                <p>Manage sponge options for custom cakes.</p>
              </div>
            </div>

            <div v-if="getOptionsByType('SPONGE').length > 0" class="options-grid">
              <div
                v-for="option in getOptionsByType('SPONGE')"
                :key="option.id"
                class="option-card"
              >
                <div class="option-card-header">
                  <span class="status-badge" :class="option.active ? 'active' : 'inactive'">
                    {{ option.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>

                <div class="option-info">
                  <h3>
                    {{ option.name }}
                  </h3>

                  <div class="option-bottom">
                    <span class="price"> ${{ Number(option.price).toFixed(2) }} </span>

                    <div class="actions">
                      <button class="edit-btn" @click="openEditOptionForm(option)">
                        <i class="bi bi-pencil"></i>
                        Edit
                      </button>

                      <button
                        class="status-btn"
                        :class="option.active ? 'deactivate' : 'activate'"
                        @click="toggleOptionStatus(option)"
                      >
                        {{ option.active ? 'Deactivate' : 'Activate' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-options">No sponge options found.</div>
          </div>

          <div class="option-category">
            <div class="option-category-header">
              <div>
                <h2>Fillings</h2>
                <p>Manage filling options for custom cakes.</p>
              </div>
            </div>

            <div v-if="getOptionsByType('FILLING').length > 0" class="options-grid">
              <div
                v-for="option in getOptionsByType('FILLING')"
                :key="option.id"
                class="option-card"
              >
                <div class="option-card-header">
                  <span class="status-badge" :class="option.active ? 'active' : 'inactive'">
                    {{ option.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>

                <div class="option-info">
                  <h3>
                    {{ option.name }}
                  </h3>

                  <div class="option-bottom">
                    <span class="price"> ${{ Number(option.price).toFixed(2) }} </span>

                    <div class="actions">
                      <button class="edit-btn" @click="openEditOptionForm(option)">
                        <i class="bi bi-pencil"></i>
                        Edit
                      </button>

                      <button
                        class="status-btn"
                        :class="option.active ? 'deactivate' : 'activate'"
                        @click="toggleOptionStatus(option)"
                      >
                        {{ option.active ? 'Deactivate' : 'Activate' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-options">No filling options found.</div>
          </div>

          <div class="option-category">
            <div class="option-category-header">
              <div>
                <h2>Frostings</h2>
                <p>Manage frosting options for custom cakes.</p>
              </div>
            </div>

            <div v-if="getOptionsByType('FROSTING').length > 0" class="options-grid">
              <div
                v-for="option in getOptionsByType('FROSTING')"
                :key="option.id"
                class="option-card"
              >
                <div class="option-card-header">
                  <span class="status-badge" :class="option.active ? 'active' : 'inactive'">
                    {{ option.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>

                <div class="option-info">
                  <h3>
                    {{ option.name }}
                  </h3>

                  <div class="option-bottom">
                    <span class="price"> ${{ Number(option.price).toFixed(2) }} </span>

                    <div class="actions">
                      <button class="edit-btn" @click="openEditOptionForm(option)">
                        <i class="bi bi-pencil"></i>
                        Edit
                      </button>

                      <button
                        class="status-btn"
                        :class="option.active ? 'deactivate' : 'activate'"
                        @click="toggleOptionStatus(option)"
                      >
                        {{ option.active ? 'Deactivate' : 'Activate' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-options">No frosting options found.</div>
          </div>
        </div>
      </div>

      <div v-if="showCakeForm" class="modal-overlay" @click.self="closeCakeForm">
        <div class="cake-modal">
          <div class="modal-header">
            <h2>
              {{ editingCake ? 'Edit Cake' : 'Add Cake' }}
            </h2>

            <button class="close-btn" @click="closeCakeForm">&times;</button>
          </div>

          <form @submit.prevent="saveCake">
            <div class="form-group">
              <label>Cake Name</label>

              <input v-model="cakeForm.name" type="text" required />
            </div>

            <div class="form-group">
              <label>Description</label>

              <textarea v-model="cakeForm.description" rows="4" required></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Base Price</label>

                <input
                  v-model.number="cakeForm.basePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div class="form-group">
                <label>Category</label>

                <select v-model="cakeForm.category" required>
                  <option value="CLASSIC">Classic</option>

                  <option value="THEMED">Themed</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Image URL</label>

              <input
                v-model="cakeForm.imgUrl"
                type="text"
                placeholder="/images/cakes/cake.png"
                required
              />
            </div>

            <div class="modal-actions">
              <button type="button" class="cancel-btn" @click="closeCakeForm">Cancel</button>

              <button type="submit" class="save-btn" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Cake' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="showOptionForm" class="modal-overlay" @click.self="closeOptionForm">
        <div class="cake-modal">
          <div class="modal-header">
            <h2>
              {{ editingOption ? 'Edit Cake Option' : 'Add Cake Option' }}
            </h2>

            <button class="close-btn" @click="closeOptionForm">&times;</button>
          </div>

          <form @submit.prevent="saveOption">

            <div class="form-group">
              <label>Option Name</label>

              <input v-model="optionForm.name" type="text" required />
            </div>


            <div class="form-group">
              <label>Type</label>

              <select v-model="optionForm.type" required>
                <option value="SPONGE">Sponge</option>

                <option value="FILLING">Filling</option>

                <option value="FROSTING">Frosting</option>
              </select>
            </div>

            <!-- Price -->

            <div class="form-group">
              <label>Price</label>

              <input v-model.number="optionForm.price" type="number" step="0.01" min="0" required />
            </div>

            <!-- Image -->

            <div class="form-group">
              <label>Image URL</label>

              <input
                v-model="optionForm.img"
                type="text"
                placeholder="/images/options/sponges/vanilla.jpg"
                required
              />
            </div>

            <!-- Buttons -->

            <div class="modal-actions">
              <button type="button" class="cancel-btn" @click="closeOptionForm">Cancel</button>

              <button type="submit" class="save-btn" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Option' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'

import {
  getAdminCakes,
  addCake,
  updateCake,
  updateCakeStatus,
  getAdminCakeOptions,
  addCakeOption,
  updateCakeOption,
  updateCakeOptionStatus,
} from '@/services/Admin/adminCakeService'

export default {
  components: {
    AdminSidebar,
  },

  data() {
    return {
      /* ================================= */
      /* SECTION */
      /* ================================= */

      selectedSection: 'cakes',

      /* ================================= */
      /* CAKES */
      /* ================================= */

      cakes: [],

      loading: false,

      showCakeForm: false,

      editingCake: null,

      cakeForm: {
        name: '',

        description: '',

        basePrice: 0,

        category: 'CLASSIC',

        imgUrl: '',
      },

      /* ================================= */
      /* CAKE OPTIONS */
      /* ================================= */

      cakeOptions: [],

      optionsLoading: false,

      showOptionForm: false,

      editingOption: null,

      optionForm: {
        name: '',

        type: 'SPONGE',

        price: 0,

        img: '',
      },

      /* ================================= */
      /* COMMON */
      /* ================================= */

      saving: false,
    }
  },

  async mounted() {
    await this.loadCakes()
  },

  watch: {
    async selectedSection(newSection) {
      if (newSection === 'options') {
        await this.loadCakeOptions()
      }
    },
  },

  methods: {
    /* ================================= */
    /* LOAD CAKES */
    /* ================================= */

    async loadCakes() {
      try {
        this.loading = true

        this.cakes = await getAdminCakes()
      } catch (error) {
        console.error('Failed to load cakes:', error)

        alert('Unable to load cakes.')
      } finally {
        this.loading = false
      }
    },

    /* ================================= */
    /* LOAD CAKE OPTIONS */
    /* ================================= */

    async loadCakeOptions() {
      try {
        this.optionsLoading = true

        this.cakeOptions = await getAdminCakeOptions()
      } catch (error) {
        console.error('Failed to load cake options:', error)

        alert('Unable to load cake options.')
      } finally {
        this.optionsLoading = false
      }
    },

    /* ================================= */
    /* IMAGE URL */
    /* ================================= */

    getImageUrl(imgUrl) {
      if (!imgUrl) {
        return ''
      }

      if (imgUrl.startsWith('http')) {
        return imgUrl
      }

      return `http://localhost:8000${imgUrl}`
    },

    /* ================================= */
    /* GET OPTIONS BY TYPE */
    /* ================================= */

    getOptionsByType(type) {
      return this.cakeOptions.filter((option) => option.type === type)
    },

    /* ================================= */
    /* ADD CAKE */
    /* ================================= */

    openAddCakeForm() {
      this.editingCake = null

      this.cakeForm = {
        name: '',

        description: '',

        basePrice: 0,

        category: 'CLASSIC',

        imgUrl: '',
      }

      this.showCakeForm = true
    },

    /* ================================= */
    /* EDIT CAKE */
    /* ================================= */

    openEditCakeForm(cake) {
      this.editingCake = cake

      this.cakeForm = {
        name: cake.name,

        description: cake.description,

        basePrice: cake.basePrice,

        category: cake.category,

        imgUrl: cake.imgUrl,
      }

      this.showCakeForm = true
    },

    /* ================================= */
    /* CLOSE CAKE FORM */
    /* ================================= */

    closeCakeForm() {
      this.showCakeForm = false

      this.editingCake = null
    },

    /* ================================= */
    /* SAVE CAKE */
    /* ================================= */

    async saveCake() {
      try {
        this.saving = true

        let savedCake

        if (this.editingCake) {
          savedCake = await updateCake(this.editingCake.id, this.cakeForm)

          const index = this.cakes.findIndex((cake) => cake.id === this.editingCake.id)

          if (index !== -1) {
            this.cakes[index] = savedCake
          }
        } else {
          savedCake = await addCake(this.cakeForm)

          this.cakes.unshift(savedCake)
        }

        this.closeCakeForm()
      } catch (error) {
        console.error('Failed to save cake:', error)

        alert('Unable to save cake.')
      } finally {
        this.saving = false
      }
    },

    /* ================================= */
    /* CAKE STATUS */
    /* ================================= */

    async toggleCakeStatus(cake) {
      const action = cake.active ? 'deactivate' : 'activate'

      const confirmed = window.confirm(`Are you sure you want to ${action} "${cake.name}"?`)

      if (!confirmed) {
        return
      }

      try {
        const updatedCake = await updateCakeStatus(cake.id, !cake.active)

        const index = this.cakes.findIndex((item) => item.id === cake.id)

        if (index !== -1) {
          this.cakes[index] = updatedCake
        }
      } catch (error) {
        console.error('Failed to update cake status:', error)

        alert('Unable to update cake status.')
      }
    },

    /* ================================= */
    /* ADD OPTION */
    /* ================================= */

    openAddOptionForm() {
      this.editingOption = null

      this.optionForm = {
        name: '',

        type: 'SPONGE',

        price: 0,

        img: '',
      }

      this.showOptionForm = true
    },

    /* ================================= */
    /* EDIT OPTION */
    /* ================================= */

    openEditOptionForm(option) {
      this.editingOption = option

      this.optionForm = {
        name: option.name,

        type: option.type,

        price: option.price,

        img: option.img,
      }

      this.showOptionForm = true
    },

    /* ================================= */
    /* CLOSE OPTION FORM */
    /* ================================= */

    closeOptionForm() {
      this.showOptionForm = false

      this.editingOption = null
    },

    /* ================================= */
    /* SAVE OPTION */
    /* ================================= */

    async saveOption() {
      try {
        this.saving = true

        let savedOption

        if (this.editingOption) {
          savedOption = await updateCakeOption(this.editingOption.id, this.optionForm)

          const index = this.cakeOptions.findIndex((option) => option.id === this.editingOption.id)

          if (index !== -1) {
            this.cakeOptions[index] = savedOption
          }
        } else {
          savedOption = await addCakeOption(this.optionForm)

          this.cakeOptions.push(savedOption)
        }

        this.closeOptionForm()
      } catch (error) {
        console.error('Failed to save cake option:', error)

        alert('Unable to save cake option.')
      } finally {
        this.saving = false
      }
    },

    /* ================================= */
    /* OPTION STATUS */
    /* ================================= */

    async toggleOptionStatus(option) {
      const action = option.active ? 'deactivate' : 'activate'

      const confirmed = window.confirm(`Are you sure you want to ${action} "${option.name}"?`)

      if (!confirmed) {
        return
      }

      try {
        const updatedOption = await updateCakeOptionStatus(option.id, !option.active)

        const index = this.cakeOptions.findIndex((item) => item.id === option.id)

        if (index !== -1) {
          this.cakeOptions[index] = updatedOption
        }
      } catch (error) {
        console.error('Failed to update option status:', error)

        alert('Unable to update option status.')
      }
    },
  },
}
</script>

<style scoped>
/* ================================= */
/* ADMIN PAGE */
/* ================================= */

.admin-page {
  min-height: 100vh;
  background: #faf8f6;
}

.admin-content {
  margin-left: 295px;
  padding: 40px;
  min-height: 100vh;
  box-sizing: border-box;
}

/* ================================= */
/* HEADER */
/* ================================= */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;

  font-size: 2.2rem;

  color: #171414;
}

.page-header p {
  margin-top: 8px;

  color: #777;
}

/* ================================= */
/* ADD BUTTON */
/* ================================= */

.add-btn {
  border: none;

  background: #cda967;

  color: white;

  padding: 13px 22px;

  border-radius: 10px;

  font-size: 0.95rem;

  font-weight: 600;

  cursor: pointer;
}

.add-btn:hover {
  background: #b99557;
}

/* ================================= */
/* SECTION SELECTOR */
/* ================================= */

.section-selector {
  display: flex;

  gap: 12px;

  margin-bottom: 30px;
}

.radio-option {
  display: flex;

  align-items: center;

  gap: 8px;

  padding: 10px 18px;

  background: white;

  border-radius: 10px;

  cursor: pointer;

  color: #555;

  font-weight: 600;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.radio-option input {
  accent-color: #cda967;
}

/* ================================= */
/* LOADING */
/* ================================= */

.loading {
  text-align: center;

  padding: 60px;

  color: #777;
}

/* ================================= */
/* CAKES GRID */
/* ================================= */

.cakes-grid {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  gap: 25px;
}

/* ================================= */
/* CAKE CARD */
/* ================================= */

.cake-card {
  background: white;

  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);

  transition: 0.2s;
}

.cake-card:hover {
  transform: translateY(-3px);

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

/* ================================= */
/* CAKE IMAGE */
/* ================================= */

.cake-image {
  position: relative;

  width: 100%;

  height: 220px;

  overflow: hidden;

  background: #f3f0ed;
}

.cake-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;
}

/* ================================= */
/* STATUS */
/* ================================= */

.status-badge {
  position: absolute;

  top: 14px;

  right: 14px;

  padding: 6px 12px;

  border-radius: 20px;

  font-size: 0.75rem;

  font-weight: 600;
}

.status-badge.active {
  background: #e5f5eb;

  color: #2d8a50;
}

.status-badge.inactive {
  background: #f8e5e5;

  color: #b44b4b;
}

/* ================================= */
/* CAKE INFO */
/* ================================= */

.cake-info {
  padding: 20px;
}

.cake-info h3 {
  margin: 0;

  font-size: 1.2rem;

  color: #171414;
}

.category {
  margin: 6px 0;

  color: #c39b59;

  font-size: 0.85rem;

  font-weight: 600;
}

.description {
  margin: 10px 0 18px;

  color: #777;

  font-size: 0.9rem;

  line-height: 1.5;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;
}

/* ================================= */
/* CAKE BOTTOM */
/* ================================= */

.cake-bottom {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 10px;
}

.price {
  font-size: 1.3rem;

  font-weight: 700;

  color: #c39b59;
}

/* ================================= */
/* ACTIONS */
/* ================================= */

.actions {
  display: flex;

  gap: 8px;
}

.actions button {
  border: none;

  padding: 8px 12px;

  border-radius: 8px;

  font-size: 0.8rem;

  font-weight: 600;

  cursor: pointer;
}

.edit-btn {
  background: #f1eee9;

  color: #555;
}

.edit-btn:hover {
  background: #e5e0d8;
}

.status-btn.deactivate {
  background: #fff0f0;

  color: #b44b4b;
}

.status-btn.activate {
  background: #e8f6ed;

  color: #348553;
}

/* ================================= */
/* OPTIONS SECTION */
/* ================================= */

.options-section {
  background: white;

  border-radius: 18px;

  padding: 30px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.option-category {
  margin-bottom: 45px;
}

.option-category:last-child {
  margin-bottom: 0;
}

.option-category-header {
  margin-bottom: 20px;
}

.option-category-header h2 {
  margin: 0;

  color: #171414;

  font-size: 1.5rem;
}

.option-category-header p {
  margin: 6px 0 0;

  color: #777;
}

/* ================================= */
/* OPTIONS GRID */
/* ================================= */

.options-grid {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  gap: 20px;
}

/* ================================= */
/* OPTION CARD */
/* ================================= */

.option-card {
  background: #faf8f6;

  border-radius: 15px;

  overflow: hidden;

  border: 1px solid #eee;

  transition: 0.2s;
}

.option-card:hover {
  transform: translateY(-3px);

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

.option-image {
  position: relative;

  height: 180px;

  background: #f3f0ed;

  overflow: hidden;
}

.option-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;
}

.option-info {
  padding: 18px;
}

.option-info h3 {
  margin: 0 0 15px;

  color: #171414;

  font-size: 1.1rem;
}

.option-bottom {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;
}

.option-bottom .price {
  font-size: 1.15rem;
}

.empty-options {
  padding: 35px;

  text-align: center;

  color: #888;

  background: #faf8f6;

  border-radius: 12px;
}

/* ================================= */
/* MODAL */
/* ================================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 1000;

  padding: 20px;
}

.cake-modal {
  width: min(600px, 100%);

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border-radius: 18px;

  padding: 30px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}

.modal-header h2 {
  margin: 0;
}

.close-btn {
  border: none;

  background: transparent;

  font-size: 1.8rem;

  cursor: pointer;

  color: #777;
}

/* ================================= */
/* FORM */
/* ================================= */

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;

  margin-bottom: 7px;

  font-weight: 600;

  font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;

  box-sizing: border-box;

  padding: 11px 13px;

  border: 1px solid #ddd;

  border-radius: 8px;

  font-family: inherit;

  font-size: 0.95rem;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;

  border-color: #cda967;
}

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;
}

/* ================================= */
/* MODAL BUTTONS */
/* ================================= */

.modal-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 25px;
}

.modal-actions button {
  border: none;

  padding: 11px 20px;

  border-radius: 8px;

  font-weight: 600;

  cursor: pointer;
}

.cancel-btn {
  background: #eee;

  color: #555;
}

.save-btn {
  background: #cda967;

  color: white;
}

.save-btn:hover {
  background: #b99557;
}

.save-btn:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

/* ================================= */
/* RESPONSIVE */
/* ================================= */

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;

    padding: 25px 20px;
  }

  .page-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }

  .add-btn {
    width: 100%;
  }

  .section-selector {
    flex-direction: column;
  }

  .cakes-grid,
  .options-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .cake-bottom,
  .option-bottom {
    flex-direction: column;

    align-items: flex-start;
  }

  .actions {
    width: 100%;
  }

  .actions button {
    flex: 1;
  }
}
</style>
