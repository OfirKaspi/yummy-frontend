import { cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"
import useDeviceType from "@/hooks/useDeviceType"
import CuisineItem from "@/components/search/CuisineItem"

type Props = {
    handleCuisineChange: (cuisineName: string) => void
    selectedCuisines: string[]
    isExpanded: boolean
}


const CuisineList = ({ handleCuisineChange, selectedCuisines, isExpanded }: Props) => {
    const { isMobile } = useDeviceType()
    const isSelectedCuisine = (cuisineName: string) => selectedCuisines.includes(cuisineName)

    const cuisineListStyle = (
        isMobile && !isExpanded
            ? "flex gap-2 overflow-x-auto whitespace-nowrap px-5 -mx-5"
            : "grid grid-cols-3 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2"
    )


    return (
        <div className={cuisineListStyle}>
            {cuisineListWithImgsCloudinary.map((cuisine) => {
                return (
                    <CuisineItem
                        key={cuisine.name}
                        name={cuisine.name}
                        isSelected={isSelectedCuisine(cuisine.name)}
                        onClick={() => handleCuisineChange(cuisine.name)}
                    />
                )
            })}
        </div>
    )
}

export default CuisineList