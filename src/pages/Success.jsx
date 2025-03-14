import React from 'react'
import { MdDoneOutline } from "react-icons/md";


export default function Success() {

  
  return (
    <div className='flex items-center justify-center font-bold gap-1 text-xl'>
      <MdDoneOutline className='text-green-600  '/>
      Order Placed Successfully
      </div>
    
  )
}
