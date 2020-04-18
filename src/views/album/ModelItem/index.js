import React from 'react'
import './style.less'
import playICON from '../../../statics/images/icon_white_play@2x.png'

export default function ModelItem (props) {
  const { template, handlePreview } = props
  return (
    <li className='model-item' onClick={handlePreview}>
      <div className='model-top'>
        <img className='model-img' src={template.preview_img} alt='封面' />
        <img className='play-icon' src={playICON} alt='播放' />
      </div>
      <h3 className='template-name'>{template.template_name}</h3>
    </li>
  )
}