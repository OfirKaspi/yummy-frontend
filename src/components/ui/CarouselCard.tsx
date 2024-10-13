type Props = {
    img: string
    name: string
    handleCuisineChange: (cuisineName: string) => void
    isSelected?: boolean
}

const CarouselCard = ({ img, name, handleCuisineChange, isSelected = false }: Props) => {

    const handleClick = () => {
        handleCuisineChange(name)
    }

    return (
        <div
            onClick={handleClick}
            className="relative flex flex-col items-center justify-center gap-3"
        >
            <div className={`rounded-xl shadow-lg p-2 object-cover z-10 ${isSelected && 'shadow-green-300'}`}>
                <div className="h-24 w-24 overflow-hidden z-10">
                    <img
                        src={img}
                        className={`h-full w-full object-cover z-20`}
                        alt={`${name}-cuisine-img`}
                    />
                </div>
            </div>
            <span className={`font-medium ${isSelected && 'text-green-600'}`}>{name}</span>
        </div>
    )
}

export default CarouselCard