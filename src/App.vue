<template>
  <div id="app">
    <HeaderComponent />
    <router-view> </router-view>
  </div>
</template>

<script>

import HeaderComponent from './shared/Header.vue';
export default {
  name: 'App',
  data() {
    return {
      messageSent: false
    }
  },
  components: {
    HeaderComponent
  },
  methods: {
    codeSent(codeSent) {
      this.messageSent = codeSent
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

}
</style>
