<template>
  <div>
    <h2>Welcome!</h2>
    <span><button v-on:click="roll(4)">D4</button>
    <button v-on:click="roll(5)">D5</button>
    <button v-on:click="roll(6)">D6</button>
    <button v-on:click="roll(8)">D8</button>
    <button v-on:click="roll(10)">D10</button>
    <button v-on:click="roll(12)">D12</button>
    <button v-on:click="roll(20)">D20</button>
    <button v-on:click="roll(100)">D100</button></span>
    <br />
    <label>Advantage: <input type="checkbox" id="advantage"></label>
    <!-- <label>Strength: <input type="radio"></label>
    <label>Dexterity: <input type="radio"></label>
    <label>Constitution: <input type="radio"></label>
    <label>Intelligence: <input type="radio"></label>
    <label>Wisdom: <input type="radio"></label>
    <label>Charisma: <input type="radio"></label> -->
    <br />
    <label>Roll(s): <input type="number" v-model="times" min="1" max="15"></label>
    <br />
    <label>Modifier: <input type="number" v-model="modifier" min="0" max="15"></label>
    <br />
    <span id="rolls"></span>
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
      let advantage = document.getElementById('advantage');
      const rollDice = (multiplier) =>{
        for (let i = 0; i < this.times * multiplier; i++) {
          this.storeRolls(Math.floor(Math.random() * dice + 1), i, dice);
        }
      }
      !advantage.checked ? rollDice(1) : rollDice(2);
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
      let advantage = document.getElementById('advantage');
      const addComma = () => {
          if ((this.times > 1 && span.id < this.times - 1) || (advantage.checked && span.id != this.times * 2 - 1)) {
            span.append(",");
          }
      }
      //on a D20 make the span red for critical failures and green for critical success
      if(this.rollObj.orgRoll == 1 && this.rollObj.dice == 20){
        span.append(this.rollObj.modRoll);
        addComma();
        span.style.color="red";
      }
      else if(this.rollObj.orgRoll == 20 && this.rollObj.dice == 20){
        span.append(this.rollObj.modRoll);
        span.style.color="green";
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

      for (let i = 0; i < rolls.length; i++) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
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
</style> -->