import Yummy from "/yummy.png"

type Props = {
    isFullScreen?: boolean
}

const Loader = ({ isFullScreen = false }: Props) => {
    return (
        <div className={`flex flex-col items-center justify-center ${isFullScreen && "h-screen"} space-y-4`}>
            <img src={Yummy} alt="yummy-logo" className="h-20 w-20 animate-bounce" />
            <span className="text-lg font-semibold text-gray-700">Loading...</span>
        </div>
    )
}

export default Loader