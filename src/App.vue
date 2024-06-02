<template>
  <BusinessForm/>
</template>

<script>
import BusinessForm from './components/BusinessForm.vue'
export default {
  name: 'App',
  data() {
    return {
      messageSent: false
    }
  },
  components: {
    BusinessForm
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
