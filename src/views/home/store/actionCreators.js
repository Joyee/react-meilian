import {
  feedListUrl
} from '@api/config'
import { methodType } from '@utils/promise'

const promise = require('@utils/promise')

const _formatData = (data) => {
  data = data.filter(item => item.card_type === 1).map((item) => {
    return { ...item.value }
  })
  return data
}

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