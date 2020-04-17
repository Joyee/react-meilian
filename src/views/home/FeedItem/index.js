import React from 'react'
import { Link } from 'react-router-dom'
import './style.less'

import { formateSeconds } from '@utils/util'
import shareICON from '@statics/images/share_btn@2x.png'
import playICON from '@statics/images/icon_play@2x.png'
import unlikeICON from '@statics/images/icon_unlike@2x.png'
import likeICON from '@statics/images/icon_like@2x.png'
import commentICON from '@statics/images/icon_comment@2x.png'

const FeedItem = (props) => {
  const { post, user, handleLike } = props
  return (
    <li className='feed-item'>
      <Link to={`/detail/${post.post_id}`}>
        <div className='item-top'
          style={
            {
              background: `url(${post.conver_url}) no-repeat`,
              backgroundSize: 'cover'
            }
          }>
          <span className='title'>{post.title}</span>
          <span className='play-count'>{post.play_count}次播放</span>
          <span className='duration'>{formateSeconds(post.play_duration)}</span>
          <img alt='播放' className='play-icon' src={playICON} />
        </div>
      </Link>
      <ul className='item-bottom'>
        <li className='info'>
          <img className='avatar' alt='头像' src={user.user_icon} />
          <span className='name'>{user.name}</span>
        </li>
        <li className='like' onClick={() => handleLike(post.post_id)} data-like={post.is_clicked_like}>
          <img className='icon' alt='点赞' src={post.is_clicked_like ? likeICON : unlikeICON} />
          <span className='count'>{post.like_count}</span>
        </li>
        <li className='comment'>
          <img className='icon' alt='评论' src={commentICON} />
          <span className='count'>{post.comment_count}</span>
        </li>
        <li className='share'>
          <img className='share-icon' src={shareICON} alt='分享' />
        </li>
      </ul>
    </li>
  )
}

export default FeedItem