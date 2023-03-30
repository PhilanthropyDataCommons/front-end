import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface PaginatorButtonProps {
  direction: 'previous' | 'next',
  onClick: () => void;
  disabled?: boolean,
}

export const PaginatorButton = ({
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
