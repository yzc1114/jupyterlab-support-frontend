import { createRouter, createWebHistory } from 'vue-router'
import NotebookManagementView from '../views/NotebookManagementView.vue'
import NotebookCreationView from '../views/NotebookCreationView.vue'
import NotebookUserCreationView from '../views/NotebookUserCreationView.vue'
import NotebookInstanceView from '../views/NotebookInstanceView.vue'
import TestView from '../views/TestIframeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/test/',
      name: 'TestView',
      component: TestView,
    },
    {
      path: '/instances/:userId/',
      name: 'NotebookManagement',
      component: NotebookManagementView,
    },
    {
      path: '/create/:userId/:nodeId',
      name: 'NotebookCreation',
      component: NotebookCreationView,
    },
    {
      path: '/create/:userId',
      name: 'NotebookUserCreation',
      component: NotebookUserCreationView,
    },
    {
      path: '/instance/:userId/:instanceName',
      name: 'NotebookInstance',
      component: NotebookInstanceView,
    },
  ],
})

export default router
