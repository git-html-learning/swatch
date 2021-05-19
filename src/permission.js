// 用户登录成功后，会在全局钩子(src/permission.js)中router.beforeEach中进行拦截，读取cookie,判断用户是否拥有角色
// 首先判断用户有没有Token,即登录与否,观察要去的路由是不是login页面,,是的直接进,不是则判断当前角色信息是否为空
import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // to即将进入的目标路由对象,from当前导航正要离开的路由,next下一步执行的函数钩子
  NProgress.start()

  // 根据路由元信息设置文档标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // 有Token
  if (hasToken) {
    if (to.path === '/login') {
      // 如果用户访问的登录页，直接放行，重定向到首页
      next({
        path: '/'
      })
      NProgress.done()
    } 
      // 没有token
    else {
      // 判断当前用户是否已获取到 UserInfo 信息
      const hasGetUserInfo = store.getters.token
      if (hasGetUserInfo) {
        next()
      } 
      // 未取到UserInfo
      else {

        next(`/login?redirect=${to.path}`)     // 否则全部重定向到登录页
        NProgress.done()

      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在白名单中，则不需要进行任何校验，直接放行
      next()
    } else {
      // 如果不存在于白名单中，则重定向到登录页面.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
