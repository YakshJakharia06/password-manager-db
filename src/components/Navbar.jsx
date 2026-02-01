import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex justify-between px-5 py-10 h-15 items-center'>
      <div className="flex items-center gap-2 logo text-2xl font-bold ">
       <img src="/logo-pass.svg" alt="" /> Password-Manager
      </div>

      <a href="https://github.com/" target='_blank'>
        <button className='flex hover:cursor-pointer gap-2 justify-between items-center px-2 py-1 border-2 rounded-full'>
          <img className='invert w-10' src="/github.png" alt="" />
          <span className='not-md:pr-5'>GitHub</span>
        </button>
      </a>
    </nav>
  )
}

export default Navbar