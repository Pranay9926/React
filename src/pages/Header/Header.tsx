import React from 'react'
import avtar from '../../assets/avtar.svg'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  return (
    <div className='bg-[#81c4fe] w-full h-[50px]  '>
      <div >
        <div className='flex justify-end items-center h-full'>
          <span> <FontAwesomeIcon icon={faEye} /></span>
          <img className='h-[40px]' src={avtar} alt=''/>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Header

