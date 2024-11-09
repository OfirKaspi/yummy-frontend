type CuisineItemProps = {
    isSelected: boolean
    name: string
    onClick: () => void
}

const CuisineItem = ({ isSelected, name, onClick }: CuisineItemProps) => {
    return (
        <span
            onClick={onClick}
            className={`text-center text-sm rounded-lg border-2 py-2 px-3
                    ${isSelected && 'text-green-600 border-green-600'}`}
        >
            {name}
        </span>
    )
}

export default CuisineItem
