import { cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"

import ExpandBtn from "@/components/homePageMobile/ExpandBtn"
import CarouselCard from "@/components/CarouselCard"

type Props = {
    isExpanded: boolean
    selectedCuisines: string[]
    handleExpansion: () => void
    handleCuisineChange: (cuisineName: string) => void
    handleCuisinesReset: () => void
}

const CuisinesFilterMobile = ({
    isExpanded,
    selectedCuisines,
    handleExpansion,
    handleCuisineChange,
    handleCuisinesReset,
}: Props) => {
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
                                    key={cuisine.name}
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

export default CuisinesFilterMobile