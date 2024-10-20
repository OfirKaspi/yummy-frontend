import { useGetMyUser } from "@/api/MyUserApi"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import MainNavMobile from "../navigation/MainNavMobile"

const UserSection = () => {
    const { currentUser, isLoading } = useGetMyUser()
    const [greeting, setGreeting] = useState("")

    const getGreeting = () => {
        const currentHour = new Date().getHours()

        if (currentHour >= 0 && currentHour < 5) {
            return "Good night"
        } else if (currentHour < 12) {
            return "Good morning"
        } else if (currentHour < 18) {
            return "Good afternoon"
        } else {
            return "Good evening"
        }
    }

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
                    <Skeleton className="w-24 h-5" />
                ) : (
                    <span>{currentUser.name},</span>
                )}
                <span className="font-bold"> {greeting}!</span>
            </div>
        </>
    )
}

export default UserSection