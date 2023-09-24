import Cards from "./Cards/Cards"
import CreateBlog from "./CreateBlog/CreateBlog"
import Slider from "./Slider/Slider"

const Home = () => {
    
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-4 mb-10">Trending</h1>
                <Slider />
                <Cards />
        </div>
    )
}

export default Home