<template>
  <div>
    <p>Welcome to the character creator! Here you can choose the amount of D6 to roll (if your DM varies from the standard 4d6) and then you can put your rolls in the desired stat. You also have the option to use a point buy system to create your character.</p>
    <label>D6 Amount: <input type="number" min="3" max="15" v-model="times"/></label>
    <br/>
    <button v-on:click="diceRoll()">Sum of the three highest from {{times}} D6</button>
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
      <tr id="table-rolls">
        <th>Dice Results</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
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
        times: 4,
        rolls: [],
        sums: [],
        modifiers: [],
        rollObjs: []
      }
    },
    methods: {
      // emptyRolls: function(){
      //   this.sums.length = 0;
      //   let resultRollSpan = document.getElementById('statRolls');
      //   if(resultRollSpan.childNodes.length > 0){
      //     for (let i = 0; i < resultRollSpan.childNodes.length; i++) {
      //       resultRollSpan.childNodes[i].remove();
      //     }
      //   }
      // },
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
      // displaySums: function(){
      //   let resultRollSpan = document.getElementById('statRolls');
      //   resultRollSpan.append(this.sums);
      // },
      displayResults: function(){
        // let tableRolls = document.getElementById('table-rolls');
        // for (var i = 1; i < tableRolls.children.length; i++) {
        //   tableRolls.children[i].append( this.rolls);
        // }
        let tableSum = document.getElementById('table-sum');
        for (let i = 1; i < tableSum.children.length; i++) {
          tableSum.children[i].append(this.sums[i + 1]);
        }
        let tableMod = document.getElementById('table-mod');
        for (let i = 1; i < tableMod.children.length; i++) {
          tableMod.children[i].append(this.modifiers[i + 1]);
        }
      },
      displayRolls: function(rolls){
        let tableRolls = document.getElementById('table-rolls');
        for (var i = 1; i < tableRolls.children.length; i++) {
        }
      },
      diceRoll: function(){
        this.emptyTable();
        this.sums.length = 0;
        for (let i = 0; i < 6; i++) {
          let rollObj = {
            rolls: [],
            sum: 0,
            modifier: 0
          }
          for (let j = 0; j < this.times; j++) {
            let roll = Math.floor(Math.random() * 6 + 1);
            rollObj.rolls.push(roll);
            this.rolls.push(roll);
          }
          this.rollObjs.push(rollObj);
        }
        this.diceSum();
        this.displayResults();
      },
      diceSum: function(){
        for (let i = 0; i < this.rollObjs.length; i++) {
          let sum = 0;
          let tempRolls = [];
          tempRolls = [...this.rollObjs[i].rolls];
          for (let j = 0; j < 3; j++) {
            let highest = Math.max(...tempRolls);
            let spot = tempRolls.indexOf(highest);
            sum += highest;
            tempRolls.splice(spot, 1);
            this.rollObjs[i].sum = sum;
          }
        }
        for (var i = 0; i < this.rollObjs.length; i++) {
          console.log(this.rollObjs[i].rolls);
          console.log(this.rollObjs[i].sum);
        }
        // this.findMods();
      },
      findMods: function(){
        this.modifiers.length = 0;
        let mod = 0;
        for (let i = 0; i < this.sums.length; i++) {
          mod = Math.floor((this.sums[i] - 10)/2);
          this.modifiers.push(mod);
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
</style>