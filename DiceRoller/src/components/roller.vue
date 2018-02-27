<template>
  <div>
    <h1>Dice Roller</h1>
    <p>Welcome to the dice roller! Here you can roll dice for whatever reason! Rolling on advantage means rolling twice and taking the higher value, while disadvantage means taking the lower value (the ignored value will have a strike-through). You can also roll multiple times by changing the roll number, and the modifier will be added to the original roll. A green number means a critical success when using the D20, while a red means a ciritcal failure. If you are looking to use this to simply create a character, check the <router-link to="/Creator">character creator page!</router-link></p>
    <span>
      <button v-on:click="roll(4)">D4</button>
      <button v-on:click="roll(5)">D5</button>
      <button v-on:click="roll(6)">D6</button>
      <button v-on:click="roll(8)">D8</button>
      <button v-on:click="roll(10)">D10</button>
      <button v-on:click="roll(12)">D12</button>
      <button v-on:click="roll(20)">D20</button>
      <button v-on:click="roll(100)">D100</button>
    </span>
    <br />
    <label>Normal: <input type="radio" name="vantages" checked v-model="rollType" value="normal"></label>
    <br />
    <label>Advantage: <input type="radio" id="advantage" name="vantages" v-model="rollType" value="advantage"></label>
    <br />
    <label>Disadvantage: <input type="radio" id="disadvantage" name="vantages" v-model="rollType" value="disadvantage"></label>

    <!-- <label>Strength: <input type="radio" name="rollType"></label>
    <label>Dexterity: <input type="radio" name="rollType"></label>
    <label>Constitution: <input type="radio" name="rollType"></label>
    <label>Intelligence: <input type="radio" name="rollType"></label>
    <label>Wisdom: <input type="radio" name="rollType"></label>
    <label>Charisma: <input type="radio" name="rollType"></label> -->

    <br />
    <label>Roll(s): <input type="number" v-model="times" min="1" max="15"></label>
    <br />
    <label>Modifier: <input type="number" v-model="modifier" min="-20" max="20"></label>
    <br />
    <span id="rolls"></span>

    <!-- <p>{{ rolls }}</p> -->
    
  </div>
</template>

<script>
export default {
  name: 'Roller',
  data () {
    return {
      rollObj: {},
      times: 1,
      modifier: 0,
      rollType: "normal"
    }
  },
  methods: {
    emptySpan: function(dice){
      let rollSpan = document.getElementById('rolls');
      if(rollSpan.childNodes.length > 0){
        for (let i = 0; i < rollSpan.childNodes.length; i++) {
          rollSpan.childNodes[i].remove();
        }
        return this.emptySpan();
        // I am not sure if there is a better/more proper way to do this
      }
      // if(rollSpan.childNodes.length > 0){
      //   this.emptySpan();
      // }
    },
    roll: function(dice){
      this.emptySpan();
      const rollDice = (multiplier) =>{
        for (let i = 0; i < this.times * multiplier; i++) {
          this.storeRolls(Math.floor(Math.random() * dice + 1), i, dice);
        }
      }
      this.rollType === "advantage" || this.rollType === "disadvantage" ? rollDice(2) : rollDice(1);
    },
    // Could move all of this up
    storeRolls: function(roll, id, dice){
      this.rollObj.orgRoll = parseInt(roll);
      this.rollObj.id = parseInt(id);
      this.rollObj.dice = parseInt(dice);
      this.rollObj.modRoll = parseInt(roll + parseInt(this.modifier));
      this.createSpan();
    },
    createSpan: function(){
      let rollSpan = document.getElementById('rolls');
      let span = document.createElement("span");
      span.className="roll-span";
      span.id=this.rollObj.id;
      span.style.padding = ".05em";
      rollSpan.append(span);
      this.display(span);
    },
    display: function(span){
      let colorSpan = document.createElement('span');

      const addComma = () => {
          if ((this.times > 1 && span.id < this.times - 1) || (this.rollType === "advantage" && span.id != this.times * 2 - 1) || this.rollType === "disadvantage" && span.id != this.times * 2 - 1) {
            span.append(",");
          }
      }
      //on a D20 make the span red for critical failures and green for critical success
      if(this.rollObj.orgRoll == 1 && this.rollObj.dice == 20){
        colorSpan.style.color = "red";
        colorSpan.append(this.rollObj.modRoll);
        span.append(colorSpan);
        addComma();
      }
      else if(this.rollObj.orgRoll == 20 && this.rollObj.dice == 20){
        colorSpan.style.color = "green";
        colorSpan.append(this.rollObj.modRoll);
        span.append(colorSpan);
        addComma();
      }
      else{
        span.append(this.rollObj.modRoll);
        addComma();
      }
      if (advantage.checked || disadvantage.checked) {
        this.lineThrough();
      }
    },
    lineThrough: function(){
      let rollsSpanChildren = document.getElementById('rolls').childNodes;
      let rolls = [];
      for (var i = 0; i < rollsSpanChildren.length; i++) {
        rolls.push(parseInt(rollsSpanChildren[i].textContent));
      }

      const strike = (id) =>{
        let roll = document.getElementById(id);
        roll.style.textDecoration = "line-through";
      }
      // check every other value if it is larger than the next value
      // if not, do a line through that value, otherwise put the line through the next number
      for (let i = 0; i < rolls.length; i += 2) {
        if(rolls[i] < rolls[i + 1]){
          if (advantage.checked) {
            strike(i);
          }
          else if(disadvantage.checked){
            strike(i + 1);
          }
        }
        else if(rolls[i] > rolls[i + 1]){
          if (advantage.checked) {
            strike(i + 1);
          }
          else if(disadvantage.checked){
            strike(i);
          }
        }
      }
    }
  }
}
</script>

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