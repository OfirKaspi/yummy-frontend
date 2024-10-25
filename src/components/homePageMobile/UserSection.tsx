import { useGetMyUser } from "@/hooks/myUser/useGetMyUser"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import { getGreeting } from "@/utils/getGreeting"

const UserSection = () => {
    const { currentUser, isLoading } = useGetMyUser()
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        setGreeting(getGreeting())
    }, [])

    return (
        <>
            <MainNavMobile isHomePage>
                <div className="flex justify-center flex-col text-sm">
                    <span className="text-orange-500 font-medium">DELIVER TO</span>

                    {/* LATER USE GEO LOCATION FOR BETTER UX */}
                    <span className="flex items-center text-gray-600 gap-1">
                        My Office
                        <ChevronDown size={16} />
                    </span>
                </div>
            </MainNavMobile>
            <div className="flex items-center gap-1">
                <span>Hey</span>
                {isLoading || !currentUser ? (
                    <span>Guest,</span>
                ) : (
                    <span>{currentUser.name},</span>
                )}
                <span className="font-bold"> {greeting}!</span>
            </div>
        </>
    )
}

export default UserSection