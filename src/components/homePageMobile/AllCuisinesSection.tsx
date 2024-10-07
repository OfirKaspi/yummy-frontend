import { useState } from "react"

import { cuisineListWithImgs } from "@/config/restaurant-options-config"

import ExpandBtn from "./ExpandBtn"
import CarouselCard from "../ui/CarouselCard"

const AllCuisinesSection = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSeeAll = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="text-xl">All Categories</span>
                <div onClick={handleSeeAll}>
                    <ExpandBtn isOpen={isOpen} />
                </div>
            </div>
            {isOpen ? (
                <div className="flex flex-wrap gap-3 py-3 px-4 -mx-4">
                    <div className="flex items-center rounded-full shadow py-2 px-3">
                        <span>All</span>
                    </div>
                    {cuisineListWithImgs.map((cuisine) => (
                        <div className="flex items-center rounded-full shadow py-2 px-3">
                            <span>{cuisine.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex gap-3 overflow-x-auto whitespace-nowrap py-3 px-4 -mx-4">
                    <CarouselCard img={cuisineListWithImgs[0].img} name={"All"} />
                    {cuisineListWithImgs.map((cuisine) => (
                        <CarouselCard img={cuisine.img} name={cuisine.name} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllCuisinesSection