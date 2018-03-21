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
    <label>Normal: <input type="radio"  checked v-model="rollType" value="normal"></label>
    <br />
    <label>Advantage: <input type="radio" id="advantage"  v-model="rollType" value="advantage"></label>
    <br />
    <label>Disadvantage: <input type="radio" id="disadvantage" v-model="rollType" value="disadvantage"></label>

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

    <ul>
      <li v-for="roll in rolls" :key="roll.id" v-bind:class="{'nat1': roll.isNat1, 'nat20': roll.isNat20, 'strike': roll.lower}">  
        
        {{ roll }} <!-- Whole object -->
        {{ roll.modRoll }} <!-- Final value -->

      </li>

    </ul>

    <span>Total: {{ total }}</span>
    
  </div>
</template>

<script>
export default {
  name: 'Roller',
  data () {
    return {
      rollObj: {
        orgRoll: "",
        id: "",
        dice: "",
        modRoll: "",
        isNat1: false,
        isNat20: false,
        lower: false,
      },  
      times: 1,
      modifier: 0,
      rollType: "normal",
      rolls: [],
      total: 0
      
    }
  },
  methods: {
    emptySpan: function(dice){ // will become unncessary
      let rollSpan = document.getElementById('rolls');
      if(rollSpan.childNodes.length > 0){
        for (let i = 0; i < rollSpan.childNodes.length; i++) {
          rollSpan.childNodes[i].remove();
        }
        return this.emptySpan();
        // I am not sure if there is a better/more proper way to do this
      }
    },
    roll: function(dice){
      this.emptySpan();
      this.rolls = [];
      const rollDice = (multiplier) =>{
        for (let i = 0; i < this.times * multiplier; i++) {
          this.createRoll(Math.floor(Math.random() * dice + 1), i, dice);
        }
      }
      this.rollType === "advantage" || this.rollType === "disadvantage" ? rollDice(2) : rollDice(1);
    },
    // Could move all of this up
    createRoll: function(roll, id, dice){ // needs finalized/cleaned up
      // this.rollObj.orgRoll = parseInt(roll);
      // this.rollObj.id = parseInt(id);
      // this.rollObj.dice = parseInt(dice);
      // this.rollObj.modRoll = parseInt(roll + parseInt(this.modifier));
      let rollO = {
        orgRoll: parseInt(roll),
        id: parseInt(id),
        dice: parseInt(dice),
        modRoll: parseInt(roll + parseInt(this.modifier))
      };
      this.rollObj = rollO;
      // console.log(rollO);
      // console.log(this.rollObj);
      // console.log(this.rollObj.id);
      // this.rolls.push(this.rollObj.modRoll); //adding just the mod roll works
      this.rolls.push(this.rollObj); // replaces previously stored rollObj (closure issue?)
      this.createSpan();  
    },
    createSpan: function(){ // will become unncessary
      let rollSpan = document.getElementById('rolls');
      let span = document.createElement("span");
      span.className="roll-span";
      span.id=this.rollObj.id;
      span.style.padding = ".05em";
      rollSpan.append(span);
      this.display(span);
    },
    display: function(span){ // will become mostly unncessary/broken up
      let colorSpan = document.createElement('span');

      const addComma = () => {
          if ((this.times > 1 && span.id < this.times - 1) || (this.rollType === "advantage" && span.id != this.times * 2 - 1) || this.rollType === "disadvantage" && span.id != this.times * 2 - 1) {
            span.append(",");
          }
      }
      //on a D20 make the span red for critical failures and green for critical success
      if(this.rollObj.orgRoll == 1 && this.rollObj.dice == 20){
        colorSpan.style.color = "red";
        this.rollObj.isNat1 = true; // keep when refactored
        colorSpan.append(this.rollObj.modRoll);
        span.append(colorSpan);
        addComma();
      }
      else if(this.rollObj.orgRoll == 20 && this.rollObj.dice == 20){
        colorSpan.style.color = "green";
        this.rollObj.isNat20 = true; // keep when refactored
        colorSpan.append(this.rollObj.modRoll);
        span.append(colorSpan);
        addComma();
      }
      else{ // returns color back to black
        span.append(this.rollObj.modRoll);
        this.rollObj.isNat1 = false; // keep when refactored
        this.rollObj.isNat20 = false; // keep when refactored
        addComma();
      }
      if (this.rollType === "advantage" || this.rollType === "disadvantage") { // keep when refactored
        this.lineThrough();
      }
      this.addRolls(); // keep when refactored
    },
    addRolls: function(){ // add to computed when done?
      this.total = 0;
      if(this.times == 1){
        // this.total = this.rolls.modRoll; // When the roll is an object
        this.total = this.rollObj.modRoll;
      }
      else{
        // should I keep this or use (and figure out) reduce with the object 
        // currently adds the last roll which coincides with the main bug
        for (let i = 0; i < this.rolls.length; i++) {
          this.total += this.rolls[i].modRoll;
        }

        // sum up the objects in the array to get the sum value (doesn't work past two, )
        // currently adds the last roll which coincides with the main bug        
        // this.rolls.reduce((total, roll) => {
        //   this.total = total.modRoll + roll.modRoll
        // });
      }
      
    },
    lineThrough: function(){
      const strike = (id) =>{
        let roll = document.getElementById(id);
        let rollSpot = this.rolls[id];
        // rollSpot.style.textDecoration = "line-through";
        roll.style.textDecoration = "line-through";
      }
      // check every other value if it is larger than the next value
      // if not, do a line through that value, otherwise put the line through the next number
      for (let i = 0; i < this.rolls.length; i += 2) {
        if(this.rolls[i] < this.rolls[i + 1]){
          if (this.rollType === "advantage") {            
            strike(i);
          }
          else if(this.rollType === "disadvantage"){
            strike(i + 1);
          }
        }
        else if(this.rolls[i] > this.rolls[i + 1]){
          if (this.rollType === "advantage") {
            strike(i + 1);
          }
          else if(this.rollType === "disadvantage"){
            strike(i);
          }
        }
      }
    }
  },
  computed: {
    addRollsComp: function(){
    //   console.log(...this.rolls.modRoll);
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

#rolls, #rolls ul li{
  display: inline;
}
.nat1{
  color: red;
}
.nat20{
  color: green;
}
.strike{
  text-decoration: line-through;
}
</style>