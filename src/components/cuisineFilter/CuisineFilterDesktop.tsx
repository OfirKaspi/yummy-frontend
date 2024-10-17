import { cuisineList } from "@/config/restaurant-options-config"

import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Props = {
    isExpanded: boolean
    selectedCuisines: string[]
    handleExpansion: () => void
    handleCuisineChange: (cuisineName: string) => void
    handleCuisinesReset: () => void
}

const CuisineFilterDesktop = ({
    isExpanded,
    selectedCuisines,
    handleExpansion,
    handleCuisineChange,
    handleCuisinesReset,
}: Props) => {
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
                <div
                    onClick={handleCuisinesReset}
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
                >
                    Reset Filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisineList
                    .slice(0, isExpanded ? cuisineList.length : 7)
                    .map((cuisine) => {
                        const isSelected = selectedCuisines.includes(cuisine)
                        return (
                            <div className="flex" key={cuisine}>
                                <input
                                    id={`cuisine_${cuisine}`}
                                    type="checkbox"
                                    className="hidden"
                                    value={cuisine}
                                    checked={isSelected}
                                    onChange={() => handleCuisineChange(cuisine)}
                                />
                                <Label
                                    htmlFor={`cuisine_${cuisine}`}
                                    className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold 
                                    ${isSelected
                                            ? "border border-green-600 text-green-600"
                                            : "border border-slate-300"
                                        }`}>
                                    {isSelected && <Check size={20} strokeWidth={3} />}
                                    {cuisine}
                                </Label>
                            </div>
                        )
                    })}

                <Button
                    variant="link"
                    className="mt-4 flex-1"
                    onClick={handleExpansion}
                >
                    {isExpanded
                        ? (<span className="flex flex-row items-center">View Less <ChevronUp /></span>)
                        : (<span className="flex flex-row items-center">View More <ChevronDown /></span>)
                    }
                </Button>

            </div>
        </>
    )
}

export default CuisineFilterDesktop