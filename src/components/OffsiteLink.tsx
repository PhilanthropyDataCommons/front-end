import React from 'react';

interface OffsiteLinkProps {
  /**
   * Destination URL.
   */
  to: string;
  /**
   * If true, will open the destination in a new window/tab
   * and will add the `rel="noopener noreferrer"` guardrails.
   */
  targetBlank?: boolean;
  /**
   * Visible contents of the link.
   * If omitted, will default to the destination URL (`to`).
   */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Component for linking off-site.
 * When configured to open links in a new window/tab, adds the
 * `rel="noopener noreferrer"` attribute for cross-site safety.
 */
export const OffsiteLink = ({
  to,
  targetBlank = false,
  children = undefined,
  className = undefined,
}: OffsiteLinkProps) => (
  <a
    href={to}
    className={className}
    target={targetBlank ? '_blank' : undefined}
    rel={targetBlank ? 'noopener noreferrer' : undefined}
  >
    {children ?? to}
  </a>
);
