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
