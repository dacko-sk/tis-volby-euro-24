import Pagination from 'react-bootstrap/Pagination';

import './PaginationWithGaps.scss';

function PaginationWithGaps({
    activePage = 1,
    className = 'justify-content-center',
    pageClickCallback,
    totalPages,
    useOffset = false,
}) {
    const items = [];
    for (let pageNum = 1; pageNum <= totalPages; pageNum += 1) {
        if (
            totalPages <= 10 ||
            pageNum <= 2 ||
            pageNum >= totalPages - 1 ||
            (pageNum >= activePage - 1 && pageNum <= activePage + 1)
        ) {
            if (
                totalPages > 10 &&
                pageNum === totalPages - 1 &&
                activePage <= totalPages - 4
            ) {
                items.push(
                    <li className="pagination-gap" key="gap-before">
                        …
                    </li>
                );
            }

            const index = useOffset ? pageNum - 1 : pageNum;
            items.push(
                <Pagination.Item
                    active={pageNum === activePage}
                    key={pageNum}
                    onClick={pageClickCallback(index, totalPages)}
                >
                    {pageNum}
                </Pagination.Item>
            );

            if (totalPages > 10 && pageNum === 2 && activePage >= 5) {
                items.push(
                    <li className="pagination-gap" key="gap-after">
                        …
                    </li>
                );
            }
        }
    }
    if (items.length > 1) {
        return <Pagination className={className}>{items}</Pagination>;
    }
    return null;
}

export default PaginationWithGaps;
