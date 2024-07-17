import request from '@/utils/request'
const POST = 'post'
const GET = 'get'

// 注册接口
export const userRegisterService = (data) => {
  return request({
    url: '/api/reg',
    method: POST,
    data
  })
}

// 登录接口
export const userLoginService = (data) => {
  return request({
    url: '/api/login',
    method: POST,
    data
  })
}

// 获取用户基本信息
export const userGetUserInfoService = () => {
  return request({
    url: '/my/userinfo',
    method: GET
  })
}

// 更新用户信息
export const userUpdateUserService = (data) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data
  })
}

// 更新用户头像
export const userUpdateAvatarService = (data) => {
  return request({
    url: '/my/update/avatar',
    method: 'patch',
    data
  })
}

// 更新用户密码
export const userUpdatePwdService = (data) => {
  return request({
    url: '/my/updatepwd',
    method: 'patch',
    data
  })
}
