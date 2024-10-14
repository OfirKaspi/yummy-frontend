import { Link } from "react-router-dom"

type Props = {
    city: string
    total: number
}

const SearchResultsInfoMobile = ({ city, total }: Props) => {
    return (
        <div className="flex flex-col">
            <span>{total} Restaurants found</span>
            <div className="flex items-center gap-1">
                in
                <Link to="/" className="font-medium underline">{city}</Link>
            </div>
        </div>
    )
}

export default SearchResultsInfoMobile