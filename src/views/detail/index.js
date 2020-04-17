import React from 'react'
import './style.less'

import {
  actionCreators,
} from './store'

import Navigation from '../../common/Navigation'
import PostContent from './PostContent'
import HotComment from './HotComment'
import Recommend from './Recommend'

let page = 1

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenH: 0,
      post: null,
      user: null,
      hotCommentList: [],
      commentList: [],
      recommendList: [],
    }
  }
  render () {
    const { post, user, screenH, hotCommentList, recommendList } = this.state
    return (
      <div className='detail-wrapper'>
        {user && <Navigation
          isBlack={true}
          avatar={user.user_icon ? user.user_icon : ''}
          name={user.name ? user.name : ''}
          handleBack={this.handleBack}
        />}
        {
          post && <div className='container'>
            <div className='video-wrapper' style={{ height: screenH }}>
              {post.play_url && <video controls className='video' ref={(el) => this.videoRef = el} />}
            </div>
            <PostContent post={post} />
            {hotCommentList.length && <HotComment
              commentList={hotCommentList}
              comment_count={post.comment_count}
            />
            }
            {recommendList.length && <Recommend recommendList={recommendList} />}
          </div>
        }
      </div>
    )
  }

  async componentDidMount () {
    const { postId } = this.props.match.params
    console.log(postId)
    const dataRes = await actionCreators.getPostDetail(postId)
    let commentRes = await actionCreators.getCommentList({ post_id: postId })
    const recommendRes = await actionCreators.getRecommendList(page)
    console.log(recommendRes)
    commentRes = this._formatComment(commentRes)

    this.setState({
      post: dataRes.post,
      user: dataRes.user,
      screenH: document.documentElement.clientHeight - 88,
      commentList: commentRes,
      hotCommentList: commentRes.slice(0, 3),
      recommendList: this._formatRecommend(recommendRes)
    }, () => {
      this.videoRef.src = dataRes.post.play_url
      // this.videoRef.play()
      console.log(this.state.hotCommentList)
    })
  }

  handleBack = () => {
    console.log('返回')
    this.props.history.goBack()
  }

  /**
   * 重置评论列表
   */
  _formatComment = (list) => {
    return list.map((item) => {
      // console.log(item.commentator.user)
      let new_item = {}
      if (item.respondent.user) { // 回复内容
        new_item = Object.assign(item.respondent.comment, { name: item.respondent.user.name, at_name: item.commentator.user.name })
      } else {
        new_item = Object.assign(item.commentator.comment, { name: item.commentator.user.name, at_name: '' })
      }
      return new_item
    })
  }

  _formatRecommend = (list) => {
    return list.map((item) => {
      return item.post
    })
  }
}


export default Detail