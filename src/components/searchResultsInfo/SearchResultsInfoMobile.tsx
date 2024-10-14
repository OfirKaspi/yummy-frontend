import { Link } from "react-router-dom"

type Props = {
    city: string
    total: number
}

const SearchResultsInfoMobile = ({ city, total }: Props) => {
    return (
        <div className="text-xl flex flex-col gap-2 font-medium">
            <span>
                {total} Restaurants found in {city}
            </span>
            <Link
                to="/"
                className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
            >
                Change Location
            </Link>
        </div>
    )
}

export default SearchResultsInfoMobile