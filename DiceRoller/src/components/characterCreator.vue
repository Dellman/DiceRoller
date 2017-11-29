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
      <tr>
        <th id="table-rolls">Dice Results</th>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <th id="table-sum">Stat number (sum)</th>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <th id="table-mod">Modifier</th>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
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
        rollsArray: [],
        sums: [],
        modifiers: []
      }
    },
    methods: {
      emptyRolls: function(){
        this.sums.length = 0;
        let resultRollSpan = document.getElementById('statRolls');
        if(resultRollSpan.childNodes.length > 0){
          for (let i = 0; i < resultRollSpan.childNodes.length; i++) {
            resultRollSpan.childNodes[i].remove();
          }
        }
      },
      displaySums: function(){
        let resultRollSpan = document.getElementById('statRolls');
        resultRollSpan.append(this.sums);
      },
      displayResults: function(){
        let tableRolls = document.getElementById('table-rolls');
        let tableSum = document.getElementById('table-sum');
        let tableMod = document.getElementById('tableMod');
      },
      diceRoll: function(){
        this.emptyRolls();
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < this.times; j++) {
            let roll = Math.floor(Math.random() * 6 + 1);
            this.rollsArray.push(roll);
          }
          this.diceSum();
        }
        this.displaySums();
      },
      diceSum: function(){
        let sum = 0;
        for (let i = 0; i < 3; i++) {
          let highest = Math.max(...this.rollsArray);
          let spot = this.rollsArray.indexOf(highest);
          sum += highest;
          this.rollsArray.splice(spot, 1);
        }
        this.sums.push(sum);
        this.findMods(sum);
      },
      findMods: function(sum){
        let mod = Math.floor((sum - 10) / 2);
        if(mod > 0){
          mod = "+" + mod;
        }
        this.modifiers.push(mod);
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