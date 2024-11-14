import useDeviceType from "@/hooks/useDeviceType"
import { MenuCategory } from "@/types"

type Props = {
    categories: MenuCategory[]
    handleFoodSection: (menuCategory: MenuCategory) => void
    checkedFoodSection?: MenuCategory
}

const RestaurantDetailsCategoriesSelection = ({ categories, checkedFoodSection, handleFoodSection }: Props) => {
    const { isMobile } = useDeviceType()

    return (
        <div className={`flex gap-2 overflow-x-auto whitespace-nowrap px-4 -mx-4 ${!isMobile ? 'flex-wrap overflow-x-hidden' : ''}`}>
            {categories.map((category, index) => (
                <button
                    key={`${category.name}${index}`}
                    className={`border-2 rounded-xl py-2 px-4
                            ${checkedFoodSection === category ? 'bg-orange-500 text-white' : 'border-2'}
                            `}
                    onClick={() => handleFoodSection(category)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}

export default RestaurantDetailsCategoriesSelection