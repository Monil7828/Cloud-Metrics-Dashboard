'use client';

import { motion } from 'framer-motion';
import Badge from './Badge';
import { MetricItem } from '@/types/metrics';

// ── Prop types ─────────────────────────────────────────────────────
interface AnimatedBarProps {
  item:        MetricItem;
  index:       number;
  isClickable?: boolean;
  onClick?:    (item: MetricItem) => void;
  layoutId?:   string;
}

// ── Framer Motion variants ────────────────────────────────────────
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.065, duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const fillVariants = {
  hidden:  { scaleX: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    transition: { delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ── Sub-component: a single CPU or MEM progress bar ───────────────
function MetricBar({
  label,
  value,
  color,
  animDelay,
}: {
  label:     string;
  value:     number;
  color:     'amber' | 'cyan';
  animDelay: number;
}) {
  const isHot   = value >= 85;
  const isWarm  = value >= 70;

  const trackClass = color === 'amber' ? 'bg-accent-amber-dim' : 'bg-accent-cyan-dim';
  const fillStyle  =
    color === 'amber'
      ? { background: 'linear-gradient(90deg, var(--color-accent-amber), rgba(240,165,0,0.55))' }
      : { background: 'linear-gradient(90deg, var(--color-accent-cyan),  rgba(0,201,192,0.55))'  };

  const valueColor = isHot
    ? 'text-status-critical'
    : isWarm
    ? 'text-status-warning'
    : color === 'amber'
    ? 'text-accent-amber'
    : 'text-accent-cyan';

  return (
    <div className="flex items-center gap-2">
      {/* Label */}
      <span
        className="text-text-muted font-mono w-7 text-right flex-shrink-0 tabular"
        style={{ fontSize: 'var(--font-size-2xs)' }}
      >
        {label}
      </span>

      {/* Track + fill */}
      <div className={`flex-1 h-[5px] rounded-[2px] overflow-hidden relative ${trackClass}`}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-[2px] origin-left"
          style={{ ...fillStyle, width: `${value}%` }}
          variants={fillVariants}
          custom={animDelay}
        />
      </div>

      {/* Value */}
      <span
        className={`font-mono font-semibold w-8 text-right flex-shrink-0 tabular ${valueColor}`}
        style={{ fontSize: 'var(--font-size-2xs)' }}
      >
        {value}%
      </span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function AnimatedBar({
  item,
  index,
  isClickable = false,
  onClick,
  layoutId,
}: AnimatedBarProps) {
  const statusBorderColor = {
    healthy:  'var(--color-status-healthy)',
    warning:  'var(--color-status-warning)',
    critical: 'var(--color-status-critical)',
    unknown:  'var(--color-status-unknown)',
  }[item.status];

  return (
    <motion.div
      layoutId={layoutId}
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      onClick={() => isClickable && onClick?.(item)}
      className={`
        group relative p-3 rounded border border-border border-l-[3px]
        bg-bg-surface
        ${isClickable
          ? 'cursor-pointer hover:bg-bg-hover hover:border-border-bright hover:border-l-[3px]'
          : ''}
        transition-colors duration-150 overflow-hidden
      `}
      style={{ borderLeftColor: statusBorderColor }}
      whileHover={
        isClickable
          ? { borderRightColor: 'var(--color-border-bright)', transition: { duration: 0.12 } }
          : undefined
      }
    >
      {/* Subtle hover shimmer */}
      {isClickable && (
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          pointer-events-none
          bg-gradient-to-r from-transparent via-white/[0.02] to-transparent
        " />
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-text-primary font-medium truncate"
            style={{ fontSize: 'var(--font-size-sm)' }}
          >
            {item.name}
          </span>
          {item.subLabel && (
            <span
              className="text-text-muted flex-shrink-0 font-mono"
              style={{ fontSize: 'var(--font-size-2xs)' }}
            >
              [{item.subLabel}]
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {item.count !== undefined && (
            <span
              className="text-text-muted font-mono tabular"
              style={{ fontSize: 'var(--font-size-2xs)' }}
            >
              {item.count}p
            </span>
          )}
          <Badge status={item.status} size="sm" showLabel={false} />
        </div>
      </div>

      {/* Metric bars */}
      <div className="space-y-[5px]">
        <MetricBar label="CPU" value={item.cpu}    color="amber" animDelay={index * 0.065 + 0.12} />
        <MetricBar label="MEM" value={item.memory} color="cyan"  animDelay={index * 0.065 + 0.22} />
      </div>

      {/* Extra metadata (pod level) */}
      {item.extra && (item.extra.restarts !== undefined || item.extra.age) && (
        <div
          className="flex gap-4 mt-2 pt-2 border-t border-border"
          style={{ fontSize: 'var(--font-size-2xs)' }}
        >
          {item.extra.restarts !== undefined && (
            <span
              className={`font-mono tabular ${
                item.extra.restarts > 0 ? 'text-status-warning' : 'text-text-muted'
              }`}
            >
              RESTARTS: {item.extra.restarts}
            </span>
          )}
          {item.extra.age && (
            <span className="text-text-muted font-mono">AGE: {item.extra.age}</span>
          )}
        </div>
      )}

      {/* Drill-down chevron */}
      {isClickable && (
        <span
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-accent-amber opacity-0 group-hover:opacity-100
            transition-opacity duration-150
          "
          style={{ fontSize: 'var(--font-size-xs)' }}
          aria-hidden
        >
          ›
        </span>
      )}
    </motion.div>
  );
}
