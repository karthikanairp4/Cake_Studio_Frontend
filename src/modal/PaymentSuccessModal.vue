<template>
  <div class="overlay">
    <div class="modal">
      <div class="confetti">
        <span v-for="n in 30" :key="n"></span>
      </div>
      <div class="success-icon">✓</div>

      <h2>Order Confirmed!</h2>

      <p class="subtitle">
        Thank you for choosing <strong>Paprika Bakes</strong>. Your order has been placed
        successfully.
      </p>

      <div class="order-card">
        <div class="row">
          <span>Order Number</span>
          <strong>#{{ order.id }}</strong>
        </div>

        <div class="row">
          <span>Total Paid</span>
          <strong>${{ order.totalAmount.toFixed(2) }}</strong>
        </div>

        <div class="row">
          <span>Status</span>

          <span class="status">
            {{ order.status }}
          </span>
        </div>
      </div>

      <div class="actions">
        <button class="secondary-btn" @click="$router.push('/my-orders')">View My Orders</button>

        <button class="primary-btn" @click="$router.push('/')">Continue Shopping</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
/* ===========================
   Overlay
=========================== */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(23, 20, 20, 0.45);
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

/* ===========================
   Modal
=========================== */

.modal {
  position: relative;
  overflow: hidden;

  width: 480px;
  max-width: 92%;

  background: var(--white);

  border-radius: 28px;

  padding: 45px;

  text-align: center;

  box-shadow: 0 25px 70px rgba(23, 20, 20, 0.15);

  animation: popup 0.35s ease;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===========================
   Confetti
=========================== */

.confetti {
  position: absolute;
  inset: 0;

  pointer-events: none;

  overflow: hidden;
}

.confetti span {
  position: absolute;

  top: -25px;

  width: 10px;
  height: 18px;

  border-radius: 3px;

  opacity: 0;

  animation: confettiFall 2.2s ease-out forwards;
}

/* Colors */

.confetti span:nth-child(3n) {
  background: var(--secondary);
}

.confetti span:nth-child(3n + 1) {
  background: #f8efd8;
}

.confetti span:nth-child(3n + 2) {
  background: #7d5a50;
}

/* Positions */

.confetti span:nth-child(1) {
  left: 3%;
  animation-delay: 0.05s;
}

.confetti span:nth-child(2) {
  left: 8%;
  animation-delay: 0.1s;
}

.confetti span:nth-child(3) {
  left: 13%;
  animation-delay: 0.15s;
}

.confetti span:nth-child(4) {
  left: 18%;
  animation-delay: 0.2s;
}

.confetti span:nth-child(5) {
  left: 23%;
  animation-delay: 0.05s;
}

.confetti span:nth-child(6) {
  left: 28%;
  animation-delay: 0.18s;
}

.confetti span:nth-child(7) {
  left: 33%;
  animation-delay: 0.12s;
}

.confetti span:nth-child(8) {
  left: 38%;
  animation-delay: 0.08s;
}

.confetti span:nth-child(9) {
  left: 43%;
  animation-delay: 0.2s;
}

.confetti span:nth-child(10) {
  left: 48%;
  animation-delay: 0.05s;
}

.confetti span:nth-child(11) {
  left: 53%;
  animation-delay: 0.18s;
}

.confetti span:nth-child(12) {
  left: 58%;
  animation-delay: 0.1s;
}

.confetti span:nth-child(13) {
  left: 63%;
  animation-delay: 0.16s;
}

.confetti span:nth-child(14) {
  left: 68%;
  animation-delay: 0.04s;
}

.confetti span:nth-child(15) {
  left: 73%;
  animation-delay: 0.14s;
}

.confetti span:nth-child(16) {
  left: 78%;
  animation-delay: 0.07s;
}

.confetti span:nth-child(17) {
  left: 83%;
  animation-delay: 0.15s;
}

.confetti span:nth-child(18) {
  left: 88%;
  animation-delay: 0.1s;
}

.confetti span:nth-child(19) {
  left: 93%;
  animation-delay: 0.2s;
}

.confetti span:nth-child(20) {
  left: 97%;
  animation-delay: 0.05s;
}

.confetti span:nth-child(21) {
  left: 6%;
  animation-delay: 0.3s;
}

.confetti span:nth-child(22) {
  left: 15%;
  animation-delay: 0.28s;
}

.confetti span:nth-child(23) {
  left: 25%;
  animation-delay: 0.24s;
}

.confetti span:nth-child(24) {
  left: 35%;
  animation-delay: 0.32s;
}

.confetti span:nth-child(25) {
  left: 45%;
  animation-delay: 0.26s;
}

.confetti span:nth-child(26) {
  left: 55%;
  animation-delay: 0.3s;
}

.confetti span:nth-child(27) {
  left: 65%;
  animation-delay: 0.22s;
}

.confetti span:nth-child(28) {
  left: 75%;
  animation-delay: 0.27s;
}

.confetti span:nth-child(29) {
  left: 85%;
  animation-delay: 0.34s;
}

.confetti span:nth-child(30) {
  left: 95%;
  animation-delay: 0.25s;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-40px) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(420px) rotate(720deg);
    opacity: 0;
  }
}

/* ===========================
   Success Icon
=========================== */

.success-icon {
  width: 90px;
  height: 90px;

  margin: 0 auto 25px;

  border-radius: 50%;

  background: rgba(209, 170, 103, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--secondary);

  font-size: 42px;
  font-weight: bold;

  position: relative;
  z-index: 5;
}

/* ===========================
   Typography
=========================== */

h2 {
  margin: 0;

  color: var(--primary);

  font-size: 2rem;
}

.subtitle {
  margin: 18px 0 35px;

  line-height: 1.7;

  color: var(--text-light);
}

/* ===========================
   Order Card
=========================== */

.order-card {
  background: var(--background);

  border: 1px solid #eeeeee;

  border-radius: 20px;

  padding: 25px;

  margin-bottom: 35px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 0;

  border-bottom: 1px solid #ececec;
}

.row:last-child {
  border-bottom: none;
}

.row span {
  color: var(--text-light);
}

.row strong {
  color: var(--primary);
}

.status {
  padding: 7px 16px;

  border-radius: 999px;

  background: rgba(209, 170, 103, 0.15);

  color: var(--secondary);

  font-size: 0.85rem;

  font-weight: 600;
}

/* ===========================
   Buttons
=========================== */

.actions {
  display: flex;
  flex-direction: column;

  gap: 15px;
}

.primary-btn,
.secondary-btn {
  height: 54px;

  border-radius: 999px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.3s ease;
}

.primary-btn {
  background: var(--secondary);

  color: white;

  border: none;
}

.primary-btn:hover {
  background: var(--secondary-hover);

  transform: translateY(-2px);
}

.secondary-btn {
  background: white;

  color: var(--secondary);

  border: 1px solid var(--secondary);
}

.secondary-btn:hover {
  background: var(--secondary);

  color: white;

  transform: translateY(-2px);
}

/* ===========================
   Responsive
=========================== */

@media (max-width: 600px) {
  .modal {
    padding: 35px 24px;
  }

  h2 {
    font-size: 1.6rem;
  }

  .success-icon {
    width: 75px;
    height: 75px;

    font-size: 34px;
  }
}
</style>
