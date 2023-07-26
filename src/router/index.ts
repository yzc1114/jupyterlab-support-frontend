import { createRouter, createWebHistory } from 'vue-router'
import NotebookManagementView from '../views/NotebookManagementView.vue'
import NotebookCreationView from '../views/NotebookCreationView.vue'
import NotebookInstanceView from '../views/NotebookInstanceView.vue'
import TestView from '../views/TestIframeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test/',
      name: 'TestView',
      component: TestView,
    },
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
