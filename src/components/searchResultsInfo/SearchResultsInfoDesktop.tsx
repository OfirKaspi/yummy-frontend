import { Link } from "react-router-dom"

type Props = {
    total: number
    city: string
}

const SearchResultsInfoDesktop = ({ city, total }: Props) => {
    return (
        <div className="flex items-center text-xl font-bold gap-3">
            <span>
                {total} Restaurants found in {city}
            </span>
            <Link
                to="/"
                className="text-sm font-semibold underline cursor-pointer text-blue-500"
            >
                Change Location
            </Link>
        </div>
    )
}

export default SearchResultsInfoDesktop