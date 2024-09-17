import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"
import { Loader2 } from "lucide-react"

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <Loader2 className="h-20 w-20 animate-spin text-orange-500" />
                <span className="text-lg font-semibold text-gray-700">Loading...</span>
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute