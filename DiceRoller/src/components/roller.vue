<template>
  <div>
    <h2>Welcome!</h2>
    <span>{{results}}</span>
    <br />
    <span><button v-on:click="roll(4)">D4</button>
    <button v-on:click="roll(5)">D5</button>
    <button v-on:click="roll(6)">D6</button>
    <button v-on:click="roll(8)">D8</button>
    <button v-on:click="roll(10)">D10</button>
    <button v-on:click="roll(12)">D12</button>
    <button v-on:click="roll(20)">D20</button>
    <button v-on:click="roll(100)">D100</button></span>
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
      modifier: '0',
    }
  },
  methods: {
    roll: function(max){
      this.results = [];
      for (let i = 0; i < this.times; i++) {
        this.display(Math.floor(Math.random() * max + 1));
      }
    },
    display: function(roll){
      // console.log(roll);
      // this.results.push(roll + Math.floor(this.modifier));
      this.storeRolls(roll + Math.floor(this.modifier));
    },
    storeRolls: function(roll){
      rollObject = {};
      rollObject.roll = roll;
      rollObject.id = 1;
      console.log(rollObject);

    }
  },
  render: function (createElement){
    // return createElement(
    //   'h' + this.level,
    //   this.$slots.default
    // )
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