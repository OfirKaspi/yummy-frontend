import { useEffect, useState } from 'react'
import { MenuCategory, Restaurant } from '@/types'

const useCheckedFoodSection = (restaurant: Restaurant) => {
    const [checkedFoodSection, setCheckedFoodSection] = useState<MenuCategory>()

    useEffect(() => {
        if (restaurant.menuCategories.length) {
            setCheckedFoodSection(restaurant.menuCategories[0])
        }
    }, [restaurant])

    const handleFoodSection = (menuCategory: MenuCategory) => setCheckedFoodSection(menuCategory)

    return { checkedFoodSection, handleFoodSection }
}

export default useCheckedFoodSection
