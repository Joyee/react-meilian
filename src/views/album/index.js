import React from 'react'
import './index.less'
import Tabbar from '../../common/Tabbar'
import Navigation from '../../common/Navigation'
import ModelItem from './ModelItem'

import { actionCreators } from './store'
import BScroll from 'better-scroll'

import addICON from '../../statics/images/icon_add@2x.png'
let page = 1

class Album extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      isLoading: true,
      isPullUpLoad: false,
      loaded: false,
    }
  }
  render () {
    const { list, isLoading, isPullUpLoad, loaded } = this.state
    const ModelList = () => {
      return (
        <div className='scroll' id='scroll'>
          <ul>
            <li className='product-btn'>
              <img className='add-img' src={addICON} alt='add' />
              <p>制作相册</p>
            </li>
            {
              list.map((item) => {
                return <ModelItem
                  key={item.template_id}
                  template={item}
                />
              })
            }
            {isPullUpLoad && <li className='load-more'>加载更多...</li>}
            {loaded && <li>人家也是有底线的</li>}
          </ul>
        </div>
      )
    }
    return (
      <div className='album-wrapper'>
        <Navigation title='特效相册' isBlack={false} />
        <Tabbar />
        <div className='album-container'>
          {isLoading && <div className='loading'><img src='/src/statics/images/ml_home_loading.gif' alt='加载中' /></div>}
          {ModelList()}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this._loadData()
  }

  _loadData = async () => {
    const dataRes = await actionCreators.getModelsList('', page)
    this.total = dataRes.list.last_page
    this.setState({
      list: page === 1 ? dataRes.list.data : this.state.list.concat(dataRes.list.data),
      isLoading: false,
      isPullUpLoad: false
    }, () => {
      if (!this.scroll) {
        this._initScroll()
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    })
  }

  _initScroll = () => {
    this.scroll = new BScroll(document.querySelector('#scroll'), {
      pullUpLoad: {
        threshold: 50
      }
    })
    this._initEvents()
  }

  _initEvents = () => {
    this.scroll.on('pullingUp', this.handleLoadMore)
  }

  handleLoadMore = () => {
    console.log('加载更多')
    page++
    if (page > this.total) {
      this.setState({
        loaded: true,
        isPullUpLoad: false
      })
      return
    }
    this._loadData()
  }
}

export default Album