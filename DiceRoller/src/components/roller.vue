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
      <li v-for="roll in rolls" :key="roll.id" v-bind:class="{'nat1': roll.isNat1, 'nat20': roll.isNat20, 'strike': roll.strike}">  
        
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
      times: 1,
      modifier: 0,
      rollType: "normal",
      rolls: [],
      total: 0
    }
  },
  methods: {
    roll: function(dice){
      this.rolls = [];
      const rollDice = (multiplier) =>{
        for (let i = 0; i < this.times * multiplier; i++) {
          let roll = parseInt(Math.floor(Math.random() * dice + 1));
          let rollO = {
            orgRoll: roll,
            id: parseInt(i),
            dice: parseInt(dice),
            modRoll: parseInt(roll + parseInt(this.modifier)),
            isNat1: false,
            isNat20: false,
            strike: false
          };
          this.rolls.push(rollO);
        }
      }
      //roll twice as many times if rolling on advantage or disadvantage
      this.rollType === "advantage" || this.rollType === "disadvantage" ? rollDice(2) : rollDice(1);
      this.display();      
    },
    display: function(){
      //on a D20 make the properties for isNat1 or isNat20 true
      for(let i = 0; i < this.rolls.length; i++){
        let roll = this.rolls[i];
        if(roll.dice === 20 && roll.orgRoll === 1){
          roll.isNat1 = true;
        }
        else if(roll.dice === 20 && roll.orgRoll === 20){
          roll.isNat20 = true;
        }
        else{ // returns color back to black
          roll.isNat1 = false;
          roll.isNat20 = false;
        }
      }
      if (this.rollType === "advantage" || this.rollType === "disadvantage") {
        this.lineThrough();
      }
      else{
        this.addRolls();        
      }
    },
    lineThrough: function(){
      // loop through every other roll to see if it is lower or higher than the next number (based on rollType)
      // make the strike property true for the lower value on advantage and the higher value on disadvantage
      for(let i = 0; i < this.rolls.length; i += 2) {
        const roll = this.rolls[i];
        const nextRoll = this.rolls[i+1];
        if(roll.modRoll < nextRoll.modRoll || roll.modRoll === nextRoll.modRoll){
          if(this.rollType === "advantage") {            
            roll.strike = true;   
          }
          else if(this.rollType === "disadvantage"){
            nextRoll.strike = true;
          }
        }
        else if(roll.modRoll > nextRoll.modRoll){
          if (this.rollType === "advantage") {
            nextRoll.strike = true;
          }
          else if(this.rollType === "disadvantage"){
            roll.strike = true;
          }
        }
      }
      this.addRolls();
    }, 
    addRolls: function(){ // add to computed when done?
      this.total = 0;
      if(this.times === 1){
        this.total = this.rolls[0].modRoll;
      }
      else{
        // should I keep this or use (and figure out) reduce with the object
        for (let i = 0; i < this.rolls.length; i++) {
          if(this.rolls[i].strike === false){
            this.total += this.rolls[i].modRoll;
          }
        }
      }
    }
  },
  computed: {
    // addRolls: function(){
    //   this.total = 0;
    //   if(this.times === 1){
    //     this.total = this.rolls[0].modRoll;
    //   }
    //   else{
    //     // should I keep this or use (and figure out) reduce with the object
    //     for (let i = 0; i < this.rolls.length; i++) {
    //       if(this.rolls[i].strike === false){
    //         this.total += this.rolls[i].modRoll;
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style>
body{
  background-image: url("../assets/parchment.jpg");
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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