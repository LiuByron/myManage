import request from '@/utils/request';

// 请求所有用户数据
export function getAllUser(params) {
  return request({
    url: '/api/users/allUsers',
    method: 'get',
    params: params
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: `/api/users/addUser`,
    method: 'post',
    data: data
  })
}

// 删除
export function deleteUser(data) {
  return request({
    url: `/api/users/deleteUser/${data._id}`,
    method: 'delete',
    data: data
  })
}

// 编辑
export function editUser(data) {
  return request({
    url: `/api/users/editUser/${data._id}`,
    method: 'post',
    data: data
  })
}

