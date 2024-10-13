import { useState } from "react"

import { cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"

import ExpandBtn from "./ExpandBtn"
import CarouselCard from "../ui/CarouselCard"

type Props = {
    onChange: (cuisines: string[]) => void
    selectedCuisines: string[]
}

const CuisinesFilterMobile = ({ onChange, selectedCuisines }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const handleExpansion = () => {
        setIsExpanded(!isExpanded)
    }

    const handleCuisineChange = (cuisineName: string) => {
        const isChecked = selectedCuisines.includes(cuisineName)

        const newCuisinesList = isChecked
            ? selectedCuisines.filter((cuisine) => cuisine !== cuisineName)
            : [...selectedCuisines, cuisineName]

        onChange(newCuisinesList)
    }

    const handleCuisinesReset = () => (
        handleExpansion(),
        onChange([])
    )

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">All Cuisines</h2>
                <div onClick={handleExpansion}>
                    <ExpandBtn isExpanded={isExpanded} />
                </div>
            </div>
            {isExpanded ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-3 px-4 -mx-4">
                        {cuisineListWithImgsCloudinary.map((cuisine) => {
                            const isSelected = selectedCuisines.includes(cuisine.name)
                            return (
                                <div
                                    onClick={() => handleCuisineChange(cuisine.name)}
                                    className={`flex items-center rounded-lg shadow-lg py-2 px-3
                                    ${isSelected && 'shadow-green-300 text-green-600'}`}
                                >
                                    <span>{cuisine.name}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span
                        className="text-sm font-semibold mb-2 underline text-blue-500"
                        onClick={handleCuisinesReset}
                    >
                        Reset Filters
                    </span>
                </div>
            ) : (
                <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 -mx-4">
                    {cuisineListWithImgsCloudinary.map((cuisine) => {
                        const isSelected = selectedCuisines.includes(cuisine.name)
                        return (
                            <CarouselCard
                                img={cuisine.img}
                                name={cuisine.name}
                                handleCuisineChange={handleCuisineChange}
                                isSelected={isSelected}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CuisinesFilterMobile