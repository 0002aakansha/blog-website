import Layout from '@/components/Layout/Layout'
import React from 'react'

const CreateBlog = () => {
    return (
        <Layout>
            <div className='container mx-auto mt-16 mb-4'>
                <h1 className='text-3xl font-bold text-stone-700 text-center my-5'>Create Blog</h1>
                <hr className='w-1/2 mx-auto' />
                <div className='w-1/2 bg-stone-50 mx-auto p-10 mt-10'>
                    <form action="" >
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='font-semibold text-stone-600'>Title</label>
                            <input type="text" className='bg-transparent border-b-2 p-2 outline-none' />
                        </div>
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='font-semibold text-stone-600'>Description</label>
                            <textarea className='bg-transparent border-b-2 p-2 outline-none' />
                        </div>
                        <div className='my-4'>
                            <label className="bg-blue-500 flex flex-col text-md text-stone-50 px-2 rounded-sm w-64">
                                Upload Image
                                <input type="file" className='my-1' name='image' />
                            </label>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                className='my-4 bg-emerald-500 py-1 text-stone-100 w-1/2 rounded-md text-lg'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBlog