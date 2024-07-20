import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [
      {
        id: "1",
        name: "user1",
        email: "user1@email.com",
        status: 1,
        role: "user",
        createdAt: "2024-07-21T10:00:00Z",
        updatedAt: "2024-07-21T10:00:00Z",
      },
    ],
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
  },
});
