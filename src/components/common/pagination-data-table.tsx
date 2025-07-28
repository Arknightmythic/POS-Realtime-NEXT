import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function PaginationDataTable({
  totalPages,
  currentPage,
  onchangePage,
}: {
  totalPages: number;
  currentPage: number;
  onchangePage: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                onchangePage(currentPage - 1);
              } else {
                onchangePage(totalPages);
              }
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          if (
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => {
                    if (page !== currentPage) onchangePage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (
            (page === currentPage - 2 && page > 1) ||
            (page === currentPage + 2 && page < totalPages)
          ) {
            return (
              <PaginationItem key={`ellipsis-${page}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage < totalPages) {
                onchangePage(currentPage + 1);
              } else {
                onchangePage(1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
