<template>
  <div>
      <h2>Point Buy System</h2>
      <label>Available Points:<input type="number" v-model="totalPoints" v-on:change="setRemainingPoints()"></label>
      <!-- Remaining Points: <input type="text" readonly v-model="remainingPoints"> -->
      Remaining Points: <input type="text" readonly id="remainingPoints" v-model="remainingPoints.remainingPoints">
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
          <td><input type="number" v-model="str.base" min=0 max=15 v-on:change="calculateTotalScore(str)"></td>
          <td></td>
          <td>{{str.final}}</td>
          <td>{{str.mod}}</td>
          <td></td>
        </tr>
        <tr>
          <th>Dexterity</th>
          <td><input type="number" v-model="dex.base" min=0 max=15 v-on:change="calculateTotalScore(dex)"></td>
          <td></td>
          <td>{{dex.final}}</td>
          <td>{{dex.mod}}</td>
          <td></td>
        </tr>
        <tr>
          <th>Constitution</th>
          <td><input type="number" v-model="con.base" min=0 max=15 v-on:change="calculateTotalScore(con)"></td>
          <td></td>
          <td>{{con.final}}</td>
          <td>{{con.mod}}</td>
          <td></td>
        </tr>
        <tr>
          <th>Intelligence</th>
          <td><input type="number" v-model="int.base" min=0 max=15 v-on:change="calculateTotalScore(int)"></td>
          <td></td>
          <td>{{int.final}}</td>
          <td>{{int.mod}}</td>
          <td></td>
        </tr>
        <tr>
          <th>Wisdom</th>
          <td><input type="number" v-model="wis.base" min=0 max=15 v-on:change="calculateTotalScore(wis)"></td>
          <td></td>
          <td>{{wis.final}}</td>
          <td>{{wis.mod}}</td>
          <td></td>
        </tr>
        <tr>
          <th>Charisma</th>
          <td><input type="number" v-model="cha.base" name="cha" min=0 max=15 v-on:change="calculateTotalScore(cha)"></td>
          <td></td>
          <td>{{cha.final}}</td>
          <td>{{cha.mod}}</td>
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
        remainingPoints: {
          maxPoints: 27,
          remainingPoints: 27,
          pointsSpent: 0
        },
        str: {
          base: 8,
          final: 8,
          mod: -1
        },
        dex: {
          base: 8,
          final: 8,
          mod: -1
        },
        con: {
          base: 8,
          final: 8,
          mod: -1
        },
        int: {
          base: 8,
          final: 8,
          mod: -1
        },
        wis: {
          base: 8,
          final: 8,
          mod: -1
        },
        cha: {
          base: 8,
          final: 8,
          mod: -1
        }
      }
    },
    methods: {
      setRemainingPoints: function(){
        let remainingPoints = document.getElementById('remainingPoints');
        // remainingPoints.value = totalPoints;
        return this.totalPoints;
      },
      calculateTotalScore: function(stat){
        // console.log(stat);
        stat.final = parseInt(stat.base) + 0;
        this.calculateModifier(stat);
      },
      calculateModifier: function(stat){
        stat.mod = Math.floor((stat.final-10)/2);
        if(stat.mod > 0){
          stat.mod = "+" + stat.mod;
        }
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
body{
  background-image: url("../assets/parchment.jpg");
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
table{
  margin: 0 auto;
  border: 1px solid black;
  border-collapse: collapse;
}
th, td{
  border: 1px solid black;
  border-collapse: collapse;
}
p{
  display: block;
  margin: .5em auto;
  text-align: left;
  width: 50%;
}
thead{
  text-align: center;
  display: block;
  margin: 0 auto;
  vertical-align: middle;
}
td input{
  border: 0;
  margin: 0;
  padding: 0;
}
</style>