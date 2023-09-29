import { FormEvent, useEffect, useState } from 'react'
import { Link, toast } from '../utils/import'
import { useDispatch, useSelector } from 'react-redux'
import { userReducerType } from '@/types/types'
import { AppState } from '@/components/Store/store'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import blogInstance from '@/instances/blogInstance'
import { login } from '@/components/Store/userReducer'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector<AppState>(state => state.user) as userReducerType
    const dispatch = useDispatch()

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (email !== '' && password !== '') {
            dispatch(login({ email, password }))
        }
        else toast.error('All fields are required!')
    }

    useEffect(() => {
    if (user.isActive === true) router.push('/')
    else if (user.error !== '') toast.error(user.error)
    }, [user.isActive, user.error])

    // const { data, error, isLoading } = useSWR('/', async (...args) => {
    //     const {data} = await blogInstance(...args)
    //     return data
    // })

    // if (error) return <h1>Something went wrong!</h1>
    // if (isLoading) return <h1>Loading...</h1>
    // if(data) return <p>data received</p>

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-stone-200 text-stone-800 tracking-wider'>
            <div className='bg-stone-50 p-8 rounded-md w-2/5'>
                <h1 className='py-4 text-center text-emerald-600 font-semibold text-2xl'>Login</h1>
                <hr />
                <form action="" onSubmit={(submitHandler)}>
                    <div className='flex flex-col my-4'>
                        <input type="email" placeholder='Email' className='border-b border-stone-300 p-4 outline-none  bg-transparent' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col my-4'>
                        <input type="password" placeholder='Password' className='border-b border-stone-300 p-4 outline-none bg-transparent' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='flex w-full justify-center my-4'>
                        <button className='bg-emerald-500 px-4 py-2 w-1/2    text-stone-100 text-lg tracking-wider rounded-md'>{user.loading ? 'Fetching details...' : 'Login'}</button>
                    </div>
                </form>
                <p className='text-center text-stone-600 my4'>{`Don't have an account?`} <Link href='/register' className='underline text-blue-900 font-semibold'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login