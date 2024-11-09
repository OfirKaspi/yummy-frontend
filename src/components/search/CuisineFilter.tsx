import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCuisines, setSelectedCuisines } from "@/store/search/searchSlice"
import useDeviceType from "@/hooks/useDeviceType"
import SeeAll from "@/components/SeeAll"
import CuisineList from "@/components/search/CuisineList"

const CuisineFilter = () => {
    const { isMobile } = useDeviceType()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const dispatch = useDispatch()
    const selectedCuisines = useSelector(selectSelectedCuisines)

    const toggleExpansion = () => setIsExpanded((prevIsExpanded) => !prevIsExpanded)

    const handleCuisineChange = (cuisineName: string) => {
        const isChecked = selectedCuisines.includes(cuisineName)

        const newCuisinesList = isChecked
            ? selectedCuisines.filter((cuisine) => cuisine !== cuisineName)
            : [...selectedCuisines, cuisineName]

        dispatch(setSelectedCuisines(newCuisinesList))
    }

    const handleCuisinesReset = () => {
        dispatch(setSelectedCuisines([]))
        if (isExpanded) setIsExpanded(false)
    }

    return (
        <div className="space-y-5">
            {isMobile ? (
                <SeeAll handleOnClick={toggleExpansion} isExpanded={isExpanded} text="All Cuisines" />
            ) : (
                <span className="text-xl">All Cuisines</span>
            )}

            <CuisineList
                handleCuisineChange={handleCuisineChange}
                selectedCuisines={selectedCuisines}
                isExpanded={isExpanded}
            />

            <span
                className="block text-sm font-semibold underline text-orange-500"
                onClick={handleCuisinesReset}
            >
                Reset Filters
            </span>
        </div>
    )
}

export default CuisineFilter