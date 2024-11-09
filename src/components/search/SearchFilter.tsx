import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CuisineFilter from "@/components/search/CuisineFilter"
import SortOptionDropdown from "@/components/search/SortOptionDropdown"
import { Separator } from "@/components/ui/separator"

const SearchFilter = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="bg-slate-100 dark:bg-gray-500 border-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Filter className="text-gray-800 dark:text-gray-200" />
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col rounded-t-3xl overflow-y-auto whitespace-nowrap max-h-[80%]">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-medium">Sort By</h3>
                    <SortOptionDropdown />
                </div>
                <Separator />
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-medium">Filter By</h3>
                    <CuisineFilter />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SearchFilter