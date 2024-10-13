import { useGetMyUser } from "@/api/MyUserApi"
import MobileNav from "../MobileNav"
import { SkeletonProfile } from "../ui/skeleton"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import ShoppingBagCmp from "../ShoppingBagCmp"

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

    if (isLoading) {
        <SkeletonProfile />
    }

    return (
        <>
            <div className="flex gap-3">
                <MobileNav />
                <div className="flex justify-center flex-col text-sm">
                    <span className="text-orange-500 font-medium">DELIVER TO</span>

                    {/* LATER USE GEO LOCATION FOR BETTER UX */}
                    <span className="flex items-center text-gray-600 gap-1">
                        My Office
                        <ChevronDown size={16} />
                    </span>
                </div>
                <div className="ml-auto flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 relative text-white">
                    <ShoppingBagCmp />
                </div>
            </div>
            <div>
                <span>Hey {currentUser?.name},</span>
                <span className="font-bold"> {greeting}!</span>
            </div>
        </>
    )
}

export default UserSection