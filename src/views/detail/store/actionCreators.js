import {
  getDetailUrl,
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