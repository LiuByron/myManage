import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue'
import jwt_decode from 'jwt-decode'
import { getToken } from '@/utils/cookie'
import store from './store/store'

Vue.use(Router)

/*
  hidden: true 如果hidden为true则在左侧菜单栏展示否则不显示
  name: 'router-name' 路由名称，必须填写
  meta: {
    title: 'title'        对应菜单栏显示的名称
    icon: 'icon-class'    对应菜单栏显示的图标样式，使用fontawesome图标库
  }
*/

export const asyncRouterMap= [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon : 'el-icon-menu'
        },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    redirect: '/tableData',
    hidden: true,
    meta: {
      title: '数据管理',
      icon : 'el-icon-coin'
    },
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: {
          title: '表格管理',
          icon : 'el-icon-reading'
        },
        component: () => import('@/views/DataManage/TableData.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: {
          title: '图表管理',
          icon : 'el-icon-pie-chart'
        },
        component: () => import('@/views/DataManage/ChartsData.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon : 'el-icon-tickets',
          roles: ["admin", "editor"]
        },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    redirect: '/accountData',
    hidden: true,
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: {
          title: '账户管理',
          icon : 'el-icon-user',
          roles: ["admin"]
        },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userInfo',
    hidden: false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/common/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/lock',
    name: '锁屏页',
    hidden: false,
    meta: { title: '锁屏' },
    component: () => import('@/views/common/lock')
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component: () => import('@/views/Login/Password.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

router.beforeEach((to, from, next) => {
  const isLogin = typeof(getToken()) === "undefined" ? false : true;
  if (to.path === '/login' || to.path === '/password') {
    isLogin ? next('/') : next()
  } else {
    if (isLogin) {
      const decoded = jwt_decode(getToken());
      const { key } = decoded;
      if (hasPermission(key, to)) {
        if (store.getters.isLock && to.path !== '/lock') {
          next('/lock')
        } else if (!store.getters.isLock && to.path === '/lock') {
          next('/')
        } else {
          next()
        }
      } else {
        next('/404')
      }
    } else {
      next('/login')
    }
  }
})

/**
 * @description: 判断是否有权限
 * @param roles 当前角色 
 * @param route 当前路有对象 
 */
// 自定义过滤器
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) { // meta.roles是否包含角色的key值，如果包含那么就是有权限，否则无权限
    return route.meta.roles.some(role => role.indexOf(roles) >= 0);
  } else { // 默认都可以访问
    return true;
  }
}

export default router;
