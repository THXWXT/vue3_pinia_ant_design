<template>
  <UserForm :userId="route.params?.id" />
</template>

<script>
import UserForm from "../components/UserForm.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    UserForm,
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>
