import deliveryImg from '@/assets/delivery.jpg'

const OrdersNotFound = () => {
    return (
        <div className="flex flex-col items-center gap-2 mt-8">
            <div className="rounded-full bg-gray-50 border-orange-600 border-2">
                <img
                    src={deliveryImg}
                    alt="empty-orders"
                    className="h-[20rem] rounded-full p-3"
                />
            </div>
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <span className="text-slate-400">There aren't orders at the moment</span>
        </div>
    )
}

export default OrdersNotFound