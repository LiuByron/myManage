import request from '@/utils/request'
import fileUpload from '@/utils/requestFile'

// 获取用户列表
export function getLineList(params, urls) {
  return request({
    url: urls,
    method: 'get',
    params: params
  })
}

// 新增用户
export function add(params, urls) {
  return request({
    url: urls,
    method: 'get',
    params: params
  })
}

// 删除用户
export function remove(params, urls) {
  return request({
    url: urls,
    method: 'get',
    params: params
  })
}

// 用户信息修改
export function update(params, urls) {
  return request({
    url: urls,
    method: 'get',
    params: params
  })
}
/* 获取选中这行的信息 */
export function getserver(params, urls) {
  return request({
    url: urls,
    method: 'get',
    params: params
  })
}

/* 获取选中这行的信息 */
export function postserver(params, urls) {
  return request({
    url: urls,
    method: 'post',
    data: params
  })
}

/* 保存文件 */
export function saveFile(FormData, urls) {
  return fileUpload({
    url: urls,
    method: 'post',
    data: FormData
  })
}

/* 保存图片 */
export function saveImg(file) {
  var data = new FormData()
  data.append('file', file)
  return fileUpload({
    method: 'post',
    data
  })
}

/* 获取图片url */
export function getImgUrl(url) {
  return process.env.GET_IMG_API + url
}

// 用户获取部门信息
export function getDepartment() {
  return request({
    url: '/dept/selectAllList',
    method: 'get'
  })
}

// 用户获取角色信息
export function getRoleInfo() {
  return request({
    url: '/role/selectAllList',
    method: 'get'
  })
}

// 用户密码重置
export function restUserPwd(params) {
  return request({
    url: '/user/updatePassword',
    method: 'get',
    params: params
  })
}

// 用户新增登录账号查重
export function queryRepetition(params) {
  return request({
    url: '/user/checkLoginUser',
    method: 'get',
    params: params
  })
}

// 消息接收、发送
export function websocket(params) {
  return request({
    url: '/user/checkLoginUser',
    method: 'get',
    params: params
  })
}
