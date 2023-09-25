import { createBlog, fetchAllBlogs } from '@/components/Store/blogsReducer';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/store';
import { blogReducerType } from '@/types/types';
import { useRouter } from 'next/router';

const BlogModal = ({ isopen, setisopen }: { isopen: boolean, setisopen: (value: React.SetStateAction<boolean>) => void }) => {
    const router = useRouter()
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const [image, setimage] = useState<File | null>(null);
    const dispatch = useDispatch()
    const blogs = useSelector<AppState>(state => state.blogs) as blogReducerType

    function submitHandler(e: FormEvent) {
        e.preventDefault()

        if (title !== '' && body !== '' && image !== null) {

            const formData = new FormData()
            formData.append('title', title)
            formData.append('body', body)
            formData.append('image', image)

            dispatch(createBlog(formData))
        }
        else toast.error('All fields are required!')
    }

    useEffect(() => {
        if (blogs.created === true) {
            toast.success('Created Successfully!')
            router.push('/')
            setisopen(false)
            dispatch(fetchAllBlogs())
        }
        else if (blogs.error !== '') toast.error(blogs.error)
    }, [blogs.created, blogs.error])

    return (
        <Modal isOpen={isopen} onClose={() => setisopen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit Your Blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form action="" onSubmit={submitHandler} encType='multipart/form-data' >
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='text-stone-900'>Title</label>
                            <input type="text" className='bg-transparent border-b-2 p-2 outline-none' value={title} onChange={e => settitle(e.target.value)} />
                        </div>
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='text-stone-900'>Description</label>
                            <textarea className='bg-transparent border-b-2 p-2 outline-none' value={body} onChange={e => setbody(e.target.value)} />
                        </div>
                        <div className='my-4'>
                            <label className="bg-blue-500 flex flex-col text-md text-stone-50 px-2 rounded-sm w-64">
                            </label>
                            Upload Image
                            <input type="file" className='my-1' name='image' onChange={e => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setimage(e.target.files[0]);
                                }
                            }} />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                className='my-4 bg-emerald-500 py-1 text-stone-100 w-1/2 rounded-md text-lg'>
                                {blogs.loading ? 'Sending Response...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default BlogModal