import { ChevronRight } from "lucide-react"

type Props = {
    isExpanded: boolean
}

const ExpandBtn = ({ isExpanded }: Props) => {
    return (
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
    )
}

export default ExpandBtn
