<template>
  <div class="search-overlay" @click.self="$emit('close')">
    <div class="search-box">
      <!-- Search Header -->
      <div class="search-header">
        <i class="fas fa-search search-icon"></i>

        <input
          v-model="keyword"
          type="text"
          placeholder="Search your favorite cake..."
          @input="debouncedSearch"
          autofocus
        />

        <button v-if="keyword" class="clear-btn" @click="clearSearch">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="status">Searching...</div>

      <!-- Results -->
      <div v-for="cake in cakes" :key="cake.id" class="result" @click="openCake(cake.id)">
        <img :src="`${BASE_URL}${cake.imgUrl}`" :alt="cake.name" />

        <div class="info">
          <h4>{{ cake.name }}</h4>
          <p>${{ Number(cake.basePrice).toFixed(2) }}</p>
        </div>

        <i class="fas fa-chevron-right arrow"></i>
      </div>

      <!-- Empty -->
      <div v-if="!loading && keyword.length >= 2 && cakes.length === 0" class="status">
        No cakes found
      </div>
    </div>
  </div>
</template>

<script>
import { searchCakes } from '@/services/cakeService'
import { BASE_URL } from '@/config/constants'

export default {
  emits: ['close'],

  data() {
    return {
      keyword: '',
      cakes: [],
      loading: false,
      BASE_URL,
      timer: null,
    }
  },

  methods: {
    clearSearch() {
      this.keyword = ''
      this.cakes = []
    },

    debouncedSearch() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.search()
      }, 300)
    },

    async search() {
      if (this.keyword.trim().length < 2) {
        this.cakes = []
        return
      }

      try {
        this.loading = true

        this.cakes = await searchCakes(this.keyword.trim())
      } catch (error) {
        console.error(error)
        this.cakes = []
      } finally {
        this.loading = false
      }
    },

    openCake(id) {
      this.$emit('close')
      this.$router.push(`/cakes/${id}`)
    },
  },
}
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 90px;
  z-index: 9999;
}

.search-box {
  width: 100%;
  max-width: 700px;
  max-height: 75vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
}

/* Search Header */

.search-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 24px;
  border-bottom: 1px solid #efefef;
  position: sticky;
  top: 0;
  background: white;
}

.search-icon {
  color: #d8a34b;
  font-size: 18px;
}

.search-header input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px;
  background: transparent;
}

.search-header input::placeholder {
  color: #999;
}

.clear-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #f4f4f4;
  cursor: pointer;
  transition: 0.2s;
}

.clear-btn:hover {
  background: #e8e8e8;
}

/* Results */

.result {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  margin: 10px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s;
}

.result:hover {
  background: #fff8f1;
  transform: translateY(-2px);
}

.result img {
  width: 78px;
  height: 78px;
  object-fit: cover;
  border-radius: 12px;
  transition: 0.3s;
}

.result:hover img {
  transform: scale(1.05);
}

.info {
  flex: 1;
}

.info h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.info p {
  margin-top: 6px;
  color: #d8a34b;
  font-weight: bold;
  font-size: 18px;
}

.arrow {
  color: #bbb;
  transition: 0.2s;
}

.result:hover .arrow {
  color: #d8a34b;
  transform: translateX(4px);
}

/* Status */

.status {
  padding: 30px;
  text-align: center;
  color: #888;
}

/* Scrollbar */

.search-box::-webkit-scrollbar {
  width: 8px;
}

.search-box::-webkit-scrollbar-thumb {
  background: #d9c39b;
  border-radius: 10px;
}

.search-box::-webkit-scrollbar-track {
  background: #fafafa;
}

@media (max-width: 768px) {
  .search-overlay {
    padding: 15px;
    padding-top: 70px;
  }

  .search-box {
    max-width: 100%;
  }

  .result {
    margin: 6px;
    padding: 12px;
  }

  .result img {
    width: 65px;
    height: 65px;
  }

  .info h4 {
    font-size: 16px;
  }

  .info p {
    font-size: 16px;
  }
}
</style>
