import React from 'react';
import { PaginatorButton } from './PaginatorButton';
import './Paginator.css';

interface MakePagesProps {
	totalItems: number;
	itemsPerPage: number;
}

interface PaginatorPage {
	pageNumber: number;
	firstItem: number;
	lastItem: number;
}

/**
 * Given a total number of items and the number of items desired per page,
 * generates an array of page definitions.
 *
 * @param  {Object} Total items and items per page, from which we can calculate the rest.
 * @return {PaginatorPage[]} An array of `PaginatorPage`s.
 */
const makePages = ({
	totalItems = 0,
	itemsPerPage = 100, // This is a generic fallback, not our real configuration.
}: MakePagesProps) => {
	const pages: PaginatorPage[] = [];

	if (itemsPerPage !== 0) {
		const pageNumbers = Math.ceil(totalItems / itemsPerPage);
		for (let i = 1; i <= pageNumbers; i += 1) {
			const previousPageEnd = (i - 1) * itemsPerPage;
			pages.push({
				pageNumber: i,
				firstItem: previousPageEnd + 1,
				lastItem: Math.min(i * itemsPerPage, totalItems),
			});
		}
	}

	return pages;
};

/**
 * Given a single PaginatorPage, returns a range string
 * in the form of `1–100` or `201–245`.
 *
 * If the "range" is just a single value, it returns that value.
 *
 * @param  {PaginatorPage}
 * @return {String} A range in `n-n` form, e.g. `1–100`, or just a single `n`, e.g. `1`.
 */
function formatPageBoundaries(page: PaginatorPage) {
	if (page.firstItem === page.lastItem) {
		return page.firstItem.toLocaleString();
	}

	return `${page.firstItem.toLocaleString()}–${page.lastItem.toLocaleString()}`;
}

interface PaginatorProps {
	itemsPerPage: number;
	totalItems: number;
	/**
	 * Externally-managed current page.
	 * Note that there is no protection against this being set
	 * to a value larger than `totalItems / itemsPerPage`.
	 */
	currentPage: number;
	/**
	 * Function that will update the `currentPage`.
	 * Assumed to be a state hook, but not required.
	 * All that's required is that the external component
	 * change the `currentPage` property above.
	 */
	setCurrentPage: (page: number) => void;
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
	const pages = makePages({ itemsPerPage, totalItems });

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

	return typeof pages[0] === 'undefined' ? null : ( // Don't render the paginator if we can't generate any page definitions.
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
								<option key={page.pageNumber} value={page.pageNumber}>
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
