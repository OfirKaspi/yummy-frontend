import yummyFullLogo from "/yummyFullLogo.png"
import motorImage from "@/assets/motorImage.jpg"
import google from "@/assets/google.svg"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import useDeviceType from "@/hooks/useDeviceType"
import { User } from "lucide-react"

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
            <div className="flex flex-col items-center h-[100vh] gap-8 p-10">
                <div className="h-[180px] w-[200px] ">
                    <img src={yummyFullLogo} alt="yummy-logo" />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-slate-900 text-3xl font-medium">Welcome to Yummy</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">You are just one step away from your favorite restaurants</span>
                </div>
                <div className="flex flex-col gap-5 w-[100%]">
                    <button className="flex items-center gap-4 justify-start h-[64px] border-2  rounded-md" onClick={onLogin}>
                        <img src={google} alt="google-icon" className="h-[60px] w-[60px] rounded-md  p-2 border-r-2" />
                        <span className="font-medium">Login / Register with Google</span>
                    </button>
                    <button className="flex items-center gap-4 justify-start h-[64px] border-2 rounded-md ">
                        <span className="flex items-center justify-center h-[60px] w-[60px] border-r-2">
                            <User size={40} />
                        </span>
                        <Link to='/' className="font-medium">Continuo as a Guest</Link>
                    </button>
                </div>
            </div >
        )
    }

    if (isMobile) {
        return (
            <Content />
        )
    }

    return (
        <div className="grid grid-cols-[500px_1fr]">
            <Content />
            <img src={motorImage} alt="login-image-laptop" className="h-svh object-cover" />
        </div>
    )
}

export default LoginPage