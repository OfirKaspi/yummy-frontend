import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    isFull?: boolean
}

const LoadingButton = ({ isFull = false }: Props) => {
    return (
        <Button className={`${isFull && "flex-1"}`}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </Button>
    )
}

export default LoadingButton