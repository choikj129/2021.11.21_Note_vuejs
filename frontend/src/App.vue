<template>
  <div id="app">
    <note />
  </div>
</template>

<script>
import note from './components/Note.vue'

export default {
  name: 'App',
  components: {
    note
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
