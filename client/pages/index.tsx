import { useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import { fetchAllBlogs } from '@/components/Store/blogsReducer';
import { useDispatch } from 'react-redux';
import Home from '@/components/Home';
import { Toaster } from 'react-hot-toast'

const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBlogs())
    }, [])


    return (
        <>
            <Layout>
                <Home />
            </Layout>
            <Toaster />
        </>
    )
}

export default HomePage