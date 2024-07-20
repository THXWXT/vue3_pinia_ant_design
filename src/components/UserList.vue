<template>
  <div>
    <h2>User List</h2>
    <a-table :columns="columns" :data-source="users" rowKey="id">
      <template #no="{ record, index }">
        {{ index + 1 }}
      </template>
      <template #action="{ record }">
        <a-space>
          <a-button @click="editUser(record.id)" type="primary"
            ><EditOutlined />Edit</a-button
          >
          <a-button @click="showConfirmDelete(record.id)" type="primary" danger
            ><DeleteOutlined />Delete</a-button
          >
        </a-space>
      </template>
      <template #status="{ record }">
        {{ record.status ? `Active` : `Inactive` }}
      </template>
    </a-table>

    <a-modal
      v-model:visible="isModalVisible"
      title="Do you want to delete"
      @ok="handleDelete"
      @cancel="handleCancel"
    >
      <p>Are you sure you want to delete this user?</p>
    </a-modal>
  </div>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { Button, Table, Modal } from "ant-design-vue";

export default {
  components: {
    "a-button": Button,
    "a-table": Table,
    "a-modal": Modal,
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const users = computed(() => userStore.users);

    const isModalVisible = ref(false);
    const currentUserId = ref(null);

    const showConfirmDelete = (userId) => {
      currentUserId.value = userId;
      isModalVisible.value = true;
    };

    const handleDelete = () => {
      if (currentUserId.value !== null) {
        userStore.deleteUser(currentUserId.value);
        isModalVisible.value = false;
      }
    };

    const handleCancel = () => {
      isModalVisible.value = false;
    };

    const editUser = (userId) => {
      router.push({ name: "UserUpdate", params: { id: userId } });
    };

    const addUser = () => {
      router.push({ name: "UserAdd" });
    };

    const columns = [
      {
        title: "No",
        dataIndex: "index",
        key: "index",
        slots: { customRender: "no" },
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        slots: { customRender: "status" },
      },
      {
        title: "Actions",
        key: "actions",
        slots: { customRender: "action" },
      },
    ];

    return {
      users,
      columns,
      addUser,
      editUser,
      showConfirmDelete,
      handleDelete,
      handleCancel,
      isModalVisible,
    };
  },
};
</script>

<style></style>
