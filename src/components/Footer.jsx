import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col m-auto justify-center items-center fixed bottom-0 w-full'>
            <div className="cursor-pointer logo font-bold text-2xl">
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
            <div className='flex justify-center items-center gap-1'>
                Created with <img width={20} height={20} src="icons/heart.png" alt="" /> by Harman Singh
            </div>
        </div>
    )
}

export default Footer
