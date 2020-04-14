import React from 'react'
import './style.less'

import { formateSeconds } from '@utils/util'
import shareICON from '@statics/images/share_icon@2x.png'
import playICON from '@statics/images/play_icon@2x.png'
import likeICON from '@statics/images/like_icon@2x.png'
import commentICON from '@statics/images/comment_icon@2x.png'

const FeedItem = (props) => {
  const { post, user } = props
  return (
    <div className='feed-item'>
      <div className='item-top'>
        <span className='title'>{post.title}</span>
        <img className='bg' alt='' src={post.conver_url} />
        <span className='play-count'>{post.play_count}次播放</span>
        <span className='duration'>{formateSeconds(post.play_duration)}</span>
        <img alt='播放' className='play-icon' src={playICON} />
      </div>
      <ul className='item-bottom'>
        <li className='info'>
          <img className='avatar' alt='头像' src={user.user_icon} />
          <span className='name'>{user.name}</span>
        </li>
        <li className='like'>
          <img className='icon' alt='点赞' src={likeICON} />
          <span className='count'>{post.like_count}</span>
        </li>
        <li className='comment'>
          <img className='icon' alt='评论' src={commentICON}/>
          <span className='count'>{post.comment_count}</span>
        </li>
        <li className='share'>
          <img className='share-icon' src={shareICON} alt='分享'/>
        </li>
      </ul>
    </div>
  )
}

export default FeedItem