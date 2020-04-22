import React from 'react'
import './style.less'
import { connect } from 'react-redux'
import { List } from 'immutable'
import FeedItem from './FeedItem'
import BScroll from 'better-scroll'
import Tabbar from '../../common/Tabbar'
import Navigation from '../../common/Navigation'
import { actionCreators } from './store'

let page = 1

class Home extends React.Component {
  constructor(props) {
    super(props)
    // this.scrollRef = React.createRef()
    this.state = {
      feedList: [],
      refreshing: true,
      isLoading: true,
      isPullUpLoad: false,
    }
  }
  render () {
    const { isLoading, isPullUpLoad, feedList } = this.state
    // const { feedList } = this.props

    return (
      <div className='home-wrapper'>
        <Navigation />
        <Tabbar />
        <div className='home-container'>
          {isLoading && <div className='loading'><img src='/src/statics/images/ml_home_loading.gif' alt='加载中' /></div>}
          <div className='scroll' id='scroll' ref={this.scrollRef}>
            <ul>
              {
                feedList.map((item) => {
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

  componentDidMount () {
    if (this.props.list.size === 0) {
      this.loadData()
    } else {
      this.setState({
        feedList: this.props.list
      })
    }

    if (!this.scroll) {
      this._initScroll()
    }
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
    this.props.handleSetFeedList(this.state.feedList)
  }

  _initScroll = () => {
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
    const result = await actionCreators.getFeedList({
      page,
      is_first_run: 1,
      last_play_quantity: 0,
      square_id: -1
    })
    this.setState({
      feedList: page === 1 ? result : [...this.state.feedList, ...result],
      isLoading: false
    }, () => {
      if (this.scroll) {
        this.scroll.refresh()
      }
    })
  }

  _formatData (data) {
    data = data.filter(item => item.card_type === 1).map((item) => {
      return { ...item.value }
    })
    return data
  }

  onPullDownRefresh = async () => {
    console.log('下拉刷新')
    page = 1
    this.setState({
      refreshing: true,
      isLoading: true
    }, () => {
      this.loadData()
      this.scroll.finishPullDown()
    })
  }

  handleLoadMore = () => {
    page++
    this.setState({
      isPullUpLoad: true
    }, () => {
      this.loadData()
      this.scroll.finishPullUp()
    })
  }

  /**
   * 点赞
   */
  handleLike = (post_id) => {
    let data = [...this.state.feedList]
    data = data.map((item) => {
      return item.post.post_id === post_id ? { ...item, post: { ...item.post, is_clicked_like: !item.post.is_clicked_like } } : item
    })
    this.setState({
      feedList: data
    })
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.getIn(['home', 'list'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetFeedList (list) {
      dispatch(actionCreators.setFeedList(list))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)