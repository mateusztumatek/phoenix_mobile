import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/strona/:slug',
    name: 'Strona',
    component: function () {
      return import('../views/strona/_slug.vue');
    },
  },
  {
    path: '/galeria',
    name: 'Galeria',
    component: function () {
      return import('../views/galeria.vue');
    },
  },
  {
    path:'/kategoria/:slug',
    component: function () {
      return import('../views/produkty.vue');
    },
  },
  {
    path:'/kolekcje/:id',
    component: function () {
      return import('../views/produkty.vue');
    },
  },
  {
    path: '/produkty',
    name: 'Produkty',
    component: function () {
      return import('../views/produkty.vue')
    }
  },

  {
    path:'/produkt/:id/:slug',
    name: 'Produkt',
    component:function () {
      return import('../views/produkt/_id/_slug.vue');
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
