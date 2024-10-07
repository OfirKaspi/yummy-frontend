// import { Skeleton } from "./skeleton"

type Props = {
    img: string
    name: string
}

const CarouselCard = ({ img, name }: Props) => {
    return (
        <div className="flex items-center rounded-full shadow gap-3 w-fit p-2">
            {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
            <div className="h-12 w-12 rounded-full overflow-hidden"> {/* Create a container for the image */}
                <img
                    src={img}
                    className={`h-full w-full object-cover`}
                    alt={name}
                />
            </div>
            <span className="mr-2 whitespace-nowrap">{name}</span>
        </div>
    )
}

export default CarouselCard