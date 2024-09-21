import { useParams } from "react-router-dom"

import { useSearchRestaurant } from "@/api/RestaurantApi"
import LoadingButton from "@/components/LoadingButton"
import SearchResultsInfo from "@/components/SearchResultsInfo"
import SearchResultsCard from "@/components/SearchResultsCard"

const SearchPage = () => {
    const { city } = useParams()
    const { results, isLoading } = useSearchRestaurant(city)

    if (isLoading) {
        return <LoadingButton />
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                insert cuisines here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultsInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultsCard restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage