import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CuisineFilter from "@/components/cuisineFilter/CuisineFilter"
import { SearchState, SortOptionValue } from "@/types"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { Separator } from "@/components/ui/separator"

type Props = {
    setSelectedCuisines: (cuisines: string[]) => void
    searchState: SearchState
    setSortOption: (sortOption: SortOptionValue) => void
}

const SearchFilter = ({ setSelectedCuisines, searchState, setSortOption }: Props) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <Filter className="text-gray-600" />
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col rounded-t-3xl">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-medium">Sort By</h3>
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value as SortOptionValue)} />
                </div>
                <Separator />
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-medium">Filter By</h3>
                    <CuisineFilter
                        onChange={setSelectedCuisines}
                        selectedCuisines={searchState.selectedCuisines}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SearchFilter