import { Swiper, SwiperSlide } from "swiper/react"
import { useSelector } from 'react-redux'
import { AppState } from "../Store/store";
import { BlogType } from '@/types/types';
import { Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {

  const blog = useSelector<AppState>(state => state.blogs.blogs) as BlogType[]
  // console.log(blog);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper container"
    >
      {
        blog.map(blog => {
          if (blog.isFeatured === true) {
            return <SwiperSlide
              key={blog._id}
            >
              <div className='flex items-center'>
                <div className="w-1/2">
                  <img src={blog.image} alt="" className="w-full" />
                </div>
                <div className=" w-1/2 px-10">
                  <h1
                    className="text-3xl font-bold text-stone-800 leading-10"
                  >{blog.title}</h1>
                  <p className="h-12 overflow-hidden text-zinc-600 my-3">{blog.body}</p>
                </div>
              </div>
            </SwiperSlide>
          }
        })
      }
    </Swiper>
  )
}

export default Slider