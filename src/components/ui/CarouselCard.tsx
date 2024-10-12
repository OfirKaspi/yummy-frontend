// import { Skeleton } from "./skeleton"

type Props = {
    img: string
    name: string
}

const CarouselCard = ({ img, name }: Props) => {

    const searchForCuisine = () => {
        console.log("cuisine name: ", name)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3" onClick={searchForCuisine}>
            <div className="rounded-xl shadow-lg p-2 object-cover">
                {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
                <div className="h-24 w-24 overflow-hidden"> {/* Create a container for the image */}
                    <img
                        src={img}
                        className={`h-full w-full object-cover`}
                        alt={`${name}-cuisine-img`}
                    />
                </div>
            </div>
            <span className="font-medium">{name}</span>
        </div>
    )
}

export default CarouselCard