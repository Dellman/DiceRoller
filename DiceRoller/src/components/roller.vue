<template>
  <div>
    <h2>Welcome!</h2>
    <span>{{results}}</span>
    <br />
    <span><button v-on:click="roll(4)">4</button>
    <button v-on:click="roll(5)">5</button>
    <button v-on:click="roll(6)">6</button>
    <button v-on:click="roll(8)">8</button>
    <button v-on:click="roll(10)">10</button>
    <button v-on:click="roll(12)">12</button>
    <button v-on:click="roll(20)">20</button>
    <button v-on:click="roll(100)">100</button></span>
    <br />
    <span>Roll(s): <input type="number" v-model="times" min="1"></span>
    <br />
    <span>Modifier: <input type="number" v-model="modifier" min="0"></span>
  </div>
</template>


<script>
export default {
  name: 'Roller',
  data () {
    return {
      results: [],
      times: '1',
      modifier: '0'
    }
  },
  methods: {
    roll: function(max){
      // this.results = [];
      for (var i = 0; i < this.times; i++) {
        this.display(Math.floor(Math.random() * max + 1));
        // this.results.push(initResult + Math.floor(this.modifier));
      }
      // return this.results;
    },
    display: function(roll){
      console.log(roll);
      return createElement('span', roll);
    }
  },
  render: function (createElement){
    return createElement(
      'h' + this.level,
      this.$slots.default
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>