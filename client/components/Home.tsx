import Cards from "./Cards/Cards"
import Slider from "./Slider/Slider"
import Layout from "./Layout/Layout"
import useSWR from "swr"
import blogInstance from "@/instances/blogInstance"
import { Spinner } from "@/utils/import"
import toast from "react-hot-toast/headless"

const Home = () => {
    const { data, error, isLoading } = useSWR('/', async (...args) => {
        const { data } = await blogInstance(...args)
        return data
    })

    if (error) return toast.error('Error while fetching data!')

    return (
        <>
            {
                isLoading ? <Spinner /> : (
                    <Layout>
                        <h1 className="font-bold text-3xl text-center mt-4 mb-10">Trending</h1>
                        <Slider Blogs={data.blog} />
                        <Cards Blogs={data.blog} />
                    </Layout>
                )
            }
        </>
    )
}

export default Home