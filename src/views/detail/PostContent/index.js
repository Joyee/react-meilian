import React from 'react'
import './style.less'

import likeICON from '@statics/images/icon_like@2x.png'
import unlikeICON from '@statics/images/icon_unlike@2x.png'
import commentICON from '@statics/images/icon_comment@2x.png'
import shareICON from '@statics/images/icon_share@2x.png'
import moreICON from '@statics/images/icon_more@2x.png'

function PostContent (props) {
  const { post } = props
  return (
    <div className='post-content'>
      <div className='post-title'>{post.title}</div>
      {post.content && <div className='post-content'>{post.content}</div>}
      <div className='post-info'>
        <div className='count play-count'>{post.play_count}次播放</div>
        <div className='count like-count'>
          <img src={post.is_clicked_like ? likeICON : unlikeICON} className='icon' alt='喜欢' />
          <span>{post.like_count}</span>
        </div>
        <div className='count comment-count'>
          <img src={commentICON} className='icon' alt='评论' />
          <span>{post.comment_count}</span>
        </div>
        <div className='count share-count'>
          <img alt='分享' src={shareICON} className='icon' />
          <span>{post.share_count}</span>
        </div>
        <div className='more'><img alt='更多' src={moreICON} className='more-icon' /></div>
      </div>
    </div>
  )
}

export default PostContent