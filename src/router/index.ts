import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/NotebookManagementView.vue'
import NotebookManagementView from '../views/NotebookManagementView.vue'
import NotebookCreationView from '../views/NotebookCreationView.vue'
import NotebookInstanceView from '../views/NotebookInstanceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:userId/',
      name: 'NotebookManagement',
      component: NotebookManagementView,
    },
    {
      path: '/:userId/:nodeId/create',
      name: 'NotebookCreation',
      component: NotebookCreationView,
    },
    {
      path: '/:userId/instance/:instanceName',
      name: 'NotebookInstance',
      component: NotebookInstanceView,
    },
  ],
})

export default router
