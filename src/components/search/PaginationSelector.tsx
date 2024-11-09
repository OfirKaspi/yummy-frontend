import { useDispatch, useSelector } from "react-redux"
import { selectPagination } from "@/store/restaurants/restaurantsSelectors"
import { setPage } from "@/store/search/searchSlice"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const PaginationSelector = () => {
    const dispatch = useDispatch()
    const pagination = useSelector(selectPagination)

    const handleSetPage = (page: number) => {
        dispatch(setPage(page))
    }

    if (!pagination || pagination.pages === 0) {
        return
    }

    const pageNumbers = []
    for (let i = 1; i <= pagination.pages; i++) {
        pageNumbers.push(i)
    }

    return (
        <Pagination>
            <PaginationContent>
                {pagination.page !== 1 &&
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handleSetPage(pagination.page - 1)} />
                    </PaginationItem>
                }

                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href="#"
                            onClick={() => handleSetPage(number)}
                            isActive={pagination.page === number}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {pagination.page !== pageNumbers.length &&
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handleSetPage(pagination.page + 1)} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector