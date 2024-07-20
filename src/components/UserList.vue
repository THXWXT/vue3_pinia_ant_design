<template>
    <div>
      <h2>User List</h2>
      <button @click="addUser()">Add</button>
      <ul>
        <li v-for="(user, index) in users" :key="user.id">
          id : {{ index + 1 }}
          {{ user.name }} ({{ user.email }})
          <button @click="editUser(user)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
      <UserForm />
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/user';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import UserForm from './UserForm.vue';
  
  export default {
    components: {
      UserForm
    },
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
  
      const users = computed(() => userStore.users);
  
      const editUser = (user) => {
        router.push({ name: 'UserUpdate', params: { id: user.id } });
      };

      const addUser = () => {
        router.push({ name: 'UserUpdate'});
      };
  
      const deleteUser = (userId) => {
        userStore.deleteUser(userId);
      };
  
      return {
        users,
        editUser,
        deleteUser,
        addUser
      };
    }
  };
  </script>
  