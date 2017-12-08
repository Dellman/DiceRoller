// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)

const Roller = { template: '<div>Roller</div>' }
const Creator = { template: '<div>Creator</div>' }

const routes = [
  {path: '/#', component: Roller},
  {path: '/Creator', component: Creator}
]

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

// const app = new Vue({
//   router
// }).$mount('#app')
