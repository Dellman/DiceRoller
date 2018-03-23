import Vue from 'vue'
import Router from 'vue-router'
import Roller from '@/components/roller';
import Creator from '@/components/characterCreator';
import PointBuy from '@/components/pointBuy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Roller',
      component: Roller
    },
    {
      path: '/creator',
      name: 'Creator',
      component: Creator
    },
    {
      path: '/pointBuy',
      name: 'PointBuy',
      component: PointBuy
    }
  ]
})
