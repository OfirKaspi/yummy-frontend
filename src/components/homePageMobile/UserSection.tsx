import { useSelector } from "react-redux"
import { ChevronDown } from "lucide-react"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import { getGreeting } from "@/utils/getGreeting"
import { selectUser } from "@/store/user/userSelectors"
import { useState, useEffect } from "react"

const UserSection = () => {
    const currentUser = useSelector(selectUser)
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        setGreeting(getGreeting())
    }, [])

    return (
        <>
            <MainNavMobile isHomePage>
                <div className="flex justify-center flex-col text-sm">
                    <span className="text-orange-500 font-medium">DELIVER TO</span>
                    <span className="flex items-center text-gray-600 gap-1">
                        My Office
                        <ChevronDown size={16} />
                    </span>
                </div>
            </MainNavMobile>
            <div className="flex items-center gap-1">
                <span>
                    Hey
                    {currentUser?.name ? ` ${currentUser.name},` : ","}
                </span>
                <span className="font-bold"> {greeting}!</span>
            </div>
        </>
    )
}

export default UserSection
