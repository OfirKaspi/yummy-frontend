import { useState } from 'react'
import { matchPath, useLocation, Link } from 'react-router-dom'
import { Menu, User } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import { navLinks } from '@/config/nav-links-config'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import SearchFilter from '@/components/search/SearchFilter'

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    if (matchPath('/search/:city', location.pathname)) {
        return <SearchFilter />
    }

    const isActive = (path: string) => location.pathname === path

    const handleLinkClick = () => setIsOpen(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                        <div className="flex flex-col items-start gap-4">
                            {navLinks.map(({ to, icon: Icon, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={handleLinkClick} // Close Sheet when link is clicked
                                    className={`flex items-center font-medium gap-2 ${isActive(to) ? 'text-orange-500' : ''}`}
                                >
                                    <Icon className="text-orange-500" />
                                    {label}
                                </Link>
                            ))}
                            <Button className="font-medium w-full" onClick={() => { logout(); setIsOpen(false); }}>
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <Button className="flex-1 font-bold bg-orange-500" onClick={() => { loginWithRedirect(); setIsOpen(false); }}>
                            Log In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
