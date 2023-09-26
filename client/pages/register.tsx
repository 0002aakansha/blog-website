import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { register } from '@/components/Store/userReducer'
import { AppState } from '@/components/Store/store'
import { userReducerType } from '@/types/types'
import { useRouter } from 'next/router'

const Register = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector<AppState>(state => state.user) as userReducerType
    const dispatch = useDispatch()

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (name !== '' && email !== '' && password !== '') {
            dispatch(register({ name, email, password }))
        }
        else toast.error('All fields are required!')
    }

    useEffect(() => {
        if (user.isActive === true) router.push('/')
        else if (user.error !== '') toast.error(user.error)
    }, [user.isActive, user.error])

    return (
        <>
            {user.isActive && toast.success('Account Created!')}
            <div className='h-screen flex flex-col justify-center items-center bg-stone-200 text-stone-800 tracking-wider'>
                <div className='bg-stone-50 p-8 rounded-md w-2/5'>
                    <h1 className='py-4 text-center text-emerald-600 font-semibold text-2xl'>Register</h1>
                    <hr />
                    <form action="" onSubmit={submitHandler}>
                        <div className='flex flex-col my-4'>
                            <input type="text" placeholder='Full Name' className='border-b border-stone-300 p-3 bg-transparent outline-none' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col my-4'>
                            <input type="email" placeholder='Email' className='border-b border-stone-300 p-3 bg-transparent outline-none' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col my-4'>
                            <input type="password" placeholder='Password' className='border-b border-stone-300 p-3 bg-transparent outline-none' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='flex w-full justify-center my-4'>
                            <button
                                className='bg-emerald-500 px-4 py-2 w-1/2 text-stone-100 text-lg tracking-wider rounded-md'
                                disabled={user.loading ? true : false}
                            >{user.loading ? 'Creating account...' : 'Register'}</button>
                        </div>
                    </form>
                    <p className='text-center text-stone-600 my4'>Already have an account? <Link href='/login' className='underline text-blue-900 font-semibold'>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register