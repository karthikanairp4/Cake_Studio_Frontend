import Bag from '@/views/Bag.vue'
import CakeDetails from '@/views/CakeDetails.vue'
import Cakes from '@/views/Cakes.vue'
import CheckOut from '@/views/CheckOut.vue'
// import Cart from '@/views/Cart.vue'
import Contact from '@/views/Contact.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import MyOrders from '@/views/MyOrders.vue'
import OAuthSuccess from '@/views/OAuthSuccess.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
// import MakeCake from '@/views/MakeCake.vue'
import ThemedCakes from '@/views/ThemedCakes.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/classic-cakes',
    component: Cakes,
  },
  {
    path: '/cakes/:id',
    component: CakeDetails,
  },
  {
    path: '/theme-cakes',
    component: ThemedCakes,
  },
  {
    path: '/contact-us',
    component: Contact,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/oauth-success',
    component: OAuthSuccess,
  },
  {
    path: '/checkout',
    component: CheckOut,
  },
  {
    path: '/my-orders',
    component: MyOrders,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/bag',
    component: Bag,
  },

  // {
  //   path: '/make-cake',
  //   component: MakeCake,
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
