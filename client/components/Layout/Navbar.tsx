import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast/headless'
import { Toaster } from 'react-hot-toast'

const Navbar = () => {
    const router = useRouter()
    const [isLoggedin, setisLoggedin] = useState(false)

    useEffect(() => {
        console.log(localStorage.getItem('token'));
        
        localStorage.getItem('token') ? setisLoggedin(true) : setisLoggedin(false)
    }, [])

    function checkUser() {
        if (isLoggedin) router.push('/newblog')
        else alert('Please login first!')
        
    }

    return (
        <>
            <header className='px-10 py-4'>
                <nav className='flex justify-between'>
                    <div>
                        <h1 className='font-bold uppercase text-xl'>MAGDESIGN</h1>
                    </div>
                    <ul className='flex'>
                        <li
                            className='font-semibold text-md border-2 border-emerald-500 text-emerald-500 rounded-3xl px-8 py-[.3rem] mx-2 cursor-pointer'
                            onClick={checkUser}
                        >
                            Create Blog
                        </li>
                        {
                            !isLoggedin && (<Link
                                href='/login'
                                className='font-semibold text-md bg-emerald-500 border-2 border-emerald-500 text-stone-100 rounded-3xl px-10 py-[.3rem] mx-2'
                            >
                                Login
                            </Link>)
                        }
                    </ul>
                </nav>
            </header>
            <Toaster />
        </>
    )
}

export default Navbar