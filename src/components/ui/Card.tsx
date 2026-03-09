import { ReactNode } from 'react';

interface CardProps {
  children:    ReactNode;
  className?:  string;
  variant?:    'default' | 'elevated' | 'glow-amber' | 'glow-cyan';
  onClick?:    () => void;
  isClickable?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<CardProps['variant']>, string> = {
  'default':    'bg-bg-surface border border-border',
  'elevated':   'bg-bg-elevated border border-border-bright',
  'glow-amber': 'bg-bg-surface surface-glow-amber',
  'glow-cyan':  'bg-bg-surface surface-glow-cyan',
};

/**
 * Base container component.
 *
 * Design highlights:
 *  • Enables CSS container queries via the `.cq-container` class.
 *    Child elements can use `@container` breakpoints to adapt to THIS
 *    card's width — not the viewport — enabling true atomicity.
 *  • The `.card-row-adaptive` utility (defined in globals.css) switches
 *    its flex-direction at 480px of container width.
 */
export default function Card({
  children,
  className    = '',
  variant      = 'default',
  onClick,
  isClickable  = false,
}: CardProps) {
  const interactiveClass = isClickable
    ? 'cursor-pointer hover:bg-bg-hover hover:border-border-bright transition-colors duration-150 active:scale-[0.99]'
    : '';

  return (
    <div
      className={`cq-container rounded ${VARIANT_CLASSES[variant]} ${interactiveClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
