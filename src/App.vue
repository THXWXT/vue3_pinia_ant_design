<template>
  <a-layout class="layout">
    <Navbar />
    <a-layout-content style="padding: 50px 50px">
      <router-view />
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

.layout {
  min-height: 100%;
}

.layout > .ant-layout-content {
  padding: 24px;
}
</style>
