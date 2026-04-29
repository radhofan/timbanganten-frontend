"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export function GovukPagination({
  currentPage,
  totalPages,
  onPageChange,
  label = "results",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <nav className="govuk-pagination" role="navigation" aria-label={label}>
      {currentPage > 1 && (
        <div className="govuk-pagination__prev">
          <button
            className="govuk-link govuk-pagination__link"
            onClick={() => onPageChange(currentPage - 1)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--prev"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              focusable="false"
              viewBox="0 0 15 13"
              aria-hidden="true"
            >
              <path d="m6.5938-0.0078125-6.7266 6.7441 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
            </svg>
            <span className="govuk-pagination__link-title">
              Previous<span className="govuk-visually-hidden"> page</span>
            </span>
          </button>
        </div>
      )}

      <ul className="govuk-pagination__list">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <li key={`ellipsis-${idx}`} className="govuk-pagination__item govuk-pagination__item--ellipsis">
              &ctdot;
            </li>
          ) : (
            <li
              key={page}
              className={`govuk-pagination__item ${page === currentPage ? "govuk-pagination__item--current" : ""}`}
            >
              <button
                className="govuk-link govuk-pagination__link"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}${page === currentPage ? ", you are currently on this page" : ""}`}
                aria-current={page === currentPage ? "page" : undefined}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      {currentPage < totalPages && (
        <div className="govuk-pagination__next">
          <button
            className="govuk-link govuk-pagination__link"
            onClick={() => onPageChange(currentPage + 1)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span className="govuk-pagination__link-title">
              Next<span className="govuk-visually-hidden"> page</span>
            </span>
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--next"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              focusable="false"
              viewBox="0 0 15 13"
              aria-hidden="true"
            >
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7246z" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
}
