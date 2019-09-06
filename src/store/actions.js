import jwt_decode from 'jwt-decode';
import { asyncRouterMap } from '@/router';
import { setToken } from '@/utils/cookie';
import { login } from '@/api/login';

const actions = {
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        commit('SET_TOKEN', res.token)
        setToken(res.token, 7);
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  async setUser({commit}, user) {
    const decode = jwt_decode(user);
    commit("SET_USER", decode);
    const { key } = decode;
    // 返回当前用户拥有的权限路由
    let accessedRouters = filterAsyncRouter(asyncRouterMap, key);
    commit("SER_ROUTERS", accessedRouters);
  }
};

/**
 * @description: 递归过滤异步路由表，返回符合当前角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param roles 当前角色
*/

function filterAsyncRouter(asyncRouterMap, roles){
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  })

  return accessedRouters;
}

/**
 * @description: 判断是否有权限
 * @param roles 当前角色 
 * @param route 当前路有对象 
 */
// 自定义过滤器
function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) { // meta.roles是否包含角色的key值，如果包含那么就是有权限，否则无权限
    return route.meta.roles.some(role => role.indexOf(roles) >= 0);
  } else { // 默认都可以访问
    return true;
  }
}

export default actions;
