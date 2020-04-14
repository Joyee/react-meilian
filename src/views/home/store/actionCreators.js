import {
  feedListUrl
} from '@api/config'
import { methodType } from '@utils/promise'
const promise = require('@utils/promise')

export const getFeedList = async ({
  page = 1,
  square_id = -1,
  is_first_run = 1,
  last_play_quantity = 0
}) => {
  return await promise.request(feedListUrl, methodType.POST, {
    ctype: 1,
    is_first_run,
    last_play_quantity,
    live_id: "681895_ngey",
    paging_index: page,
    square_id
  })
}