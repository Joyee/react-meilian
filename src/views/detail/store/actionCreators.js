import {
  getDetailUrl,
  getCommentListUrl,
  getRecommendListUrl,
} from '../../../api/config'

import { methodType } from '../../../utils/promise'

const promise = require('../../../utils/promise')

/**
 * 获取帖子详情
 * @param {String} post_id 帖子详情
 */
export const getPostDetail = async (post_id) => {
  const result = await promise.request(`${getDetailUrl}/${post_id}`, methodType.GET)

  if (result.status === 200) {
    if (result.data.Code === 0) {
      return result.data.Data
    }
  }
  return false
}

/**
 * 获取帖子评论
 * @param {Object} param0 
 */
export const getCommentList = async ({ post_id, last_comment_id = 0 }) => {
  const result = await promise.request(
    `${getCommentListUrl}/${post_id}/${last_comment_id}`,
    methodType.GET
  )

  if (result.status === 200) {
    if (result.data.Code === 0) {
      return result.data.Data
    }
  }
  return false
}

/**
 * 获取推荐
 * @param {Number} page 页码
 */
export const getRecommendList = async (page = 1) => {
  const result = await promise.request(
    `${getRecommendListUrl}/${page}`,
    methodType.POST,
    {
      style_id: 0,
      square_id: -1
    },
    {
      headers: {
        'x-platform-type': 'face_server'
      }
    }
  )
  if (result.status === 200) {
    if (result.data.Code === 0) {
      return result.data.Data
    }
  }
  return false
}