import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectPagination } from "@/store/restaurants/restaurantsSelectors"

const SearchResultsInfo = () => {
    const { city } = useParams()
    const pagination = useSelector(selectPagination)

    return (
        <div className="flex flex-col sm:flex-row sm:gap-1 sm:text-xl">
            <span>{pagination?.total} Restaurants found</span>
            <div className="flex gap-1">
                in
                <Link to="/" className="font-medium underline">{city}</Link>
            </div>
        </div>
    )
}

export default SearchResultsInfo