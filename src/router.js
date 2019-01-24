import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/adinput',
      name: 'adInput',
      component: () => import(/* webpackChunkName: "adInput" */ './views/AdInput')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import(/* webpackChunkName: "result" */ './views/result')
    },
    {
      path: '/relatedCases',
      name: 'relatedCases',
      component: () => import(/* webpackChunkName: "relatedCases" */ './views/relatedCases')
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router
