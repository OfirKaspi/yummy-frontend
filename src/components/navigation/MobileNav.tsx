import { CircleUserRound, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import MobileNavLinks from '@/components/navigation/MobileNavLinks'

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()

    return (
        <Sheet>
            <SheetTrigger className='bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center'>
                <Menu className='text-gray-600' />
            </SheetTrigger>
            <SheetContent side='right' className='space-y-5'>
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className='flex items-center font-bold gap-2'>
                            <CircleUserRound className='text-orange-500' />
                            {user?.name}
                        </span>
                    ) : (
                        <span>Welcome to Yummy!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className='flex flex-col gap-5'>
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            className='flex-1 font-bold bg-orange-500'
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </Button>
                    )
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav