import { useNavigate } from "react-router-dom"
import ExpandBtn from "@/components/ExpandBtn"
import { ChevronRight } from "lucide-react"

type Props = {
    handleOnClick: () => void
    text: string
    isExpanded?: boolean
}

const SeeAll = ({ handleOnClick, isExpanded = false, text }: Props) => {
    return (
        <div className="flex items-end justify-between md:justify-normal md:gap-2">
            <h2 className="text-xl">{text}</h2>
            <div onClick={handleOnClick}>
                <span className="flex items-center gap-1">
                    <span className="md:underline md:text-blue-500">
                        {isExpanded ? 'See Less' : 'See All'}
                    </span>
                    <ChevronRight
                        className={`text-gray-400 transform transition-transform duration-300 
                                    ${isExpanded ? 'rotate-180' : ''}`
                        }
                    />
                </span>
            </div>
        </div>
    )
}

export default SeeAll