import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from '../components/finder-map/container.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Container
  }
]

const router = new VueRouter({
  routes
})

export default router
