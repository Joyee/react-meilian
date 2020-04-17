import React from 'react'
import './style.less'

import playICON from '@statics/images/icon_play@2x.png'
import { formateSeconds } from '../../../utils/util'

function Recommend (props) {
  const { recommendList } = props
  return (
    <div className='recommend-wrapper'>
      {
        recommendList.map((item) => {
          return (
            <div
              key={item.post_id}
              className='recommend'
              style={
                {
                  background: `url(${item.conver_url}) no-repeat`,
                  backgroundSize: 'cover'
                }
              }
            >
              <h2 className='title'>{item.title}</h2>
              <img alt='播放' src={playICON} className='play-icon' />
              <div className='footer'>
                <span className='play-count'>{item.play_count}次</span>
                <span className='duration'>{formateSeconds(item.play_duration)}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Recommend