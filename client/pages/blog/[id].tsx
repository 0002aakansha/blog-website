import { useRouter } from "next/router"
import profile from '../../assets/User-Profile-PNG-Image.png'
import Image from "next/image"
import Layout from "@/components/Layout/Layout"
import blogInstance from "@/instances/blogInstance"
import { BlogType } from "@/types/types"
import { convertToBase64 } from "@/utils/convertTobase64"
import { convertdate } from "@/utils/convertDate"

const Blog = ({ blog }: { blog: BlogType }) => {
    const router = useRouter()

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center container mx-auto my-5">
                <div className='my-2'>
                    <Image src={profile} alt="" width={100} height={100} className='w-42 mx-auto' />
                    <span className='text-zinc-700 font-semibold text-center block text-lg'>{blog.author}</span>
                </div>
                <div>
                    <p className="text-lg font-medium text-stone-500">{convertdate(blog.createdAt)}</p>
                </div>
                <div>
                    <h1 className="text-center text-4xl font-bold my-10 leading-[1.5] p-2">{blog.title}</h1>
                    <div className="mt-4 mb-8">
                        <Image src={convertToBase64(blog.image.data)} alt="" width={100} height={100} className="w-full mx-auto rounded-md" />
                    </div>
                    <p className="text-xl leading-9 text-stone-500">{blog.body}</p>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const { data } = await blogInstance({
        url: `/${params.id}`,
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        }
    })
    console.log(data);

    if (data.success) {
        return {
            props: { blog: data.blog }
        }
    }
    else {
        return {
            notFound: true
        }
    }
}

export default Blog