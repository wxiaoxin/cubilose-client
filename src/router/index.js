import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Coupon from '@/components/Coupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: User
    }, {
      path: '/coupon',
      name: 'coupon',
      component: Coupon
    }
  ]
})
