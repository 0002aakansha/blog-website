import React from 'react'
import Card from './Card'
import { BlogType } from '@/types/types'

const Cards = ({ Blogs }: { Blogs: BlogType[] }) => {

    return (
        <div className='grid grid-cols-3 gap-4 container mx-auto mt-[6rem]'>
            {
                Blogs.map(blog => <Card key={blog._id} blog={blog} />)
            }
        </div>
    )
}

export default Cards