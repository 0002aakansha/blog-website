import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'
import { AppState } from '../Store/store'
import { BlogType } from '@/types/types'

const Cards = () => {

    const blog = useSelector<AppState>(state => state.blogs.blogs) as BlogType[]

    return (
        <div className='grid grid-cols-3 gap-4 container mx-auto mt-[6rem]'>
            {
                blog.map(blog => <Card key={blog._id} blog={blog} />)
            }
        </div>
    )
}

export default Cards