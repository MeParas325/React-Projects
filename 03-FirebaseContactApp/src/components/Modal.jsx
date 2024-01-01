import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({onClose, isOpen, children}) => {
  return (
   isOpen &&
   <>
   <div className='m-auto z-50 relative p-4 min-h-[200px] max-w-[370px] bg-white'>
    <div className='flex justify-end'>
      <AiOutlineClose onClick={onClose} className='text-2xl' />
    </div>
    {children}
   </div>
   <div onClick={onClose} className='absolute top-0 z-40 backdrop-blur h-screen w-screen'>
   </div>
   </> 
  )
}

export default Modal