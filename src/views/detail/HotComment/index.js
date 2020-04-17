import React from 'react'
import './style.less'
import PropTypes from 'prop-types'

function HotComment (props) {
  const { comment_count, commentList } = props
  return (
    <div className='hot-comment-wrapper'>
      <ul>
        {
          commentList.map((item) => {
            return (
              <li key={item.comment_id}>
                <div className='item'>
                  <span className='name'>{item.name}{!item.at_name && ':'}</span>
                  {item.at_name && <span>回复 <span className='name'>{item.at_name}:</span></span>}
                  <span className='content'>{item.comment_content}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
      <p className='comment-count'>查看全部{comment_count}条评论</p>
    </div>
  )
}

HotComment.propTypes = {
  comment_count: PropTypes.number,
  commentList: PropTypes.array
}

export default HotComment