import { BlogType } from '@/types/types'
import { convertToBase64 } from '@/utils/convertTobase64'
import Image from 'next/image'
import profile from '../../assets/User-Profile-PNG-Image.png'
import Link from 'next/link'

const Card = ({ blog }: { blog: BlogType }) => {

  return (
    <Link href={`/blog/${blog._id}`}>
      <div className='p-4 cursor-pointer'>
        <div>
          <Image src={convertToBase64(blog.image?.data)} alt='' className='rounded-md w-full' width={100} height={100} />
        </div>
        <div className='py-4'>
          <h1 className='font-bold text-stone-800 text-lg leading-7 h-12 overflow-hidden'>{blog.title}</h1>
          <p className='text-zinc-500 h-12 overflow-hidden my-2'>{blog.body}</p>
          <div className='my-2'>
            <Image src={profile.src} alt="" width={100} height={100} className='w-12 inline-block' />
            <span className='text-zinc-900 font-semibold'>{blog.author}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}



export default Card