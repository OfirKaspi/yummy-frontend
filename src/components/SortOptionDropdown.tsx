import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SortOptionValue } from "@/types"

type Props = {
    onChange: (value: string) => void
    sortOption: SortOptionValue
}

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

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
    const selectedSortLabel =
        SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
        SORT_OPTIONS[0].label

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.label}
                        className="cursor-pointer"
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortOptionDropdown