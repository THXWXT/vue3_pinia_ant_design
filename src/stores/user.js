import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
    },
    deleteUser(userId) {
      this.users = this.users.filter(user => user.id !== userId);
    }
  }
});
