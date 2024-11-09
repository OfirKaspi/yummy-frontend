import deliveryImg from '@/assets/delivery.jpg'

type Props = {
    itemNotFound: string
}

const NotFound = ({ itemNotFound }: Props) => {
    return (
        <div className="flex flex-col items-center gap-2 mt-8">
            <img
                src={deliveryImg}
                alt="empty-orders"
                className="h-60 lg:h-[20rem] rounded-full p-3"
            />
            <h2 className="text-2xl font-medium">No {itemNotFound} yet</h2>
            <span className="text-gray-800 dark:text-gray-200">There aren't {itemNotFound} at the moment</span>
        </div>
    )
}

export default NotFound