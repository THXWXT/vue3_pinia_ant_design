import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../components/UserList.vue'
import UserUpdate from '@/views/UserUpdate.vue'
import UserAdd from '@/views/UserAdd.vue'
const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/update/:id',
    name: 'UserUpdate',
    component: UserUpdate
  },
  {
    path: '/update/',
    name: 'UserAdd',
    component: UserAdd
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;