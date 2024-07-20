<template>
  <div style="max-width: 500px">
    <h2>{{ isEditMode ? "Edit User" : "Add User" }}</h2>
    <a-form :model="user" layout="vertical">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :xl="12">
          <a-form-item label="Name" required>
            <a-input v-model:value="user.name" placeholder="Enter user name" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="12">
          <a-form-item label="Email" required>
            <a-input
              v-model:value="user.email"
              type="email"
              placeholder="Enter user email"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="12">
          <a-form-item label="Phone Number" required>
            <a-input
              v-model:value="user.phoneNumber"
              type="tel"
              placeholder="Enter user phone number"
              :maxLength="10"
              pattern="[0-9]*"
              inputmode="numeric"
              @input="handleInputNumber"
              @change="handleInputNumber"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="12">
          <a-form-item label="Status" required>
            <a-select v-model:value="user.status" style="width: 100%">
              <a-select-option :value="1">Active</a-select-option>
              <a-select-option :value="2">Inactive</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="24">
          <a-form-item label="Role" required>
            <a-select v-model:value="user.role" style="width: 100%">
              <a-select-option value="user">User</a-select-option>
              <a-select-option value="admin">Admin</a-select-option>
              <a-select-option value="superAdmin">Super Admin</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="24">
          <a-form-item>
            <a-space>
              <a-button danger @click="goBack">
                {{ "Back" }}
              </a-button>
              <a-button type="primary" @click="showConfirmModal">
                {{ isEditMode ? "Update" : "Save" }}
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal
      v-model:visible="isModalVisible"
      title="Confirm"
      @ok="handleConfirm"
      @cancel="handleCancel"
    >
      <p>
        Are you sure you want to {{ isEditMode ? "update" : "add" }} this user?
      </p>
    </a-modal>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { formatISO } from "date-fns";
import { message } from "ant-design-vue";

export default {
  props: ["userId"],
  setup(props) {
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const user = ref({
      id: Date.now().toString(),
      name: "",
      email: "",
      phoneNumber: "0",
      status: 1,
      role: "user",
      createdAt: "",
    });

    const isEditMode = computed(() => !!props.userId);

    if (isEditMode.value) {
      const existingUser = userStore.users.find((u) => u.id === props.userId);
      if (existingUser) {
        user.value = { ...existingUser };
      }
    }

    const isModalVisible = ref(false);

    const showConfirmModal = () => {
      isModalVisible.value = true;
    };

    const handleConfirm = () => {
      handleSubmit();
      isModalVisible.value = false;
    };

    const handleCancel = () => {
      isModalVisible.value = false;
    };

    const handleInputNumber = (event) => {
      user.value.phoneNumber = event.target.value.replace(/\D/g, "");
    };

    const handleSubmit = () => {
      if (!user.value.name || !user.value.phoneNumber || !user.value.email) {
        message.error("Please fill in all information.");
        return;
      }
      if (isEditMode.value) {
        message.success("Update user successfully");
        userStore.updateUser(user.value);
      } else {
        user.value.createdAt = formatISO(new Date());
        message.success("Add user successfully");
        userStore.addUser(user.value);
      }
      router.push("/");
    };

    const goBack = () => {
      router.push("/");
    };

    return {
      user,
      isEditMode,
      showConfirmModal,
      handleConfirm,
      handleCancel,
      isModalVisible,
      goBack,
      formatISO,
      message,
      handleInputNumber,
    };
  },
};
</script>

<style></style>
