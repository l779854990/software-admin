import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/classify',
    children: [{
      path: 'classify', 
      component: () => import('@/views/classify/index'),
      meta: { title: '类别管理', icon: 'dashboard' }
    },
    
  ]
  },

  {
    path: '/soft',
    component: Layout,
    meta: { title: '软件管理', icon: 'example' },
    children: [
      {
        path: 'index',
       
        component: () => import('@/views/soft/index'),
        meta: { title: '软件管理', icon: 'table' }
      },
      {
        path: 'add',
        
        component: () => import('@/views/soft/add'),
        meta: { title: '添加软件', icon: 'table' }
      }
    ]
  },

  {
    path: '/tutorial',
    component: Layout,
    meta: { title: '教程管理', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tutorial/index'),
        meta: { title: '教程管理', icon: 'form' }
      },
      {
        path: 'add',
        component: () => import('@/views/tutorial/add'),
        meta: { title: '新增教程', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    meta: { title: '数据中心', icon: 'form' },
    redirect:{name:"college"},
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/statistics/statistics'),
        meta: { title: '数据中心', icon: 'form' },
        hidden:true,
        children:[
          {
            path:'college',
            name:"college",
            component:()=> import('@/views/statistics/college'),
            hidden:true
          },
          {
            path:'software',
            component:()=> import('@/views/statistics/software'),
            hidden:true
          }
        ]
      }
    ]
  },
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
