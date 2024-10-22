import deliveryImg from '@/assets/delivery.jpg'

type Props = {
    itemNotFound: string
}

const NotFound = ({ itemNotFound }: Props) => {
    return (
        <div className="flex flex-col items-center gap-2 mt-8">
            <div className="rounded-full bg-gray-50 border-orange-600 border-2">
                <img
                    src={deliveryImg}
                    alt="empty-orders"
                    className="h-60 lg:h-[20rem] rounded-full p-3"
                />
            </div>
            <h2 className="text-2xl font-bold">No {itemNotFound} yet</h2>
            <span className="text-slate-400">There aren't {itemNotFound} at the moment</span>
        </div>
    )
}

export default NotFound