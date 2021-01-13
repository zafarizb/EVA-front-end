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
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/Main',
      name: 'layout', // 璺敱鍚嶇О
      component: Layout, // 缁勪欢瀵硅薄
      // 鍥犱负瑙嗛鍒嗘瀽銆佸浘鍍忓垎鏋愩�佸叧浜庣瓑閮芥槸 Layout 涓嬬殑 main 閲岀殑锛屾墍浠ヨ灏嗚繖浜涚粍浠朵綔涓� Layout 缁勪欢鐨勫瓙缁勪欢锛屼娇鐢╟hildren锛岄噷闈㈡槸涓�涓暟缁勶紝鎺ユ敹涓�涓釜瀵硅薄
      // meta 鏄�
      children: [
        {
          path: '/Main',
          component: Main,
          meta: {title: '棣栭〉'}
        }
      ]
    },

    {
      path: '/Video',
      component: Layout,
      children: [
        {
          path: '/', // 绛変环浜� /member/,璇锋眰 /member 鏃朵細鍦ㄥ悗闈㈡嫾鎺ヤ釜 / 鍥犱负AppNavbar涓嬬殑index.vue鍐欑殑鏄�/member/
          component: Video,
          meta: {title: '瑙嗛鍒嗘瀽'}
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
          meta: {title: '鍥惧儚鍒嗘瀽'}
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
          meta: {title: '鍏充簬鎴戜滑'}
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
          meta: {title: '寰呭畾鍔熻兘'}
        }
      ]

    }
  ]
})
