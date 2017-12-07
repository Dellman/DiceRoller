<template>
  <div>
    <p>Welcome to the character creator! Here you can choose the amount of D6 to roll (if your DM varies from the standard 4d6) and then you can put your rolls in the desired stat. You also have the option to use a point buy system to create your character.</p>
    <button>Standard 4D6</button>
    <br />
    <label>D6 Amount: <input type="number" min="1" max="8" v-model="numberOfD6"/></label>
    <br />
    <label>Sum Bonus: <input type="number" min="0" max="12" v-model="sumBonus"></label>
    <br />
    <label >Amount of Stats: <input type="number" min="1" max="12" v-model="numberOfStats"></label>
    <br/>
    <button v-on:click="diceRoll()">Sum of the three highest from {{numberOfD6}} D6</button>
    <br/>
    <span id="statRolls"></span>
    <table>
      <thead>
        Roll Results
      </thead>
      <tr>
        <th></th>
        <th>Stat 1</th>
        <th>Stat 2</th>
        <th>Stat 3</th>
        <th>Stat 4</th>
        <th>Stat 5</th>
        <th>Stat 6</th>
      </tr>
      <!-- <tr id="table-rolls">
        <th>Dice Results</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr> -->
      <tr id="table-sum">
        <th>Stat number (sum)</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr id="table-mod">
        <th>Modifier</th>
        <td></td>
        <td></td>
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
    name: 'Creator',
    data(){
      return{
        numberOfD6: 4,
        sumBonus: 0,
        numberOfStats: 6,
        rolls: [],
        sums: [],
        modifiers: [],
        rollObjs: []
      }
    },
    methods: {
      emptyTable: function(){
        let tableSum = document.getElementById('table-sum');
        for (let i = 1; i < tableSum.children.length; i++) {
          tableSum.children[i].textContent = "";
        }
        let tableMod = document.getElementById('table-mod');
        for (let i = 1; i < tableMod.children.length; i++) {
          tableMod.children[i].textContent = "";
        }
      },
      displayResults: function(){
        // let tableRolls = document.getElementById('table-rolls');
        // for (let i = 1; i < tableRolls.children.length; i++) {
        //   tableRolls.children[i].append(this.rollObjs[i-1].rolls);
        // }
        let tableSum = document.getElementById('table-sum');
        for (let i = 1; i < tableSum.children.length; i++) {
          tableSum.children[i].append(this.rollObjs[i - 1].sum);
        }
        let tableMod = document.getElementById('table-mod');
        for (let i = 1; i < tableMod.children.length; i++) {
          tableMod.children[i].append(this.rollObjs[i - 1].modifier);
        }
      },
      displayRolls: function(rolls){
        let tableRolls = document.getElementById('table-rolls');
        for (var i = 1; i < tableRolls.children.length; i++) {
        }
      },
      diceRoll: function(){
        this.emptyTable();
        this.rollObjs.length = 0;
        for (let i = 0; i < this.numberOfStats; i++) {
          let rollObj = {
            rolls: [],
            sum: 0,
            modifier: 0
          }
          for (let j = 0; j < this.numberOfD6; j++) {
            let roll = Math.floor(Math.random() * 6 + 1);
            rollObj.rolls.push(roll);
          }
          this.rollObjs.push(rollObj);
        }
        this.diceSum();
        this.displayResults();
      },
      diceSum: function(){
        for (let i = 0; i < this.rollObjs.length; i++) {
          let sum = 0 + parseInt(this.sumBonus);
          let tempRolls = [];
          tempRolls = [...this.rollObjs[i].rolls];
          let maxRolls = 3;
          if (this.numberOfD6 < 3) {
            maxRolls = this.numberOfD6;
          }
          for (let j = 0; j < maxRolls; j++) {
            console.log(maxRolls);
            let highest = Math.max(...tempRolls);
            let spot = tempRolls.indexOf(highest);
            sum += highest;
            tempRolls.splice(spot, 1);
            this.rollObjs[i].sum = sum;
          }
        }
        this.findMods();
      },
      findMods: function(){
        let mod = 0;
        for (let i = 0; i < this.rollObjs.length; i++) {
          mod = Math.floor((this.rollObjs[i].sum - 10)/2);
          this.rollObjs[i].modifier = mod;
        }
      }
    },
  }
</script>

<style scoped>
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
</style>