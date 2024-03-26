import React, { useEffect } from 'react';

const LIST_GRID_ITEM_TRUNCATE_LENGTH = 30;

interface ListGridProps<T> {
	items: T[];
	renderItem(item: T): React.ReactNode;
}

export const ListGrid = <T,>({ items, renderItem }: ListGridProps<T>) => {
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

export { LIST_GRID_ITEM_TRUNCATE_LENGTH };
