import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import './Paginator.css';

interface PaginatorPage {
  pageNumber: number,
  firstItem: number,
  lastItem: number,
}

// Utility method that takes the total items and items per page and returns an array
// of pages with the page number and boundaries.
const makePages = (totalItems: number, itemsPerPage: number) => {
  const pages: PaginatorPage[] = [];

  const pageNumbers = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= pageNumbers; i += 1) {
    const previousPageEnd = (i - 1) * itemsPerPage;
    pages.push({
      pageNumber: i,
      firstItem: previousPageEnd + 1,
      lastItem: Math.min(i * itemsPerPage, totalItems),
    });
  }

  return pages;
};

// Utility method that takes a `PaginatorPage` and returns a range string,
// e.g. "1–100" or "201–300". If the range is just a single value, returns just that.
function formatPageBoundaries(page: PaginatorPage) {
  if (page.firstItem === page.lastItem) {
    return page.firstItem.toLocaleString();
  }

  return `${page.firstItem.toLocaleString()}–${page.lastItem.toLocaleString()}`;
}

interface PaginatorButtonProps {
  direction: 'previous' | 'next',
  onClick: () => void;
  disabled?: boolean,
}

const PaginatorButton = ({
  direction,
  onClick,
  disabled = false,
}: PaginatorButtonProps) => (
  <button
    className="paginator-button"
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {direction === 'previous'
      ? <ArrowLeftIcon className="icon" />
      : <ArrowRightIcon className="icon" />}
  </button>
);

interface PaginatorProps {
  itemsPerPage: number,
  totalItems: number,
  /**
   * Externally-managed current page.
   * Note that there is no protection against this being set
   * to a value larger than `totalItems / itemsPerPage`.
   */
  currentPage: number,
  /**
   * Function that will update the `currentPage`.
   * Assumed to be a state hook, but not required.
   * All that's required is that the external component
   * change the `currentPage` property above.
   */
  setCurrentPage: (page: number) => void,
}

/**
 * A component for navigating between pages of a set of items.
 * Calculates the number of pages and the range start/end values
 * based on the `totalItems` and `itemsPerPage` props.
 * Note that "current page" state should be managed externally,
 * so changing the `currentPage` prop internally has no effect.
 */
export const Paginator = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginatorProps) => {
  const pages = makePages(totalItems, itemsPerPage);

  const totalPages = pages.length;

  const goToPreviousPage = () => {
    setCurrentPage(Math.min(totalPages, Math.max(1, currentPage - 1)));
  };

  const goToNextPage = () => {
    setCurrentPage(Math.max(1, Math.min(totalPages, currentPage + 1)));
  };

  const handleSelectorChange = (event: React.FormEvent) => {
    const selector = event.currentTarget as HTMLSelectElement;
    setCurrentPage(Number(selector.value));
  };

  return (
    <div className="paginator">
      <PaginatorButton
        direction="previous"
        onClick={goToPreviousPage}
        disabled={currentPage <= 1}
      />
      <div className="paginator-content">
        <div className="paginator-status">
          {'Showing '}
          {totalPages > 1 ? (
            <select
              onChange={handleSelectorChange}
              value={currentPage}
              className="paginator__page-selector"
            >
              {pages.map((page) => (
                <option
                  key={page.pageNumber}
                  value={page.pageNumber}
                >
                  {formatPageBoundaries(page)}
                </option>
              ))}
            </select>
          ) : (
            <span className="paginator-status__value">
              {formatPageBoundaries(pages[0])}
            </span>
          )}
          {' of '}
          <span className="paginator-status__value">
            {totalItems.toLocaleString()}
          </span>
        </div>
      </div>
      <PaginatorButton
        direction="next"
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
      />
    </div>
  );
};
