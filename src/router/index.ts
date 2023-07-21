import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/NotebookManagementView.vue'
import NotebookManagementView from '../views/NotebookManagementView.vue'
import NotebookCreationView from '../views/NotebookCreationView.vue'
import NotebookInstanceView from '../views/NotebookInstanceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:user_id/',
      name: 'NotebookManagement',
      component: NotebookManagementView,
    },
    {
      path: '/:user_id/:node_id/create',
      name: 'NotebookCreation',
      component: NotebookCreationView,
    },
    {
      path: '/:user_id/instance/:id',
      name: 'NotebookInstance',
      component: NotebookInstanceView,
    },
  ],
})

export default router
