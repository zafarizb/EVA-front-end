import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Layout from '@/components/Layout.vue'
import Main from '@/components/Main.vue'
import Video from '@/components/Video.vue'
import Page from '@/components/Page.vue'
import About from '@/components/About.vue'
import Other from '@/components/Other.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: "/Register",
      name: 'Register',
      component: Register
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/Main',
      name: 'layout', // 路由名称
      component: Layout , // 组件对象
      // 因为视频分析、图像分析、关于等都是 Layout 下的 main 里的，所以要将这些组件作为 Layout 组件的子组件，使用children，里面是一个数组，接收一个个对象
      // meta 是
      children: [
        {
          path: '/Main',
          component: Main,
          meta: {title: '首页'}
        }
      ]
    },

    {
      path: '/Video',
      component: Layout,
      children: [
        {
          path: '/', // 等价于 /member/,请求 /member 时会在后面拼接个 / 因为AppNavbar下的index.vue写的是/member/
          component: Video,
          meta: {title: '视频分析'}
        }
      ]
    },
    {
      path: '/Page',
      component: Layout,
      children:[
          {
            path: '/',
            component: Page,
            meta: {title: '图像分析'}
          }
      ]

    },
    {
      path: '/About',
      component: Layout,
      children:[
          {
            path: '/',
            component: About,
            meta: {title: '关于我们'}
          }
      ]

    },
    {
      path: '/Other',
      component: Layout,
      children:[
          {
            path: '/',
            component: Other,
            meta: {title: '待定功能'}
          }
      ]

    }
  ]
})




