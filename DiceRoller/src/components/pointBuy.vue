<template>
  <div>
      <h2>Point Buy System</h2>
      <label>Available Points:<input type="number" v-model="totalPoints" v-on:change="setMaxRemainingPoints(totalPoints)"></label>
      Remaining Points: <input type="text" readonly v-model="remainingPoints.remaining">
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
          <td><input type="number" v-model="str.base" min=8 max=15 v-on:change="calculateTotalScore(str)"></td>
          <td></td>
          <td>{{str.final}}</td>
          <td>{{str.mod}}</td>
          <td>{{str.cost}}</td>
        </tr>
        <tr>
          <th>Dexterity</th>
          <td><input type="number" v-model="dex.base" min=8 max=15 v-on:change="calculateTotalScore(dex)"></td>
          <td></td>
          <td>{{dex.final}}</td>
          <td>{{dex.mod}}</td>
          <td>{{dex.cost}}</td>
        </tr>
        <tr>
          <th>Constitution</th>
          <td><input type="number" v-model="con.base" min=8 max=15 v-on:change="calculateTotalScore(con)"></td>
          <td></td>
          <td>{{con.final}}</td>
          <td>{{con.mod}}</td>
          <td>{{con.cost}}</td>
        </tr>
        <tr>
          <th>Intelligence</th>
          <td><input type="number" v-model="int.base" min=8 max=15 v-on:change="calculateTotalScore(int)"></td>
          <td></td>
          <td>{{int.final}}</td>
          <td>{{int.mod}}</td>
          <td>{{int.cost}}</td>
        </tr>
        <tr>
          <th>Wisdom</th>
          <td><input type="number" v-model="wis.base" min=8 max=15 v-on:change="calculateTotalScore(wis)"></td>
          <td></td>
          <td>{{wis.final}}</td>
          <td>{{wis.mod}}</td>
          <td>{{wis.cost}}</td>
        </tr>
        <tr>
          <th>Charisma</th>
          <td><input type="number" v-model="cha.base" name="cha" min=8 max=15 v-on:change="calculateTotalScore(cha)"></td>
          <td></td>
          <td>{{cha.final}}</td>
          <td>{{cha.mod}}</td>
          <td>{{cha.cost}}</td>
        </tr>
      </table>
      <select v-for="race in races" id="races" name="">
        <option>{{race.name}}</option>
      </select>
  </div>
</template>

<script>
  export default{
    name: 'pointBuy',
    data(){
      return{
        totalPoints: 27,
        remainingPoints: {
          max: 27,
          remaining: 27,
          spent: 0
        },
        str: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        dex: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        con: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        int: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        wis: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        cha: {
          base: 8,
          final: 8,
          mod: -1,
          cost: 0
        },
        totalCost: 0
      }
    },
    methods: {
      callAJAX: function(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              console.log('responseText:' + xmlhttp.responseText);
              try {
                  var data = JSON.parse(xmlhttp.responseText);
              } catch(err) {
                  console.log(err.message + " in " + xmlhttp.responseText);
                  return;
              }
              callback(data);
          }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
      },
      setMaxRemainingPoints: function(points){
        this.remainingPoints.max = points;
        this.setRemainingPoints();
      },
      setRemainingPoints: function(){
        this.remainingPoints.spent = this.str.cost + this.dex.cost + this.con.cost + this.int.cost + this.wis.cost + this.cha.cost;
        this.remainingPoints.remaining = parseInt(this.remainingPoints.max) - this.remainingPoints.spent;
      },
      calculateTotalScore: function(stat){
        stat.final = parseInt(stat.base) + 0;
        this.calculateModifier(stat);
      },
      calculateModifier: function(stat){
        stat.mod = Math.floor((stat.final-10)/2);
        if(stat.mod > 0){
          stat.mod = "+" + stat.mod;
        }
        this.calculateCost(stat);
      },
      calculateCost: function(stat){
        let cost = stat.base - 8;
        stat.cost = cost;
        this.setRemainingPoints();
      }
    }
  }
</script>

<style>
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