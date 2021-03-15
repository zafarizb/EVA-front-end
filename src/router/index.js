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
import Change from '@/components/Change.vue'
import Load from '@/components/Load.vue'
import PageContent from '@/components/PageContent.vue'
import VideoContent from '@/components/VideoContent.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Change',
      name: 'Change',
      component: Change
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/Main',
      name: 'layout',
      component: Layout,
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
          path: '/',
          component: Video,
          meta: {title: '视频分析'}
        }
      ]
    },
    {
      path: '/Video/:name',
      component: Layout,
      children: [
        {
          path: '/',
          component: VideoContent,
          meta: {title: '视频分析任务信息'}
        }
      ]
    },
    {
      path: '/Page',
      component: Layout,
      children: [
        {
          path: '/',
          component: Page,
          meta: {title: '图像分析'}
        }
      ]
    },
    {
      path: '/Page/:name',
      component: Layout,
      children: [
        {
          path: '/',
          component: PageContent,
          meta: {title: '图像分析任务信息'}
        }
      ]
    },
    {
      path: '/About',
      component: Layout,
      children: [
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
      children: [
        {
          path: '/',
          component: Other,
          meta: {title: '待定功能'}
        }
      ]
    },
    {
      path: '/Load',
      component: Layout,
      children: [
        {
          path: '/',
          component: Load,
          meta: {title: '上传下载'}
        }
      ]
    }
  ]
})
