import React from 'react'
import './style.less'
import { Link } from 'react-router-dom'
import homeICON from '../../statics/images/home_icon@2x.png'
import albumICON from '../../statics/images/album_icon@2x.png'
import userICON from '../../statics/images/user_icon@2x.png'

function Tabbar() {
  return (
    <ul className='tabs'>
      <li className='tab'><Link to='/'><img alt='' src={homeICON}/><span>首页</span></Link></li>
      <li className='tab'><Link to='/album'><img alt='' src={albumICON}/><span>特效相册</span></Link></li>
      <li className='tab'><Link to='/my'><img alt='' src={userICON}/><span>我的</span></Link></li>
    </ul>
  )
}

export default Tabbar