import { combineReducers } from 'redux-immutable'
import { reducer as homeReducer } from '../views/home/store'
// import { reducer as detailReducer } from '../views/detail/store'
// import { reducer as albumReducer } from '../views/album/store'

const reducer = combineReducers({
  home: homeReducer,
  // detail: detailReducer,
  // album: albumReducer
})

export default reducer