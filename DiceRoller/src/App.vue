<template>
  <div id="app">
    <Roller/>
    <!-- <rounter-link to="/Roller">
      Roller
    </rounter-link>
    <router-link to="/Creator">
      Character Creator
    </router-link>
    <router-view></router-view> -->
    <Creator/>
  </div>
</template>

<script>
import Roller from './components/roller';
import Creator from './components/characterCreator';

export default {
  name: 'app',
  components: {
    Roller,
    Creator
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
span{
  /*display: block;*/
}
input{
  margin: .25em 0;
}
</style>
