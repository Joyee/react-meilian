import React from 'react'
import PropTypes from 'prop-types'
import './style.less'

import backICON from '../../statics/images/return_icon@2x.png'

function Navigation (props) {
  const { isBlack, avatar, name, handleBack } = props
  return (
    <div
      className='top-bar-wrapper'
      style={{ backgroundColor: isBlack ? '#000000' : '#D43D3D' }}
    >
      {!isBlack && <div className='title'>特效相册</div>}
      {isBlack && <div className='top'>
        <img className='back-icon' src={backICON} alt='返回' onClick={handleBack} />
        <img className='avatar' src={avatar} alt='头像' />
        <span className='name'>{name}</span>
      </div>}
    </div>
  )
}

Navigation.defaultProps = {
  isBlack: false,
  avatar: '',
  name: ''
}

Navigation.propTypes = {
  isBlack: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  handleBack: PropTypes.func
}

export default Navigation