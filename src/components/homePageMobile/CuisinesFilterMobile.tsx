
import { useState } from "react"

import { allCuisinesPropertyCloudinary, cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"

import ExpandBtn from "./ExpandBtn"
import CarouselCard from "../ui/CarouselCard"

const CuisinesFilterMobile = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSeeAll = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">All Cuisines</h2>
                <div onClick={handleSeeAll}>
                    <ExpandBtn isOpen={isOpen} />
                </div>
            </div>
            {isOpen ? (
                <div className="flex flex-wrap gap-3 py-3 px-4 -mx-4">
                    <div className="flex items-center rounded-lg shadow-lg py-2 px-3">
                        <span>{allCuisinesPropertyCloudinary.name}</span>
                    </div>
                    {cuisineListWithImgsCloudinary.map((cuisine) => (
                        <div className="flex items-center rounded-lg shadow-lg py-2 px-3">
                            <span>{cuisine.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 -mx-4">
                    <CarouselCard img={allCuisinesPropertyCloudinary.img} name={allCuisinesPropertyCloudinary.name} />
                    {cuisineListWithImgsCloudinary.map((cuisine) => (
                        <CarouselCard img={cuisine.img} name={cuisine.name} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CuisinesFilterMobile