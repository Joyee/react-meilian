import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  list: []
})

const changeFeedItem = (state, action) => {
  const new_list = state.get('list').map((item) => {
    if (item.post.post_id === action.post_id) {
      item.post[action.key] = action.value
    }
    return item
  })
  return state.set('list', new_list)
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_FEED_LIST:
      return state.set('list', action.list)
    case constants.CHANGE_FEED_LIST_ITEM:
      return changeFeedItem(state, action)
    default:
      return state
  }
}