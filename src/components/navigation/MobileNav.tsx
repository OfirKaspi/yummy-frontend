import { useState } from 'react'
import { matchPath, useLocation, Link } from 'react-router-dom'
import { Menu, User } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import { navLinks } from '@/config/nav-links-config'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import SearchFilter from '@/components/search/SearchFilter'
import DarkModeSwitch from '@/components/DarkModeSwitch'
import LogoutButton from '@/components/navigation/LogoutButton'

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    if (matchPath('/search/:city', location.pathname)) {
        return <SearchFilter />
    }

    const isActive = (path: string) => location.pathname === path

    const handleLinkClick = () => setIsOpen(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="bg-slate-100 dark:bg-gray-500 rounded-full w-12 h-12 flex items-center justify-center">
                <Menu className="text-gray-800 dark:text-gray-200" />
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
                <DarkModeSwitch />
                <SheetDescription className="flex flex-col gap-5">

                    {isAuthenticated ? (
                        <div className="flex flex-col items-start gap-4">
                            {navLinks.map(({ to, icon: Icon, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={handleLinkClick}
                                    className={`flex items-center font-medium gap-2 ${isActive(to) ? 'text-orange-500' : 'text-gray-800 dark:text-gray-200 '}`}
                                >
                                    <Icon className="text-orange-500" />
                                    {label}
                                </Link>
                            ))}
                            <LogoutButton close={() => setIsOpen(false)} />
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
