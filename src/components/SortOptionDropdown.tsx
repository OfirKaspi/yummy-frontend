import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { selectSortOption, setSortOption } from "@/store/search/searchSlice"
import { SortOptionValue } from "@/types"
import { useDispatch, useSelector } from "react-redux"

const SORT_OPTIONS = [
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery price",
        value: "deliveryPrice"
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime"
    },
]

const SortOptionDropdown = () => {
    const dispatch = useDispatch()
    const sortOption = useSelector(selectSortOption)

    const handleSetSortOption = (sortOption: SortOptionValue) => {
        dispatch(setSortOption(sortOption))
    }


    const selectedSortLabel =
        SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
        SORT_OPTIONS[0].label

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer w-full">
                <Button variant="outline" className="font-normal w-full">
                    Sort by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.label}
                        className="cursor-pointer w-full"
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