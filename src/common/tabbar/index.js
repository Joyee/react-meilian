import React from 'react'
import './style.less'
import { Link } from 'react-router-dom'

function Tabbar() {
  return (
    <ul className='tabs'>
      <Link to='/'><li>首页</li></Link>
      <Link to='/album'><li>特效相册</li></Link>
      <Link to='/my'><li>我的</li></Link>
    </ul>
  )
}

export default Tabbar