import Home from '@/components/Home';
import { Toaster } from 'react-hot-toast'
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllBlogs } from '@/components/Store/blogsReducer';
import { AppState } from '@/components/Store/store';
import { blogReducerType } from '@/types/types';
import Spinner from '@/components/Layout/Spinner';
import blogInstance from '@/instances/blogInstance';
import useSWR from 'swr';

const HomePage = () => {
    const dispath = useDispatch()
    // const fetchBlogs = useCallback(() => dispath(fetchAllBlogs()), [])
    const blogs = useSelector<AppState>(state => state.blogs) as blogReducerType

    return (
        <>
            <Home />
            <Toaster />
        </>
    )
}

export default HomePage