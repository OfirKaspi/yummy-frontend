import { Loader2 } from 'lucide-react'

type Props = {
    isFullScreen?: boolean
}

const Loader = ({ isFullScreen = false }: Props) => {
    return (
        <div className={`flex flex-col items-center justify-center ${isFullScreen && "h-screen"} space-y-4`}>
            <Loader2 className="h-20 w-20 animate-spin text-orange-500" />
            <span className="text-lg font-semibold text-gray-700">Loading...</span>
        </div>
    )
}

export default Loader