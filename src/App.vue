<template>
  <div>
    <PersonalForm />
    <CodeForm />
  </div>
</template>

<script>
import PersonalForm from './components/PersonalForm.vue'
import CodeForm from './components/CodeForm.vue'
export default {
  name: 'App',
  components: {
    PersonalForm,
    CodeForm
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}

div {
  width: 50%;
  margin: 0 auto;
}
</style>
