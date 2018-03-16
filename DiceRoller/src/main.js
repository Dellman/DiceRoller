// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Roller from './components/roller';
import Creator from './components/characterCreator';
import PointBuy from './components/pointBuy'


Vue.config.productionTip = false
Vue.use(VueRouter)
// Is this way better?
// const Roller = { template: '<div>roller</div>'}

// const routes = [
//   { path: '/roller', component: Roller}
// ]

// const router = new VueRouter({
//   routes
// })

// const app = new Vue({
//   router
// }).$mount('#app')

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '', name: 'roller', component: Roller},
    {path: '/creator', name: 'creator', component: Creator},
    {path: '/pointbuy', name: 'pointBuy', component: PointBuy}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template:
    `<div id="app">
      <ul>
        <li><router-link :to="{ name : 'roller' }">Roller</router-link></li>
        <li><router-link :to="{ name : 'creator'}">Character Creator</router-link></li>
        <li><router-link :to="{ name: 'pointBuy' }">Point Buy</router-link></li>
      </ul>
      <router-view></router-view>
    </div>`
  //render: h => h(App)
}).$mount('#app')