import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListGrid.css';

interface ListGridItemTitleProps {
	children: React.ReactNode;
}

const ListGridItemTitle = ({ children }: ListGridItemTitleProps) => (
	<div className="list-grid-item--title">{children}</div>
);

interface ListGridItemDetailsProps {
	/**
	 * When displaying multiple details on one line,
	 * wrap each detail in its own element tag (of any kind)
	 * so that CSS flexbox can do its magic:
	 *
	 * ```
	 * <ListGridItemDetails>
	 *  <span>First item</span>
	 *  <span>Second item</span>
	 * </ListGridItemDetails>
	 * ```
	 *
	 * If you only have one item, you can omit the wrapper.
	 */
	children: React.ReactNode;
}

const ListGridItemDetails = ({ children }: ListGridItemDetailsProps) => (
	<div className="list-grid-item--details">{children}</div>
);

interface ListGridItemProps {
	/**
	 * Should contain one `ListGridItemTitle`, plus (optionally)
	 * an arbitrary number of `ListGridItemDetail`s.
	 */
	children: React.ReactNode;
	/**
	 * URL destination for the list grid item when clicked.
	 * Proxies directly to the `<Link to>` attribute.
	 */
	linkTo: string;
	active?: boolean;
}

const ListGridItem = ({
	children,
	linkTo,
	active = false,
}: ListGridItemProps) => (
	<Link
		to={linkTo}
		className={`list-grid-item ${active ? 'active' : ''}`.trim()}
	>
		{children}
	</Link>
);

interface ListGridProps<T> {
	items: T[];
	/**
	 * Render method expected to return a `ListGridItem`.
	 */
	renderItem(item: T): React.ReactNode;
}

const ListGrid = <T,>({ items, renderItem }: ListGridProps<T>) => {
	const listGridRef = React.useRef<HTMLDivElement>(null);

	const scrollToActiveItem = () => {
		listGridRef.current
			?.querySelector('.active')
			?.previousElementSibling?.scrollIntoView();
	};

	useEffect(() => {
		scrollToActiveItem();
	}, []);

	return <div ref={listGridRef}>{items.map((item) => renderItem(item))}</div>;
};

export { ListGrid, ListGridItem, ListGridItemTitle, ListGridItemDetails };
