import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import {
  getFeedList
} from './store/actionCreators'
import FeedItem from './FeedItem'
import { PullToRefresh, ListView } from 'antd-mobile'

let page = 1

class Home extends React.Component {
  constructor(props) {
    super(props)
    const list = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.value !== row2.value
    })
    this.state = {
      list,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    }
  }
  render () {
    const { list } = this.state
    const row = ({ value }) => {
      return (
        <FeedItem
          key={value.post.post_id}
          post={value.post}
          user={value.user}
        />
      )
    }
    return (
      <div className='home-wrapper' id='container'>
        <ListView
          dataSource={list}
          renderRow={row}
          ref={(el) => this.lv = el}
          style={this.state.useBodyScroll ? {} : {
            height: '100%'
          }}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center', fontSize: '24px' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          useBodyScroll={this.state.useBodyScroll}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />}
          onEndReached={this.handleLoadMore}
        />
      </div>
    )
  }

  componentDidMount () {
    this.hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop
    this.listData = []
    this.loadData()
  }

  componentDidUpdate () {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
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
        const list = result.data.Data.filter(item => item.card_type === 1)
        this.listData = [...this.listData, ...list]
        this.setState({
          list: this.state.list.cloneWithRows(this.listData),
          refreshing: false,
          height: this.hei,
          isLoading: false
        })
      }
    }
  }

  handleRefresh = () => {
    page = 1
    this.setState({
      refreshing: true,
      isLoading: true
    })
    this.loadData()
  }

  handleLoadMore = () => {
    page++
    this.setState({ isLoading: true })
    this.loadData()
  }
}

export default Home