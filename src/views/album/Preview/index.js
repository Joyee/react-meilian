import React from 'react'
import './style.less'
import PropTypes from 'prop-types'

import addICON from '../../../statics/images/add_white_icon@2x.png'
import arrowRightICON from '../../../statics/images/arrow_right_icon@2x.png'
import closeICON from '../../../statics/images/close_white_icon@2x.png'

function Preview ({ template = null, onClose }) {
  return (
    <div className='preview-wrapper'>
      <img src={closeICON} className='close' alt='关闭' onClick={onClose}/>
      <div className='video-container'>
        {template !== null && template.preview_url !== null && <video className='video' id='video' src={template.preview_url} autoPlay />}
      </div>
      <ul className='action-container'>
        <li className='action-item top'>
          <img className='add-red-img' alt='add' src={addICON} />
          <div className='txt'>
            <p className='b-txt'>一键生成特效相册里的图片</p>
            <p className='s-txt'>上传一张正脸无遮挡的照片</p>
          </div>
          <img className='arrow-right-img' alt='' src={arrowRightICON} />
        </li>
        <li className='action-item bottom'>
          <img className='add-red-img' alt='add' src={addICON} />
          <div className='txt'>
            <p className='b-txt'>选择本地照片</p>
            <p className='s-txt'>手机里的照片制作特效相册(最多5张)</p>
          </div>
          <img className='arrow-right-img' alt='' src={arrowRightICON} />
        </li>
      </ul>
    </div>
  )
}

Preview.propTypes = {
  template: PropTypes.object
}

export default Preview