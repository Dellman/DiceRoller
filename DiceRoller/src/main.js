// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Roller from './components/roller';
import Creator from './components/characterCreator';


Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '', component: Roller},
    {path: '/creator', component: Creator}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template:
    `<div id="app">
      <ul>
        <li><router-link to="/">Roller</router-link></li>
        <li><router-link to="/Creator">Character Creator</router-link></li>
      </ul>
      <router-view></router-view>
    </div>`
  //render: h => h(App)
}).$mount('#app')