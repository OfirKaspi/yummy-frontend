import { matchPath, useLocation, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Menu, User } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import SearchFilter from '@/components/search/SearchFilter'
import { navLinks } from '@/config/nav-links-config'

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    const location = useLocation()

    if (matchPath('/search/:city', location.pathname)) {
        return <SearchFilter />
    }

    const isActive = (path: string) => location.pathname === path

    return (
        <Sheet>
            <SheetTrigger className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center">
                <Menu className="text-gray-600" />
            </SheetTrigger>
            <SheetContent side="right" className="space-y-5">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <User className="text-orange-500" />
                            {user?.name}
                        </span>
                    ) : (
                        <span>Welcome to Yummy!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-5">
                    {isAuthenticated ? (
                        <nav className="flex flex-col items-start gap-4">
                            <TooltipProvider>
                                {navLinks.map(({ to, icon: Icon, tooltip, label }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={`flex items-center font-medium gap-2 ${isActive(to) ? 'text-orange-500' : ''}`}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon className="text-orange-500" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {label}
                                    </Link>
                                ))}
                            </TooltipProvider>
                            <Button className="font-medium w-full" onClick={() => logout()}>
                                Log Out
                            </Button>
                        </nav>
                    ) : (
                        <Button className="flex-1 font-bold bg-orange-500" onClick={() => loginWithRedirect()}>
                            Log In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
