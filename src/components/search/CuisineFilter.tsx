import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCuisines, setSelectedCuisines } from "@/store/search/searchSlice"
import useDeviceType from "@/hooks/useDeviceType"
import { cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"
import SeeAll from "@/components/SeeAll"
import CarouselCard from "@/components/CarouselCard"

const CuisineFilter = () => {
    const { isMobile } = useDeviceType()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const dispatch = useDispatch()
    const selectedCuisines = useSelector(selectSelectedCuisines)

    const handleSetSelectedCuisines = (selectedCuisines: string[]) => {
        dispatch(setSelectedCuisines(selectedCuisines))
    }

    const handleExpansion = () => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
    }

    const handleCuisineChange = (cuisineName: string) => {
        const isChecked = selectedCuisines.includes(cuisineName)

        const newCuisinesList = isChecked
            ? selectedCuisines.filter((cuisine) => cuisine !== cuisineName)
            : [...selectedCuisines, cuisineName]

        handleSetSelectedCuisines(newCuisinesList)
    }

    const handleCuisinesReset = () => {
        handleSetSelectedCuisines([])
        if (isExpanded) {
            setIsExpanded(false)
        }
    }
    return (
        <div className="space-y-5">
            {
                !isMobile
                    ? <span className="text-xl">All Cuisines</span>
                    : <SeeAll handleOnClick={handleExpansion} isExpanded={isExpanded} text="All Cuisines" />
            }

            {!isMobile || isExpanded ? (
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3  gap-2">
                        {cuisineListWithImgsCloudinary.map((cuisine) => {
                            const isSelected = selectedCuisines.includes(cuisine.name)
                            return (
                                <div
                                    key={cuisine.name}
                                    onClick={() => handleCuisineChange(cuisine.name)}
                                    className={`flex items-center justify-center text-sm rounded-lg border-2 py-2 px-3
                                    ${isSelected && 'text-green-600 md:border-green-600'}`}
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
                                key={cuisine.name}
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


export default CuisineFilter