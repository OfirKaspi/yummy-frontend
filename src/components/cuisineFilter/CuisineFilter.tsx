import { useState } from "react"

import useDeviceType from "@/hooks/useDeviceType"

import CuisineFilterDesktop from "./CuisineFilterDesktop"
import CuisinesFilterMobile from "./CuisineFilterMobile"

type Props = {
    onChange: (cuisines: string[]) => void
    selectedCuisines: string[]
}

const CuisineFilter = ({ onChange, selectedCuisines }: Props) => {
    const { isDesktop, isMobile } = useDeviceType()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const handleExpansion = () => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
    }

    const handleCuisineChange = (cuisineName: string) => {
        const isChecked = selectedCuisines.includes(cuisineName)

        const newCuisinesList = isChecked
            ? selectedCuisines.filter((cuisine) => cuisine !== cuisineName)
            : [...selectedCuisines, cuisineName]

        onChange(newCuisinesList)
    }

    const handleCuisinesReset = () => {
        onChange([])
        if (isExpanded) {
            setIsExpanded(false)
        }
    }

    console.log("handleCuisineChange CF", handleCuisineChange);

    return (
        <>
            {isMobile && <CuisinesFilterMobile
                isExpanded={isExpanded}
                selectedCuisines={selectedCuisines}
                handleExpansion={handleExpansion}
                handleCuisineChange={handleCuisineChange}
                handleCuisinesReset={handleCuisinesReset}
            />}

            {isDesktop && <CuisineFilterDesktop
                isExpanded={isExpanded}
                selectedCuisines={selectedCuisines}
                handleExpansion={handleExpansion}
                handleCuisineChange={handleCuisineChange}
                handleCuisinesReset={handleCuisinesReset}
            />}
        </>
    )
}


export default CuisineFilter