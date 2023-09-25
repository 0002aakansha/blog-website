import { useDispatch } from "react-redux"
import Cards from "./Cards/Cards"
import Slider from "./Slider/Slider"
import { useEffect } from "react"
import { fetchAllBlogs } from "./Store/blogsReducer"

const Home = () => {
    // const dispath = useDispatch()
    // useEffect(() => {
    //     dispath(fetchAllBlogs())
    // }, [])

    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-4 mb-10">Trending</h1>
            <Slider />
            <Cards />
        </div>
    )
}

export default Home