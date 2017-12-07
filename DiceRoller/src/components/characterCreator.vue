<template>
  <div>
    <p>Welcome to the character creator! Here you can choose how many D6 to roll, any additions to the sum (if you are doing a 2d6 + 6), and how many stats to roll. The sum will always be the highest three numbers (or less if you use less than three dice) and the "bonus" will be added at the end. The defaults are set up for the standard 4d6.</p>
    <!-- <button>Standard 4D6</button> -->
    <br />
    <label>D6 Amount: <input type="number" min="1" max="8" v-model="amountOfD6"/></label>
    <br />
    <label>Sum Bonus: <input type="number" min="0" max="12" v-model="sumBonus"></label>
    <br />
    <label >Amount of Stats: <input type="number" min="1" max="12" v-model="amountOfStats"></label>
    <br/>
    <button v-on:click="diceRoll()">Roll!</button>
    <br/>
    <span id="statRolls"></span>
    <table>
      <thead>
        Roll Results
      </thead>
      <tr id="tableNumbers">
        <th></th>
      </tr>
      <tr id="tableSum">
        <th>Stat number (sum)</th>
      </tr>
      <tr id="tableMod">
        <th>Modifier</th>
      </tr>
    </table>
  </div>
</template>

<script>
  export default{
    name: 'Creator',
    data(){
      return{
        amountOfD6: 4,
        sumBonus: 0,
        amountOfStats: 6,
        rollObjs: []
      }
    },
    methods: {
      emptyTable: function(){
        const emptyRows = (id) =>{
          let parent = document.getElementById(id);
          while(parent.childNodes.length > 1){
            parent.removeChild(parent.lastChild);
          }
        }
        emptyRows('tableNumbers');
        emptyRows('tableSum');
        emptyRows('tableMod');
      },
      displayResults: function(){
        const appendResults = (id, property) => {
          let loc = document.getElementById(id);
          for (let i = 0; i < this.amountOfStats; i++) {
            loc.childNodes[i + 1].append(this.rollObjs[i][property])
          }
        }
        appendResults('tableSum', 'sum');
        appendResults('tableMod', 'modifier');
      },
      createTableRows: function(){
        let th = document.createElement('th');
        let td = document.createElement('td');

        const createElements = (element, id) => {
          for (let i = 1; i < parseInt(this.amountOfStats) + 1; i++) {
            let createdEle = document.createElement(element);
            let parent = document.getElementById(id);
            if (element == 'th') {
              createdEle.textContent = i;
            }
            // else{
            //   this.displayResults();
            // }
            parent.append(createdEle);
          }
        }
        createElements('th', 'tableNumbers');
        createElements('td', 'tableSum');
        createElements('td', 'tableMod');
        this.displayResults();
      },
      findMods: function(){
        let mod = 0;
        for (let i = 0; i < this.rollObjs.length; i++) {
          mod = Math.floor((this.rollObjs[i].sum - 10)/2);
          if(mod > 0){
            mod = "+" + mod;
          }
          this.rollObjs[i].modifier = mod;
        }
        this.createTableRows();
      },
      diceSum: function(){
        for (let i = 0; i < this.rollObjs.length; i++) {
          let sum = 0 + parseInt(this.sumBonus);
          let tempRolls = [];
          tempRolls = [...this.rollObjs[i].rolls];
          let maxRolls = 3;
          if (this.amountOfD6 < 3) {
            maxRolls = this.amountOfD6;
          }
          for (let j = 0; j < maxRolls; j++) {
            let highest = Math.max(...tempRolls);
            let spot = tempRolls.indexOf(highest);
            sum += highest;
            tempRolls.splice(spot, 1);
            this.rollObjs[i].sum = sum;
          }
        }
        this.findMods();
      },
      diceRoll: function(){
        this.emptyTable();
        this.rollObjs.length = 0;
        for (let i = 0; i < this.amountOfStats; i++) {
          let rollObj = {
            rolls: [],
            sum: 0,
            modifier: 0
          }
          for (let j = 0; j < this.amountOfD6; j++) {
            let roll = Math.floor(Math.random() * 6 + 1);
            rollObj.rolls.push(roll);
          }
          this.rollObjs.push(rollObj);
        }
        this.diceSum();
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