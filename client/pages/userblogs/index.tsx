import Alert from '@/components/Layout/Alert'
import Layout from '@/components/Layout/Layout'
import UpdateModal from '@/components/Layout/updateModal'
import { AppState } from '@/components/Store/store'
import { fetchUserBlogs } from '@/components/Store/userReducer'
import { BlogType, userReducerType } from '@/types/types'
import { convertToBase64 } from '@/utils/convertTobase64'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserBlogs = () => {

  const router = useRouter()
  const [_id, setID] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isAlertOpen, setAlertIsOpen] = useState(false)

  const [isopen, setisopen] = useState(false)
  const dispatch = useDispatch()
  const blogs = useSelector<AppState>(state => state.user.user.blogs) as BlogType[]
  const user = useSelector<AppState>(state => state.user) as userReducerType

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  function errorHandler() {
    if (user.error !== '') {
      // toast.error(user.error)
      router.push('/login')
    }
  }


  return (
    <>
      {
        user.error === '' ? (
          <>
            <Layout>
              {
                !user.loading ? (
                  <div className='grid grid-cols-3 gap-4 container mx-auto mt-[6rem]'>
                    {
                      blogs.length > 0 ? blogs.map(blog => (
                        <div key={blog._id}>
                          <Link href={`/blog/${blog._id}`}>
                            <div className='p-4 cursor-pointer'>
                              <div>
                                <Image src={convertToBase64(blog?.image?.data && blog?.image?.data)} alt='' className='rounded-md w-full object-contain h-48' width={100} height={100} />
                              </div>
                              <div className='py-4'>
                                <h1 className='font-bold text-stone-800 text-lg leading-6 h-12 overflow-hidden'>{blog.title}</h1>
                                <p className='text-zinc-500 h-12 overflow-hidden my-2'>{blog.body}</p>
                              </div>
                            </div>
                          </Link>
                          <button
                            className='bg-red-500 w-15 px-4 py-1 text-stone-100 text-md rounded mx-2'
                            onClick={() => {
                              setID(blog._id)
                              setAlertIsOpen(true)
                            }}
                          >
                            Delete
                          </button>

                          <button
                            className='bg-green-600 w-15 px-4 py-1 text-stone-100 text-md rounded mx-2'
                            onClick={() => {
                              setisopen(true)
                              setID(blog._id)
                              setImage(blog.image)
                              setTitle(blog.title)
                              setBody(blog.body)
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      )) : <h1 className='text-lg text-stone-800 font-semibold'>You have not created any blogs!</h1>
                    }
                  </div>
                ) : (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    display='block'
                    margin='10rem auto'
                  />
                )
              }
            </Layout>
            <UpdateModal isopen={isopen} setisopen={setisopen} _id={_id} title={title} body={body} setTitle={setTitle} setBody={setBody} image={image} setImage={setImage} />

            <Alert isOpen={isAlertOpen} setAlertIsOpen={setAlertIsOpen} action={{ type: 'delete', data: _id }} />
          </>
        ) : errorHandler()
      }
    </>
  )
}

export default UserBlogs