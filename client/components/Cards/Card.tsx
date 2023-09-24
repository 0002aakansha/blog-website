import { BlogType } from '@/types/types'
import React from 'react'

const Card = ({ blog }: { blog: BlogType }) => {
  return (
    <div className='p-4'>
      <div>
        <img src={blog.image} alt='' className='rounded-md w-full' />
      </div>
      <div className='py-4'>
        <h1 className='font-bold text-stone-800 text-lg leading-7'>{blog.title}</h1>
        <p className='text-zinc-500 h-12 overflow-hidden my-2'>{blog.body}</p>
      </div>
    </div>
  )
}

export default Card