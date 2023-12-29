import React from 'react'
import logo from '../images/firebase.png'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center h-[60px] bg-white my-4 text-xl font-bold rounded-lg'>
        <div className='flex items-center gap-2 '>
            <img className='h-[25px] bg-orange' src={logo} alt="" />
            <h2 className='' >Firebase Contact App</h2>
        </div>
    </div>
  )
}

export default Navbar