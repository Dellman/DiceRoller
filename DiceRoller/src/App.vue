<template>
  <div id="app">
    <router-link :to="{name: 'Roller'}">Dice Roller</router-link>
    <router-link :to="{name: 'Creator'}">Character Creator</router-link>
    <router-link :to="{name: 'PointBuy'}">Point Buy</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
