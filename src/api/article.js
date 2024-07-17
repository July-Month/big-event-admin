import request from '@/utils/request'
const POST = 'post'
const GET = 'get'
const PUT = 'put'
const DELETE = 'delete'

// 分类：获取文章分类
export const artGetChannelsService = () => {
  return request({
    url: '/my/cate/list',
    method: GET
  })
}

// 分类：新增文章分类
export const artAddChannelService = (data) => {
  return request({
    url: 'my/cate/add',
    method: POST,
    data
  })
}

// 分类：编辑文章分类
export const artEditChannelService = (data) => {
  return request({
    url: '/my/cate/info',
    method: PUT,
    data
  })
}

// 分类：删除文章分类
export const artDelChannelService = (params) => {
  return request({
    url: 'my/cate/del',
    method: DELETE,
    params
  })
}

// 文章：获取文章列表
export const artGetArticleListService = (params) => {
  return request({
    url: 'my/article/list',
    method: GET,
    params
  })
}

// 文章：获取文章详情
export const artGetArticleInfoService = (params) => {
  return request({
    url: '/my/article/info',
    method: GET,
    params
  })
}

// 文章：发布文章
export const artPublishService = (data) => {
  return request({
    url: '/my/article/add',
    method: POST,
    data
  })
}

// 文章：编辑文字
export const artEditService = (data) => {
  return request({
    url: '/my/article/info',
    method: 'put',
    data
  })
}
