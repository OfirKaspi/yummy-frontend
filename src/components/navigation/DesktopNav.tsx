import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { Home, ShoppingBag, User, Utensils } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DesktopNav = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    const location = useLocation()
    const isActive = (path: string) => location.pathname === path

    const navLinks = [
        { to: "/", icon: Home, tooltip: "Home Page" },
        { to: "/my-orders", icon: ShoppingBag, tooltip: "Order Status" },
        { to: "/my-restaurant", icon: Utensils, tooltip: "Manage Restaurant" },
        { to: "/my-profile", icon: User, tooltip: "User Profile" },
    ]

    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <TooltipProvider>
                    {navLinks.map(({ to, icon: Icon, tooltip }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center font-medium gap-2 ${isActive(to) ? "border-b-4 border-orange-500 pb-2" : ""}`}
                        >
                            <Tooltip>
                                <TooltipTrigger>
                                    <Icon className="text-orange-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </Link>
                    ))}
                </TooltipProvider>
                {isAuthenticated ? (
                    <Button className="font-medium" onClick={() => logout()}>
                        Log Out
                    </Button>
                ) : (
                    <Button className="font-bold bg-orange-500" onClick={() => loginWithRedirect()}>
                        Log In
                    </Button>
                )}
            </div>
        </nav>
    )
}

export default DesktopNav
