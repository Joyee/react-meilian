import {
  feedListUrl
} from '@api/config'
import { methodType } from '@utils/promise'
import * as constants from './constants'
import { fromJS } from 'immutable'

const promise = require('@utils/promise')

const _formatData = (data) => {
  data = data.filter(item => item.card_type === 1).map((item) => {
    return { ...item.value }
  })
  return data
}

/**
 * 获取feed流
 * @param {Object} param0 
 */
export const getFeedList = async ({
  page = 1,
  square_id = -1,
  is_first_run = 1,
  last_play_quantity = 0
}) => {
  const result = await promise.request(feedListUrl, methodType.POST, {
    ctype: 1,
    is_first_run,
    last_play_quantity,
    live_id: "681895_ngey",
    paging_index: page,
    square_id
  })

  if (result.status === 200) {
    if (result.data.Code === 0) {
      const list = _formatData(result.data.Data)
      return list
    }
  }
  return false
}

/**
 * 设置feed流列表
 * @param {Array} list 
 */
export const setFeedList = (list) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_FEED_LIST,
      list
    })
  }
}

/**
 * 修改数组中的某一项
 * @param {Number} post_id 帖子id
 * @param {String} key 修改的key
 * @param {String|Number} value 修改后的值
 */
export const changeFeedItem = (post_id, key, value) => {
  return dispatch => {
    dispatch({
      type: constants.CHANGE_FEED_LIST_ITEM,
      post_id,
      key,
      value
    })
  }
}