import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getGreeting } from "@/utils/getGreeting"
import { selectUser } from "@/store/user/userSelectors"

const UserSection = () => {
    const currentUser = useSelector(selectUser)
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        setGreeting(getGreeting())
    }, [])

    return (
        <div className="flex items-center gap-1">
            <span>
                Hey
                {currentUser?.name ? ` ${currentUser.name},` : ","}
            </span>
            <span className="font-bold"> {greeting}!</span>
        </div>
    )
}

export default UserSection
