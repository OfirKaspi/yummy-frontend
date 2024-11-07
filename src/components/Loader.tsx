import yummyFullLogo from "/yummyFullLogo.png"

type Props = {
    isFullScreen?: boolean
}

const Loader = ({ isFullScreen = false }: Props) => {
    return (
        <div className={`flex flex-col items-center justify-center ${isFullScreen && "h-screen"} space-y-4`}>
            <img src={yummyFullLogo} alt="yummy-logo" className="h-[200px] w-[200px] animate-bounce" />
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Loading...</span>
        </div>
    )
}

export default Loader