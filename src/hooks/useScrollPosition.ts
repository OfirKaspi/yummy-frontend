// src/hooks/useScrollPosition.ts
import { useState, useEffect } from 'react'

const useScrollPosition = () => {
    const [isAtBottom, setIsAtBottom] = useState(false)

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight
        const windowHeight = document.documentElement.scrollHeight

        if (scrollPosition >= windowHeight - 50) {
            setIsAtBottom(true)
        } else {
            setIsAtBottom(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return isAtBottom
}

export default useScrollPosition
