import yummyFullLogo from "/yummyFullLogo.png"
import loginImagePhone from "@/assets/loginImagePhone.jpg"
import loginImageLaptop from "@/assets/loginImageLaptop.jpg"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import useDeviceType from "@/hooks/useDeviceType"

const LoginPage = () => {
    const { isMobile } = useDeviceType()
    const { loginWithRedirect } = useAuth0()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: '/'
            }
        })
    }

    const Content = () => {
        return (
            <>
                <img src={yummyFullLogo} alt="yummy-logo" className="h-[300px] w-full object-contain" />
                <h1 className="text-orange-500 text-3xl md:text-4xl flex flex-col items-center font-medium -mt-14 md:-mt-10">
                    <span>Login / Register</span>
                    <span>to your account</span>
                </h1>
                <div className="flex flex-col gap-5">
                    <Button variant="default" className="bg-orange-500 md:text-lg" onClick={onLogin}>Login / Register</Button>
                    <Button variant="outline" className="md:text-lg">
                        <Link to='/'>
                            Continuo as a Guest
                        </Link>
                    </Button>
                </div>
            </>
        )
    }

    if (isMobile) {
        return (
            <div className="flex flex-col justify-start h-full w-full p-10 gap-10">
                <Content />
            </div>
        )
    }

    return (
        <div className="h-svh w-svw grid grid-cols-[1fr_500px_1fr] bg-white">
            <img src={loginImageLaptop} alt="login-image-laptop" className="h-svh object-cover" />
            <div className="flex flex-col justify-start border-x-8 border-orange-500 h-full w-full p-10 gap-10">
                <Content />
            </div>
            <img src={loginImagePhone} alt="login-image-phone" className="h-svh mt-auto object-cover" />
        </div>
    )
}

export default LoginPage