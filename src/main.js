import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

const routes = [
  {
    path: '/',
    component: () => import('./components/UserForm.vue')
  }, 
  {
    path: '/business',
    component: () => import('./components/BusinessForm.vue')
  },
  {
    path: '/confirmation',
    component: () => import('./components/ConfirmationPage.vue')  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(router).use(vuetify).mount('#app')