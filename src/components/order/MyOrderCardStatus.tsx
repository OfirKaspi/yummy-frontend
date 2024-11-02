type Props = {
    status: string
}

const capitalizeFirstLetter = (string: string) => {
    if (!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "placed":
            return "text-gray-500"
        case "paid":
            return "text-yellow-500"
        case "inProgress":
            return "text-blue-500"
        case "outForDelivery":
            return "text-orange-500"
        case "delivered":
            return "text-green-500"
        default:
            return ""
    }
};


const MyOrderCardStatusMobile = ({ status }: Props) => {
    const statusColor = getStatusColor(status)
    const formattedStatus = capitalizeFirstLetter(status)

    return (
        <div className="flex text-sm gap-3">
            <span className="font-medium">Order Status</span>
            <span className={`${statusColor} font-bold`}>{formattedStatus}</span>
        </div>
    )
}

export default MyOrderCardStatusMobile