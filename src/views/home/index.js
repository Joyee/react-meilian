import React from 'react'
import './index.less'
import {
  getFeedList
} from './store/actionCreators'
import FeedItem from './FeedItem'
import BScroll from 'better-scroll'
import Tabbar from '../../common/Tabbar'
import Navigation from '../../common/Navigation'

let page = 1

class Home extends React.Component {
  constructor(props) {
    super(props)
    // this.scrollRef = React.createRef()
    this.state = {
      list: [],
      refreshing: true,
      isLoading: true,
      isPullUpLoad: false,
    }
  }
  render () {
    const { list, isLoading, isPullUpLoad } = this.state

    return (
      <div className='home-wrapper'>
        <Navigation />
        <Tabbar />
        <div className='home-container'>
          {isLoading && <div className='loading'><img src='/src/statics/images/ml_home_loading.gif' alt='加载中' /></div>}
          <div className='scroll' id='scroll' ref={this.scrollRef}>
            <ul>
              {
                list.map((item) => {
                  return <FeedItem
                    key={item.post.post_id}
                    post={item.post}
                    user={item.user}
                    handleLike={this.handleLike}
                  />
                })
              }
              {isPullUpLoad && <li className='load-more'>加载更多</li>}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.loadData()
  }

  componentDidUpdate () {
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextState.list !== this.state.list) {
  //     return true // 可以渲染
  //   }
  //   return false // 不重复渲染
  // }

  _initScroll () {
    this.scroll = new BScroll(document.querySelector('#scroll'), {
      click: true,
      pullDownRefresh: {
        threshold: 50,
        stop: 20
      },
      pullUpLoad: {
        threshold: 50
      }
    })
    this._initEvents()
  }

  _initEvents () {
    this.scroll.on('pullingDown', this.onPullDownRefresh)
    this.scroll.on('pullingUp', this.handleLoadMore)
  }

  async loadData () {
    const result = await getFeedList({
      page,
      is_first_run: 1,
      last_play_quantity: 0,
      square_id: -1
    })
    if (result.status === 200) {
      if (result.data.Code === 0) {
        const list = this._formatData(result.data.Data)
        this.setState({
          list: page === 1 ? list : [...this.state.list, ...list],
          isLoading: false
        }, () => {
          if (!this.scroll) {
            this._initScroll()
          } else {
            this.scroll.refresh()
            this.scroll.finishPullUp()
            this.scroll.finishPullDown()
          }
        })
      }
    }
  }

  _formatData (data) {
    data = data.filter(item => item.card_type === 1).map((item) => {
      return { ...item.value }
    })
    return data
  }

  onPullDownRefresh = async (pos) => {
    console.log('下拉刷新')
    page = 1
    this.setState({
      refreshing: true,
      isLoading: true
    }, () => {
      this.loadData()
    })
  }

  handleLoadMore = () => {
    page++
    this.setState({
      isPullUpLoad: true
    }, () => {
      this.loadData()
    })
  }

  /**
   * 点赞
   */
  handleLike = (post_id) => {
    let data = [...this.state.list]
    data = data.map((item) => {
      return item.post.post_id === post_id ? { ...item, post: { ...item.post, is_clicked_like: !item.post.is_clicked_like } } : item
    })
    this.setState({
      list: data
    })
  }
}

export default Home