<template>
  <div>
    <p>Welcome to the character creator! Here you can choose the amount of D6 to roll (if your DM varies from the standard 4d6) and then you can put your rolls in the desired stat. You also have the option to use a point buy system to create your character.</p>
    <label>D6 Amount: <input type="number" min="3" max="15" v-model="times"/></label>
    <br/>
    <button v-on:click="diceRoll()">Roll {{times}} D6</button>
    <br/>
    <span id="statRolls"></span>
  </div>
</template>

<script>
  export default{
    name: 'Creator',
    data(){
      return{
        times: 4,
        rollsArray: [],
        sums: []
      }
    },
    methods: {
      emptyRolls: function(){
        this.rollsArray.length = 0;
        let resultRollSpan = document.getElementById('statRolls');
        if(resultRollSpan.childNodes.length > 0){
          for (let i = 0; i < resultRollSpan.childNodes.length; i++) {
            resultRollSpan.childNodes[i].remove();
          }
        }
      },
      // displayRolls: function(){
      //   let resultRollSpan = document.getElementById('statRolls');
      //   resultRollSpan.append(this.rollsArray);
      // },
      displaySums: function(){
        let resultRollSpan = document.getElementById('statRolls');
        resultRollSpan.append(this.sums);
      },
      diceRoll: function(){
        this.emptyRolls();
        for (let i = 0; i < this.times; i++) {
          let roll = Math.floor(Math.random() * 6 + 1);
          this.rollsArray.push(roll);
        }
        // this.displayRolls();
        this.displaySums();
        this.diceSum();
      },
      diceSum: function(){
        let sum = 0;
        for (let i = 0; i < 6 ; i++) {
          for (let j = 0; j < 3; j++) {
            let highest = Math.max(...this.rollsArray);
            let spot = this.rollsArray.indexOf(highest);
            sum += highest;
            this.rollsArray.splice(spot, 1);
          }
        this.sums.push(sum);
        }
        console.log(this.sums);
        // for (let i = 0; i < 3; i++) {
        //   let highest = Math.max(...this.rollsArray);
        //   let spot = this.rollsArray.indexOf(highest);
        //   sum += highest;
        //   this.rollsArray.splice(spot, 1);
        // }
        // this.sums.push(sum);
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