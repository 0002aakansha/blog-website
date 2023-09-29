import { getCookie } from "@/auth/cookies"
import blogInstance from "@/instances/blogInstance"
import toast from "react-hot-toast"

export const deleteUserBlog = async (_id: string) => {
    const { data } = await blogInstance({
        url: '/',
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            Authorization: getCookie()
        },
        data: JSON.stringify({ _id })
    })
    return data.success
}