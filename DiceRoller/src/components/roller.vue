<template>
  <div>
    <h2>Welcome!</h2>
    <span id="rolls"></span>
    <br />
    <span><button v-on:click="roll(4)">D4</button>
    <button v-on:click="roll(5)">D5</button>
    <button v-on:click="roll(6)">D6</button>
    <button v-on:click="roll(8)">D8</button>
    <button v-on:click="roll(10)">D10</button>
    <button v-on:click="roll(12)">D12</button>
    <button v-on:click="roll(20)">D20</button>
    <button v-on:click="roll(100)">D100</button></span>
    <br />
    <span>Roll(s): <input type="number" v-model="times" min="1"></span>
    <br />
    <span>Modifier: <input type="number" v-model="modifier" min="0"></span>
  </div>
</template>


<script>
export default {
  name: 'Roller',
  data () {
    return {
      // results: [],
      rollObj: {},
      times: '1',
      modifier: '0',
    }
  },
  methods: {
    emptySpan: function(){
      let rollSpan = document.getElementById('rolls');
      if(rollSpan.childNodes.length > 0){
        for (let i = 0; i < rollSpan.childNodes.length; i++) {
          rollSpan.childNodes[i].remove();
        }
      }
      console.log(this.rollObj);
    },
    roll: function(max){
      this.emptySpan();
      for (let i = 0; i < this.times; i++) {
        this.storeRolls(Math.floor(Math.random() * max + 1), i, max);
      }
    },
    storeRolls: function(roll, id, max){
      this.rollObj.orgRoll = parseInt(roll);
      this.rollObj.id = parseInt(id);
      this.rollObj.max = parseInt(max);
      this.rollObj.modRoll = parseInt(roll + Math.floor(this.modifier));
      this.createSpan();
      console.log(this.rollObj);
    },
    createSpan: function(){
      let rollSpan = document.getElementById('rolls');
      for(let i = 0; i < this.times.length; i++){
        let span = document.createElement("span");
        span.className="roll-span";
        span.id=this.rollObj.id;
        span.style.padding = ".05em";
        rollSpan.append(span);
        this.display(span);
      }
    },
    display: function(span){
      //on a D20 make the span red for critical failures and green for critical success
      if(this.rollObj.orgRoll == 1 && this.rollObj.max == 20){
        span.append(this.rollObj.modRoll);
        span.style.color="red";
        if (this.times > 1) {
          span.append(",");
        }
      }
      else if(this.rollObj.orgRoll == 20 && this.rollObj.max == 20){
        span.append(this.rollObj.modRoll);
        span.style.color="green";
        if (this.times > 1) {
          span.append(",");
        }
      }
      else{
        span.append(this.rollObj.modRoll);
        if (this.times > 1) {
          span.append(",");
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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