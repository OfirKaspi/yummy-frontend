import { ChevronRight } from "lucide-react"

type Props = {
    handleOnClick?: () => void
    text: string
    isExpanded?: boolean
}

const SeeAll = ({ handleOnClick, isExpanded = false, text }: Props) => {
    return (
        <div className="flex items-center justify-between cursor-pointer md:justify-normal md:gap-2 transition-all duration-300">
            <h4 className="text-lg">{text}</h4>
            <span className="flex items-center underline text-orange-500" onClick={handleOnClick ? handleOnClick : undefined}>
                {isExpanded ? 'See Less' : 'See All'}
                <ChevronRight
                    size={18}
                    className={` ${isExpanded ? 'rotate-180' : ''}`}
                />
            </span>
        </div >
    )
}

export default SeeAll