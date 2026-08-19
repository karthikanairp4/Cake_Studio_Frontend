<template>
  <div class="admin-page">
    <AdminSidebar />

    <main class="admin-content">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1>Reports</h1>
          <p>Analyze your store performance and get AI-powered insights.</p>
        </div>
      </div>

      <!-- AI Sales Insights -->
      <section class="ai-section">
        <div class="ai-header">
          <div>
            <h2>
              <i class="bi bi-stars"></i>
              AI Sales Insights
            </h2>

            <p>Get an AI-powered analysis of your current sales performance.</p>
          </div>

          <button class="ai-refresh-btn" @click="loadAIInsights" :disabled="aiLoading">
            <i class="bi bi-arrow-clockwise"></i>

            {{ aiLoading ? 'Analyzing...' : 'Generate Insights' }}
          </button>
        </div>

        <!-- Loading -->
        <div v-if="aiLoading" class="ai-loading">
          <div class="spinner"></div>

          <div>
            <strong>Analyzing your sales data...</strong>
            <p>Gemini is preparing your business insights.</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="aiError" class="ai-error">
          <i class="bi bi-exclamation-circle"></i>

          <div>
            <strong>Unable to generate insights</strong>
            <p>{{ aiError }}</p>
          </div>
        </div>

        <!-- AI Result -->
        <div v-else-if="aiInsights" class="ai-content">
          <div class="ai-response" v-html="formatAIResponse(aiInsights)"></div>
        </div>

        <!-- Empty State -->
        <div v-else class="ai-empty">
          <div class="ai-icon">
            <i class="bi bi-stars"></i>
          </div>

          <h3>Get AI-powered sales insights</h3>

          <p>
            Let AI analyze your orders and identify your best-selling products, potential concerns,
            and practical recommendations.
          </p>

          <button class="generate-btn" @click="loadAIInsights">
            <i class="bi bi-stars"></i>
            Generate Insights
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'

import { getAIInsights } from '@/services/Admin/aiService'

export default {
  components: {
    AdminSidebar,
  },

  data() {
    return {
      aiInsights: '',

      aiLoading: false,

      aiError: null,
    }
  },

  methods: {
    async loadAIInsights() {
      try {
        this.aiLoading = true

        this.aiError = null

        const response = await getAIInsights()

        this.aiInsights = response
      } catch (error) {
        console.error('Failed to load AI insights:', error)

        this.aiError = 'Unable to generate AI insights. Please try again.'
      } finally {
        this.aiLoading = false
      }
    },

    formatAIResponse(text) {
      if (!text) {
        return ''
      }

      return (
        text

          // Headings
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')

          .replace(/^## (.*$)/gm, '<h3>$1</h3>')

          // Bullet points
          .replace(/^\* (.*$)/gm, '<li>$1</li>')

          .replace(/^- (.*$)/gm, '<li>$1</li>')

          // Numbered list
          .replace(/^\d+\.\s(.*$)/gm, '<li>$1</li>')

          // Bold text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

          // Line breaks
          .replace(/\n\n/g, '<br>')

          .replace(/\n/g, '<br>')
      )
    },
  },
}
</script>

<style scoped>
/* =========================
   PAGE
========================= */

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

/* =========================
   PAGE HEADER
========================= */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0;

  font-size: 2.2rem;

  color: #171414;
}

.page-header p {
  margin-top: 8px;

  color: #777;

  font-size: 0.95rem;
}

/* =========================
   AI SECTION
========================= */

.ai-section {
  background: white;

  border-radius: 18px;

  padding: 30px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

/* =========================
   AI HEADER
========================= */

.ai-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  margin-bottom: 25px;
}

.ai-header h2 {
  margin: 0;

  font-size: 1.4rem;

  color: #171414;
}

.ai-header h2 i {
  color: #cda967;

  margin-right: 8px;
}

.ai-header p {
  margin: 7px 0 0;

  color: #777;

  font-size: 0.9rem;
}

/* =========================
   REFRESH BUTTON
========================= */

.ai-refresh-btn {
  border: none;

  background: #cda967;

  color: white;

  padding: 11px 18px;

  border-radius: 9px;

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  white-space: nowrap;
}

.ai-refresh-btn:hover {
  background: #b99557;
}

.ai-refresh-btn:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

/* =========================
   LOADING
========================= */

.ai-loading {
  min-height: 220px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 15px;

  color: #555;
}

.ai-loading p {
  margin: 5px 0 0;

  color: #888;

  font-size: 0.9rem;
}

.spinner {
  width: 28px;

  height: 28px;

  border: 3px solid #eee;

  border-top: 3px solid #cda967;

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   ERROR
========================= */

.ai-error {
  display: flex;

  align-items: flex-start;

  gap: 12px;

  padding: 18px;

  border-radius: 10px;

  background: #fff0f0;

  color: #b44b4b;
}

.ai-error i {
  font-size: 1.2rem;
}

.ai-error strong {
  display: block;

  margin-bottom: 4px;
}

.ai-error p {
  margin: 0;

  font-size: 0.9rem;
}

/* =========================
   AI CONTENT
========================= */

.ai-content {
  background: #faf8f6;

  border-radius: 14px;

  padding: 28px;

  border: 1px solid #eee9e3;
}

.ai-response {
  color: #555;

  font-size: 0.95rem;

  line-height: 1.7;
}

/* AI headings */

.ai-response h3 {
  margin-top: 24px;

  margin-bottom: 10px;

  color: #171414;

  font-size: 1.05rem;

  font-weight: 700;
}

.ai-response h3:first-child {
  margin-top: 0;
}

/* Bold */

.ai-response strong {
  color: #171414;
}

/* Lists */

.ai-response li {
  margin-bottom: 8px;

  margin-left: 22px;
}

/* =========================
   EMPTY STATE
========================= */

.ai-empty {
  text-align: center;

  padding: 55px 30px;
}

.ai-icon {
  width: 60px;

  height: 60px;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #f8f1e4;

  display: flex;

  align-items: center;

  justify-content: center;
}

.ai-icon i {
  font-size: 1.7rem;

  color: #cda967;
}

.ai-empty h3 {
  margin: 0 0 10px;

  color: #171414;

  font-size: 1.2rem;
}

.ai-empty p {
  max-width: 550px;

  margin: 0 auto 22px;

  color: #777;

  line-height: 1.6;

  font-size: 0.9rem;
}

.generate-btn {
  border: none;

  background: #cda967;

  color: white;

  padding: 11px 20px;

  border-radius: 9px;

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;
}

.generate-btn:hover {
  background: #b99557;
}

.generate-btn i {
  margin-right: 6px;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 768px) {
  .admin-content {
    padding: 25px 20px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .ai-section {
    padding: 20px;
  }

  .ai-header {
    flex-direction: column;

    align-items: flex-start;
  }

  .ai-refresh-btn {
    width: 100%;
  }

  .ai-content {
    padding: 20px;
  }

  .ai-loading {
    flex-direction: column;

    text-align: center;
  }
}
</style>
