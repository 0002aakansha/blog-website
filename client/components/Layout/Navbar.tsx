import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BlogModal from './Modal'
import toast from 'react-hot-toast'
import { getCookie, removeCookie } from '@/auth/cookies'
import { useRouter } from 'next/router'
import Alert from './Alert'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isAlertOpen, setAlertIsOpen] = useState(false)
    const [action, setAction] = useState('')

    const [isLoggedin, setisLoggedin] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getCookie() ? setisLoggedin(true) : setisLoggedin(false)
    }, [])

    function checkUser() {
        if (isLoggedin) {
            setIsOpen(true)
        }
        else toast.error('Please login first!')
    }

    function logoutHandler() {
        setAlertIsOpen(true)
        // setisLoggedin(false)
        // removeCookie()
        // router.push('/')
    }

    return (
        <>
            <header className='px-10 py-4 border-b-2 border-b-stone-200'>
                <nav className='flex justify-between'>
                    <div>
                        <Link href={'/'}>
                            <h1 className='font-bold uppercase text-xl'>MAGDESIGN</h1>

                        </Link>
                    </div>
                    <ul className='flex'>
                        <li
                            className='font-semibold text-lg text-emerald-800 cursor-pointer py-[.3rem] mx-4'
                            onClick={checkUser}
                        >
                            Create Blog
                        </li>
                        {isLoggedin && (<li
                            className='font-semibold text-lg text-emerald-800 cursor-pointer py-[.3rem] mx-4'
                        >
                            <Link href='/userblogs'>Your Blogs</Link>
                        </li>)
                        }
                        {
                            !isLoggedin && (<Link
                                href='/login'
                                className='font-semibold text-md bg-emerald-500 border-2 border-emerald-500 text-stone-100 rounded-3xl px-4 py-[.3rem] mx-4'
                            >
                                Login
                            </Link>)
                        }
                        {
                            isLoggedin && (<li
                                className='font-semibold text-md bg-emerald-500 border-2 border-emerald-500 text-stone-100 rounded-3xl px-4 py-[.3rem] mx-4 cursor-pointer'
                                onClick={logoutHandler}
                            >
                                Logout
                            </li>)
                        }
                    </ul>
                </nav>
            </header >
            {isOpen && <BlogModal isopen={isOpen} setisopen={setIsOpen} />
            }
            {isAlertOpen && <Alert isOpen={isAlertOpen} setAlertIsOpen={setAlertIsOpen} action={{type: 'logout'}} />}
        </>
    )
}

export default Navbar