import { Swiper, SwiperSlide } from "swiper/react"
import { BlogType } from '@/types/types';
import { Autoplay, Pagination } from "swiper/modules"
import profile from '../../assets/User-Profile-PNG-Image.png';

import 'swiper/css';
import 'swiper/css/pagination';
import { convertToBase64 } from "@/utils/convertTobase64";
import Image from "next/image";
import Link from "next/link";

const Slider = ({ Blogs }: { Blogs: BlogType[] }) => {

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
        Blogs?.map(blog => {
          if (blog.isFeatured === true) {
            return (
              <SwiperSlide key={blog._id}>
                <Link href={`/blog/${blog._id}`} className="cursor-pointer">
                  <div className='flex items-center'>
                    <div className="w-1/2">
                      <Image src={convertToBase64(blog.image.data)} alt="" className="w-full" width={100} height={100} />
                    </div>
                    <div className=" w-1/2 px-10">
                      <h1
                        className="text-3xl font-bold text-stone-800 leading-10"
                      >{blog.title}</h1>
                      <p className="h-12 overflow-hidden text-zinc-600 my-3">{blog.body}</p>
                      <div className='my-2'>
                        <Image src={profile.src} alt="" className='w-12 inline-block' width={100} height={100} />
                        <span className='text-zinc-900 font-semibold'>{blog.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          }
        })
      }
    </Swiper>
  )
}

export default Slider