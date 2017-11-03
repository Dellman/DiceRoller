<template>
  <div id="app">

    <Roller/>
  </div>
</template>

<script>
import Roller from './components/roller'

export default {
  name: 'app',
  components: {
    Roller
  }
}
</script>

<style>
body{
  background-image: url("assets/parchment.jpg");
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
