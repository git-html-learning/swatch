import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
// hidden 设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面

  // {
  //   //  redirect: '/permission/index', 重定向地址，在面包屑中点击会重定向去的地址
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [{
  //     path: 'home',
  //     name: 'Home',
  //     component: () => import('@/views/Home/index'),
  //     meta: {
  //       title: '首页',                // 设置该路由在侧边栏和面包屑中展示的名字
  //       icon: '主页'                  // 设置该路由的图标
  //     }
  //   }]
  // }, 
  
  {
    path: '/fence',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '电子围栏',
      icon:'轴承'
    },
    children: [
      {
        path: 'index',
        name: '围栏管理',
        component: () => import('@/views/fence/index'),
        meta: {
          title:'围栏管理',
        }
      },
      {
        path: 'details',
        name: '围栏列表',
        component: ()=>import('@/views/fence/details'),
        meta: {
          title:'围栏列表',
        },
      },
  
    ]
  },
  {
    path: '/products',
    component: Layout,
    children: [
      {
      path: 'index',
      name: 'Product',
      component: () => import('@/views/Product/index'),
      meta: {
        title: '手环管理',
        icon: '产品'
      },
    },
    {
          path: 'createProduct',
          name: 'CreateProduct',
          hidden: true,
          component: () => import('@/views/Product/createProduct/index'),
          meta: {
            title: '创建手环',
          }
        }, 
        {
          path: 'pageDetail',
          name: 'pageDetail',
          hidden: true,
          component: () => import('@/views/Product/detailPage/index'),
          meta: {
            title: '手环详情页',
          }
        }
  ]
  },
  // {
  //   path: '/device',
  //   component: Layout,
  //   redirect: '/devices/index',
  //   hidden: true,
  //   meta: {
  //     title: '设备管理',
  //     icon: '设备'
  //   },
  //   children: [{
  //     path: 'createMoreDevice',
  //     name: 'CreateMoreDevice',
  //     hidden: true,
  //     component: () => import('@/views/Device/createDevice/createMoreDevice/index'),
  //     meta: {
  //       title: '批量创建设备',
  //       icon: '设备'
  //     }
  //   }, {
  //     path: 'createTemplate',
  //     name: 'CreateTemplate',
  //     hidden: true,
  //     component: () => import('@/views/Device/createDevice/createTemplate/index'),
  //     meta: {
  //       title: '添加模板',
  //       icon: '设备'
  //     }
  //   }, {
  //     path: 'handDevice',
  //     name: 'HandDevice',
  //     hidden: true,
  //     component: () => import('@/views/Device/createDevice/handDevice/index'),
  //     meta: {
  //       title: '手动添加设备',
  //       icon: '设备'
  //     }
  //   }, {
  //     path: 'templateDevice',
  //     name: 'TemplateDevice',
  //     hidden: true,
  //     component: () => import('@/views/Device/createDevice/templateDevice/index'),
  //     meta: {
  //       title: '模板创建设备',
  //       icon: '设备'
  //     }
  //   }, {
  //     path: 'deleteTemplate',
  //     name: 'DeleteTemplate',
  //     hidden: true,
  //     component: () => import('@/views/Device/createDevice/deleteTemplate/index'),
  //     meta: {
  //       title: '模板创建设备',
  //       icon: '设备'
  //     }
  //   }, {
  //     path: 'alertData',
  //     name: 'AlertData',
  //     hidden: true,
  //     component: () => import('@/views/Device/alertDevice/index'),
  //     meta: {
  //       title: '报警信息',
  //       icon: '设备'
  //     }
  //   }, ]
  // },
  {
    path: '/alert',
    component: Layout,
    children: [{
      path: 'index',
      name: 'alert',
      component: () => import('@/views/Device/alertDevice/index'),
      meta: {
        title: '报警信息',
        icon: '调试'
      },
      // hidden: true,
    }]
  }, 
  
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Admin',
      component: () => import('@/views/Admin/index'),
      meta: {
        title: '管理员信息',
        icon: '管理员'
      },
      // hidden: true,
    }]
  }, 
  
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/homePage',
    component: () => import('@/views/homePage/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
