import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next) => {
	// 如果即将进入的路由对象是登录页，则进行跳转，否则验证是否携带accessToken,如果有，则进
	// 行跳转，没有，则不允许跳转
    if(to.path === "/login"){
        next()
    }else{
        if (sessionStorage.getItem('accessToken')){
            next()
        } else {
            next("/login")
        }
    }
})