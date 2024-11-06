import useDeviceType from "@/hooks/useDeviceType"

type Props = {
    cuisines: string[]
    handleFoodSection: (foodSection: string) => void
    checkedFoodSection: string
}

const RestaurantDetailsCuisines = ({ cuisines, checkedFoodSection, handleFoodSection }: Props) => {
    const { isMobile } = useDeviceType()

    return (
        <div className={`flex gap-2 overflow-x-auto whitespace-nowrap px-4 -mx-4 ${!isMobile ? 'flex-wrap overflow-x-hidden' : ''}`}>
            {cuisines.map((cuisine) => (
                <button
                    key={cuisine}
                    className={`border-2 border-slate-100 rounded-xl py-2 px-4
                            ${checkedFoodSection === cuisine ? 'bg-orange-500 text-white' : 'bg-white border-2'}
                            `}
                    onClick={() => handleFoodSection(cuisine)}
                >
                    {cuisine}
                </button>
            ))}
        </div>
    )
}

export default RestaurantDetailsCuisines