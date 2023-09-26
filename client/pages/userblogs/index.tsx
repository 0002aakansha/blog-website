import { getCookie } from '@/auth/cookies'
import Card from '@/components/Cards/Card'
import Layout from '@/components/Layout/Layout'
import { AppState } from '@/components/Store/store'
import { fetchUserBlogs } from '@/components/Store/userReducer'
import blogInstance from '@/instances/blogInstance'
import { BlogType } from '@/types/types'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const UserBlogs = () => {

  const dispatch = useDispatch()
  const blogs = useSelector<AppState>(state => state.user.user.blogs) as BlogType[]

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch, blogs]);

  const deleteHandler = async (_id: string) => {
    try {
      const { data } = await blogInstance({
        url: '/',
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json',
          Authorization: getCookie()
        },
        data: JSON.stringify({ _id })
      })
      if (data.success) toast.success(data.msg)
      else throw (data.msg)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <Layout>
      <div className='grid grid-cols-3 gap-4 container mx-auto mt-[6rem]'>
        {
          blogs.length > 0 ? blogs.map(blog => (
            <div key={blog._id}>
              <Card blog={blog} />
              <button className='bg-red-500 w-20 p-2 text-stone-100 text-lg rounded mx-2' onClick={() => deleteHandler(blog._id)}>Delete</button>
              <button className='bg-green-600 w-20 p-2 text-stone-100 text-lg rounded mx-2'>Edit</button>
            </div>
          )) : 'You have not created any blogs!'
        }
      </div>
    </Layout>
  )
}

export default UserBlogs