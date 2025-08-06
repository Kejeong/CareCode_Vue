import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/facilities',
      name: 'facilities',
      component: () => import('../views/FacilitiesView.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityView.vue'),
    },
    {
      path: '/health',
      name: 'health',
      component: () => import('../views/HealthView.vue'),
    },
    {
      path: '/policies',
      name: 'policies',
      component: () => import('../views/PoliciesView.vue'),
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: () => import('../views/ChatbotView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboardView.vue'),
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue'),
        },
        {
          path: 'hospitals',
          name: 'admin-hospitals',
          component: () => import('../views/admin/HospitalsView.vue'),
        },
        {
          path: 'facilities',
          name: 'admin-facilities',
          component: () => import('../views/admin/FacilitiesView.vue'),
        },
        {
          path: 'policies',
          name: 'admin-policies',
          component: () => import('../views/admin/PoliciesView.vue'),
        },
        {
          path: 'community',
          name: 'admin-community',
          component: () => import('../views/admin/CommunityView.vue'),
        },
        {
          path: 'health',
          name: 'admin-health',
          component: () => import('../views/admin/HealthView.vue'),
        },
        {
          path: 'notifications',
          name: 'admin-notifications',
          component: () => import('../views/admin/NotificationsView.vue'),
        },
      ],
    },
  ],
})

export default router
