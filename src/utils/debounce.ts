export const debounce = (func: (value: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout

    const debouncedFunction = (value: string) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(value), delay)
    }

    debouncedFunction.cancel = () => {
        clearTimeout(timeoutId)
    }

    return debouncedFunction
}
