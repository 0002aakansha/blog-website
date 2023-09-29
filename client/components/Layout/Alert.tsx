import { removeCookie } from "@/auth/cookies"
import { deleteUserBlog } from "@/utils/blogActions"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"

const Alert = ({ isOpen, setAlertIsOpen, action }: { isOpen: boolean, setAlertIsOpen: (value: React.SetStateAction<boolean>) => void, action: { type: string, data?: any } }) => {

    const router = useRouter()
    const cancelRef = useRef()

    async function actionHandler() {
        if (action.type === 'logout') {
            removeCookie()
            router.push('/')
        }
        else if (action.type === 'delete') {
            const success = await deleteUserBlog(action.data)
            if (success) {
                toast.success('Deleted successfully!')
                router.push('/userblogs')
            }
            else toast.error('Error while deleting blog!')
        }
    }


    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef?.current?.value}
                onClose={() => setAlertIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {action.type === 'Logout' ? 'Logout' : 'Delete Blog'}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {`Are you sure? You can't undo this action afterwards.`}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={() => {
                                    setAlertIsOpen(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => {
                                    setAlertIsOpen(false)
                                    actionHandler()
                                }}
                                ml={3}
                            >
                                {action.type === 'logout' ? 'Logout' : 'Delete'}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>)
}

export default Alert