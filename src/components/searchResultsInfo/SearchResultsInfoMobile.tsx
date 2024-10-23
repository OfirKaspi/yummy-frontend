import { selectPagination } from "@/store/restaurants/restaurantsSelectors"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const SearchResultsInfoMobile = () => {
    const { city } = useParams()
    const pagination = useSelector(selectPagination)

    return (
        <div className="flex flex-col">
            <span>{pagination?.total} Restaurants found</span>
            <div className="flex items-center gap-1">
                in
                <Link to="/" className="font-medium underline">{city}</Link>
            </div>
        </div>
    )
}

export default SearchResultsInfoMobile