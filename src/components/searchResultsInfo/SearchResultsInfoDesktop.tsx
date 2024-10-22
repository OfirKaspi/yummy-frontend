import { selectPaginationTotal } from "@/store/restaurantsSlice"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const SearchResultsInfoDesktop = () => {
    const { city } = useParams()
    const total = useSelector(selectPaginationTotal)

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