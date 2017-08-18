import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Coupon from '@/components/Coupon'
import Delivery from '@/components/Delivery'

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
    }, {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    }
  ]
})
