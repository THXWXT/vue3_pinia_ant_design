import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../components/UserList.vue'
import UserUpdate from '@/views/UserUpdate.vue'
import UserAdd from '@/views/UserAdd.vue'
import UserView from '@/components/UserView.vue'
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
  },
  {
    path: '/user/:id',
    name: 'UserView',
    component: UserView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;