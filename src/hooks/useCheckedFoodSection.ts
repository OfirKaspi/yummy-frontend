import { useEffect, useState } from 'react'
import { Restaurant } from '@/types'

const useCheckedFoodSection = (restaurant: Restaurant | null) => {
    const [checkedFoodSection, setCheckedFoodSection] = useState<string>('')

    useEffect(() => {
        if (restaurant?.cuisines?.length) {
            setCheckedFoodSection(restaurant.cuisines[0])
        }
    }, [restaurant])

    const handleFoodSection = (foodSection: string) => setCheckedFoodSection(foodSection)

    return { checkedFoodSection, handleFoodSection }
}

export default useCheckedFoodSection
