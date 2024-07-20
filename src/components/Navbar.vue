<template>
  <a-layout-header >
    <div style="float: left; padding-right: 10px;">
        <img
        style="object-fit: cover; width: 35px;"
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </div>
    <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="1" @click="navigateTo('/')"><UnorderedListOutlined /> {{ `User list`}}</a-menu-item>
      <a-menu-item key="2" @click="navigateTo('/update/')"><UserOutlined /> {{ `Add user` }}</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { WindowsOutlined, UserOutlined, InfoCircleOutlined , HomeOutlined,UnorderedListOutlined} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

export default {
  name: "Navbar",
  components: {
    WindowsOutlined,
    UserOutlined,
    InfoCircleOutlined,
    HomeOutlined,
    UnorderedListOutlined
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo
    };
  }
};
</script>

<style>
.ant-menu-item {
  font-size: 14px;
}
</style>
