<template>
  <div id="app">
  <!-- <router-view/> -->
  <!-- <h2>Test</h2> -->
  <!-- <router-link to="/roller">Roller</router-link> -->
  <!-- Nothing in here matters -->
  </div>
</template>

<script>
import Roller from './components/roller';
import Creator from './components/characterCreator';
import PointBuy from './components/pointBuy';

export default {
  name: 'app',
  components: {
    Roller, Creator, PointBuy
  }
}
</script>

<style>
/* These styles don't actually matter because how it is set up is that the app is just filled with EVERYTHING from the other components (I think) */
/* body{
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
  display: block;
}
input{
  margin: .25em 0;
} */
</style>
