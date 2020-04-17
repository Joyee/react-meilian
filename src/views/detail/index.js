import React from 'react'
import './style.less'

import {
  actionCreators
} from './store'

import Navigation from '../../common/Navigation'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenH: 0,
      post: null,
      user: null,
    }
  }
  render () {
    const { post, user, screenH } = this.state
    return (
      <div className='detail-wrapper'>
        {user && <Navigation
          isBlack={true}
          avatar={user.user_icon ? user.user_icon : ''}
          name={user.name ? user.name : ''}
          handleBack={this.handleBack}
        />}
        <div className='container'>
          <div className='video-wrapper' style={{ height: screenH }}>
            {post && post.play_url && <video controls className='video' ref={(el) => this.videoRef = el} />}
          </div>
          <div className='post-content'></div>
        </div>
      </div>
    )
  }

  async componentDidMount () {
    const { postId } = this.props.match.params
    console.log(postId)
    const dataRes = await actionCreators.getPostDetail(postId)
    console.log(dataRes.user)
    this.setState({
      post: dataRes.post,
      user: dataRes.user,
      screenH: document.documentElement.clientHeight - 88
    }, () => {
      this.videoRef.src = dataRes.post.play_url
      // this.videoRef.play()
    })
  }

  handleBack = () => {
    console.log('返回')
    this.props.history.goBack()
  }
}


export default Detail