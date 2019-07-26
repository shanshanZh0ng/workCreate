import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ApplicationCreate from '@/components/applicationCreate/ApplicationCreate'
import Storage from '@/components/applicationCreate/Storage'
import Databese from '@/components/applicationCreate/Database'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ApplicationCreate',
      component: ApplicationCreate
    },
    {
      path: '/s',
      name: 'Storage',
      component: Storage
    },
    {
      path: '/d',
      name: 'Databese',
      component: Databese
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
