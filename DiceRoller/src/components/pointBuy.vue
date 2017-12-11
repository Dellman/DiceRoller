<template>
  <div>
      <h2>Point Buy System</h2>
      <label>Available Points:<input type="number" v-model="totalPoints"></label>
      Remaining Points: <input type="text" readonly v-model="remainingPoints">

      <table>
        <tr>
          <th class="empty"></th>
          <th>Base Score</th>
          <th>Racial Adjustment</th>
          <th>Total Score</th>
          <th>Modifier</th>
          <th>Cost</th>
        </tr>
        <tr>
          <th>Strength</th>
          <input type="number" v-model="baseStr" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Dexterity</th>
          <input type="number" v-model="baseDex" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Constitution</th>
          <input type="number" v-model="baseCon" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Intelligence</th>
          <input type="number" v-model="baseInt" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Wisdom</th>
          <input type="number" v-model="baseWis" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Charisma</th>
          <input type="number" v-model="baseCha" min=0 max=15>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
  </div>
</template>

<script>
  export default{
    name: 'pointBuy',
    data(){
      return{
        totalPoints: 27,
        remainingPoints: 27,
        baseStr: 8,
        baseDex: 8,
        baseCon: 8,
        baseInt: 8,
        baseWis: 8,
        baseCha: 8
      }
    },
    methods: {

    },
  }
</script>

<style scoped>
body{
  background-image: url("../assets/parchment.jpg");
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