<template>
  <div style="max-width: 500px">
    <h2>{{ isEditMode ? "Edit User" : "Add User" }}</h2>
    <a-form :model="user" layout="vertical">
      <a-form-item label="Name" required>
        <a-input v-model:value="user.name" placeholder="Enter user name" />
      </a-form-item>
      <a-form-item label="Email" required>
        <a-input
          v-model:value="user.email"
          type="email"
          placeholder="Enter user email"
        />
      </a-form-item>
      <a-form-item label="Status" required>
        <a-select
          ref="select"
          v-model:value="user.status"
          style="width: 100%"
        >
          <a-select-option :value="1">Active</a-select-option>
          <a-select-option :value="2">Inactive</a-select-option>
        </a-select>
      </a-form-item>
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
      status:1
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

    const handleSubmit = () => {
      if (isEditMode.value) {
        userStore.updateUser(user.value);
      } else {
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
    };
  },
};
</script>

<style>
/* สไตล์เพิ่มเติม */
</style>
