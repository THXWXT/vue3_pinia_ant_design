<template>
    <div>
      <h2>{{ isEditMode ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Name:</label>
          <input v-model="user.name" required />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="user.email" type="email" required />
        </div>
        <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} User</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/user';
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    props: ['userId'],
    setup(props) {
      const userStore = useUserStore();
      const route = useRoute();
      const router = useRouter();
  
      const user = ref({
        id: Date.now().toString(),
        name: '',
        email: ''
      });
  
      const isEditMode = computed(() => !!props.userId);
     
  
      if (isEditMode.value) {
        const existingUser = userStore.users.find(u => u.id === props.userId);
        if (existingUser) {
          user.value = { ...existingUser };
        }
      }
  
      const handleSubmit = () => {
        if (isEditMode.value) {
          userStore.updateUser(user.value);
        } else {
          userStore.addUser(user.value);
        }
        router.push('/');
      };
  
      return {
        user,
        isEditMode,
        handleSubmit
      };
    }
  };
  </script>
  