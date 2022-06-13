/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 17:04:16
 * @LastEditTime: 2020-11-10 15:03:18
 */
import adminRequest from '@/utils/adminRequest'
import request from '@/utils/request'
import {
  getName
} from "@/utils/auth";



//获取单个用户信息
export function UserDetail(name) {
  return request({
    url: '/api/v1/user/' + name,
    method: 'get',
  })
}

//获取用户信息
export function OtherUserDetail(payload) {
  return request({
    url: '/api/v1/user/' + payload.username,
    method: 'get',
  })
}


//普通用户修改用户信息，不需要管理员token
export function EditUser(data) {
  return request({
    url: '/api/v1/user',
    method: 'put',
    data
  })
}


//注册用户
export function RegisterUser(data) {
  return request({
    url: '/session',
    method: 'put',
data
  })
}

//管理员登录，需要保存管理员token
export function AdminLogin(data) {
  return adminRequest({
    url: '/admin',
    method: 'post',
data
  })
}


//获取用户列表
export function AdminUsers(payload) {
  return adminRequest({
    url: '/api/v1/admin/users',
    method: 'get',

  })
}

//删除用户
export function DeleteUsers(payload,token) {
  return adminRequest({
    url: '/api/v1/admin/user/' + payload,
    method: 'delete',
    headers: {
     token: token
    }
  })
}
//编辑用户信息，需要带管理员token
export function AdminEditUser(payload) {
  return adminRequest({
    url: '/api/v1/admin/user/' + payload.username,
    method: 'put',
    data: {
      ...payload,
      "Wechat": null,
      "extraInfo": null
    }
  })
}
