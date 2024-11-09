import { useDispatch, useSelector } from "react-redux"
import { SortOptionValue } from "@/types"
import { selectSortOption, setSortOption } from "@/store/search/searchSlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const SORT_OPTIONS = [
    { label: "Best match", value: "bestMatch" },
    { label: "Delivery price", value: "deliveryPrice" },
    { label: "Estimated delivery time", value: "estimatedDeliveryTime" },
]

const SortOptionDropdown = () => {
    const dispatch = useDispatch()
    const sortOption = useSelector(selectSortOption)

    const handleSetSortOption = (sortOption: SortOptionValue) => {
        dispatch(setSortOption(sortOption))
    }

    const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer w-full border-2 py-2 rounded-lg text-sm">
                {selectedSortLabel}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.label}
                        className="cursor-pointer"
                        onClick={() => handleSetSortOption(option.value as SortOptionValue)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortOptionDropdown