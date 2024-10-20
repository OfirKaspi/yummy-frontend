import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@/components/ui/button"
import UsernameMenu from "@/components/UsernameMenu"
import { Link } from "react-router-dom"

const MainNavDesktop = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/my-orders" className="font-bold hover:text-orange-500" >
                        Order Status
                    </Link>
                    <UsernameMenu />
                </>
            ) : (
                <Button
                    variant='ghost'
                    className="font-bold hover:text-orange-500 hover:bg-white"
                    onClick={async () => await loginWithRedirect()}
                >
                    Log In
                </Button>
            )}
        </span>
    )
}

export default MainNavDesktop