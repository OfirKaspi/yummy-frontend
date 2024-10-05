// type Props = {
//     handleSearchSubmit: (searchFormValues: SearchForm) => void
// }

import { Skeleton, SkeletonAvatar, SkeletonProfile } from "@/components/ui/skeleton"
import { ChevronRight, Search } from "lucide-react"

const HomePageMobile = () => {
    return (
        <div className="space-y-5">
            <SkeletonProfile />
            {/* <div>
                Hey {"Ofir"}!,
                <span className="font-bold ml-1">Good Afternoon!</span>
            </div> */}
            <div className="bg-slate-100 shadow-md rounded-lg flex gap-3 p-5">
                <Search className="text-gray-400" />
                <span className="text-gray-600">
                    Search dishes, restaurant
                </span>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <span className="text-xl">All Categories</span>
                    <span className="flex">
                        See All
                        <ChevronRight className="text-gray-400" />
                    </span>
                </div>
                <div className="flex gap-3 3">
                    <div className="flex items-center rounded-full shadow-md gap-3 w-fit p-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <span className="mr-2 whitespace-nowrap">All</span>
                    </div>
                    <div className="flex items-center rounded-full shadow-md gap-3 w-fit p-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <span className="mr-2 whitespace-nowrap">Banana Lotti</span>
                    </div>
                    <div className="flex items-center rounded-full shadow-md gap-3 w-fit p-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <span className="mr-2 whitespace-nowrap">Pizza</span>
                    </div>
                    <div className="flex items-center rounded-full shadow-md gap-3 w-fit p-2">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <span className="mr-2 whitespace-nowrap">Shwarem</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HomePageMobile