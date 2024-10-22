import { useState } from "react"

import useDeviceType from "@/hooks/useDeviceType"

import CuisineFilterDesktop from "./CuisineFilterDesktop"
import CuisinesFilterMobile from "./CuisineFilterMobile"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCuisines, setSelectedCuisines } from "@/store/searchSlice"

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

    return isMobile
        ? <CuisinesFilterMobile
            isExpanded={isExpanded}
            selectedCuisines={selectedCuisines}
            handleExpansion={handleExpansion}
            handleCuisineChange={handleCuisineChange}
            handleCuisinesReset={handleCuisinesReset}
        />
        : <CuisineFilterDesktop
            isExpanded={isExpanded}
            selectedCuisines={selectedCuisines}
            handleExpansion={handleExpansion}
            handleCuisineChange={handleCuisineChange}
            handleCuisinesReset={handleCuisinesReset}
        />
}


export default CuisineFilter