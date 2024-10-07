import { ChevronRight } from "lucide-react"

type Props = {
    isOpen: boolean
}

const ExpandBtn = ({ isOpen }: Props) => {
    return (
        <span className="flex items-center gap-1">
            {isOpen ? 'See Less' : 'See All'}
            <ChevronRight
                className={`text-gray-400 transform transition-transform duration-300 
                    ${isOpen ? 'rotate-180' : ''}`
                }
            />
        </span>
    )
}

export default ExpandBtn
