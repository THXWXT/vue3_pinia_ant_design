<template>
  <div style="max-width: 500px">
    <a-card :title="`User info`" bordered="{false}">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :xl="8">
          <strong>Name:</strong>
        </a-col>
        <a-col span="16">{{ user.name }}</a-col>
        <a-col :xs="24" :xl="8">
          <strong>Email:</strong>
        </a-col>
        <a-col span="16">{{ user.email }}</a-col>
        <a-col :xs="24" :xl="8">
          <strong>Status:</strong>
        </a-col>
        <a-col span="16">{{ user.status === 1 ? "Active" : "Inactive" }}</a-col>
        <a-col :xs="24" :xl="8">
          <strong>Role:</strong>
        </a-col>
        <a-col span="16">{{ user.role }}</a-col>
        <a-col :xs="24" :xl="8">
          <strong>Phone Number:</strong>
        </a-col>
        <a-col span="16">{{ user.phoneNumber }}</a-col>
        <a-col :xs="24" :xl="8">
          <strong>Created At:</strong>
        </a-col>
        <a-col span="16">{{ formattedCreatedAt }}</a-col>
      </a-row>
      <a-row style="margin-top: 16px">
        <a-col>
          <a-button @click="goBack" danger>{{ "Back" }}</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Card, Row, Col, Button } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { format } from "date-fns";

export default {
  components: {
    "a-card": Card,
    "a-row": Row,
    "a-col": Col,
    "a-button": Button,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    const user = ref({
      name: "",
      email: "",
      status: 1,
      role: "user",
      phoneNumber: "",
      createdAt: "",
    });

    const formattedCreatedAt = computed(() => {
      return user.value.createdAt
        ? format(new Date(user.value.createdAt), "yyyy-MM-dd HH:mm:ss")
        : "";
    });

    onMounted(() => {
      const userId = route.params.id;
      const existingUser = userStore.users.find((u) => u.id === userId);
      if (existingUser) {
        user.value = { ...existingUser };
      }
    });

    const goBack = () => {
      router.push("/");
    };

    return {
      user,
      formattedCreatedAt,
      goBack,
    };
  },
};
</script>

<style>
/* สไตล์เพิ่มเติม */
</style>
