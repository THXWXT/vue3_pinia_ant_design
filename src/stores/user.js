import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [
      {
        id: "1",
        username:"user1",
        name: "user1",
        email: "user1@email.com",
        status: 1,
        role: "user",
        createdAt: "2024-07-21T10:00:00Z",
        phoneNumber: "+1234567890",
      },
      {
        id: "2",
        username:"user2",
        name: "user2",
        email: "user2@email.com",
        status: 2,
        role: "admin",
        createdAt: "2024-07-21T10:00:00Z",
        phoneNumber: "+1234567890",
      },
      {
        id: "3",
        username:"user3",
        name: "user3",
        email: "user3@email.com",
        status: 1,
        role: "superAdmin",
        createdAt: "2024-07-21T10:00:00Z",
        phoneNumber: "+1234567890",
      },
      {
        id: "4",
        username:"user4",
        name: "user4",
        email: "user4@email.com",
        status: 1,
        role: "user",
        createdAt: "2024-07-21T10:00:00Z",
        phoneNumber: "+1234567890",
      },
      {
        id: "5",
        username:"user5",
        name: "user5",
        email: "user5@email.com",
        status: 2,
        role: "user",
        createdAt: "2024-07-21T10:00:00Z",
        phoneNumber: "+1234567890",
      }, 
    ],
  }),
  actions: {
    addUser(user) {
      console.log(user,'user');
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
