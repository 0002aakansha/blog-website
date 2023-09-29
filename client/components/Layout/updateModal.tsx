import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, updateBlog } from '../Store/blogsReducer';
import { AppState } from '../Store/store';
import { blogReducerType } from '@/types/types';
import { fetchUserBlogs } from '../Store/userReducer';
import { useRouter } from 'next/router';

interface Props {
    isopen: boolean,
    _id: string,
    title: string,
    body: string,
    image: File | null,
    setisopen: (value: React.SetStateAction<boolean>) => void,
    setImage: (value: React.SetStateAction<File | null>) => void,
    setTitle: (value: React.SetStateAction<string>) => void,
    setBody: (value: React.SetStateAction<string>) => void
}

const UpdateModal = ({ isopen, setisopen, _id, title, body, setTitle, setBody, image, setImage }: Props) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const blogs = useSelector<AppState>(state => state.blogs) as blogReducerType

    function submitHandler(e: FormEvent) {
        e.preventDefault()

        if (title !== '' && body !== '') {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('body', body)
            formData.append('image', image)

            dispatch(updateBlog({ _id, formData }))
        }
        else toast.error(`All fields are required!`)
    }

    useEffect(() => {
        if (blogs.updated) {
            toast.success('updated successfully')
            setisopen(false)
            router.push('/userblogs')
        }
        else if (blogs.error !== '') toast.error(blogs.error)
    }, [blogs.updated])

    return (
        <Modal isOpen={isopen} onClose={() => setisopen(false)} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit Your Blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form action="" onSubmit={submitHandler} encType='multipart/form-data' >
                        <div className='my-4'>
                            <label className="bg-blue-500 flex flex-col text-md text-stone-50 px-2 rounded-sm w-64">
                            </label>
                            Upload Image
                            <input type="file" className='my-1' name='image' onChange={e => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImage(e.target.files[0]);
                                }
                            }} />
                        </div>
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='text-stone-900'>Title</label>
                            <input type="text" className='bg-transparent border-b-2 p-2 outline-none' value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='flex flex-col my-4'>
                            <label htmlFor="" className='text-stone-900'>Description</label>
                            <textarea className='bg-transparent border-b-2 p-2 outline-none' value={body} onChange={e => setBody(e.target.value)} />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                className='my-4 bg-emerald-500 py-1 text-stone-100 w-1/2 rounded-md text-lg'>
                                {blogs.loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export default UpdateModal