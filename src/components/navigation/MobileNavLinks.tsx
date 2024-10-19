import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { Home, ShoppingBag, User, Utensils } from "lucide-react"

const MobileNavLinks = () => {
    const { logout } = useAuth0()
    const location = useLocation()
    const isActive = (path: string) => location.pathname === path

    return (
        <>
            <Link
                to="/"
                className={`flex items-center font-medium gap-2 ${isActive("/") ? "text-orange-500" : ""}`}
            >
                <Home className='text-orange-500' />
                Home
            </Link>
            {/* <Link
                to="/search"
                className={`flex items-center font-medium gap-2 ${isActive("/search") ? "text-orange-500" : ""}`}
            >
                <Search className='text-orange-500' />
                Search
            </Link> */}
            <Link
                to="/my-orders"
                className={`flex items-center font-medium gap-2 ${isActive("/my-orders") ? "text-orange-500" : ""}`}
            >
                <ShoppingBag className='text-orange-500' />
                Order Status
            </Link>
            <Link
                to="/my-restaurant"
                className={`flex items-center font-medium gap-2 ${isActive("/my-restaurant") ? "text-orange-500" : ""}`}
            >
                <Utensils className='text-orange-500' />
                Manage Restaurant
            </Link>
            <Link
                to="/my-profile"
                className={`flex items-center font-medium gap-2 ${isActive("/my-profile") ? "text-orange-500" : ""}`}
            >
                <User className='text-orange-500' />
                User Profile
            </Link>
            <Button
                className="flex items-center font-medium"
                onClick={() => logout()}
            >
                Log Out
            </Button>
        </>
    )
}

export default MobileNavLinks