import { Search } from "lucide-react"

const SearchSection = () => {
    return (
        <div className="bg-slate-100 shadow-md rounded-lg flex gap-3 p-5">
            <Search className="text-gray-400" />
            <span className="text-gray-600">
                Search dishes, restaurant
            </span>
        </div>
    )
}

export default SearchSection