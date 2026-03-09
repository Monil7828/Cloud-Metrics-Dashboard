'use client';

import { AnimatePresence, motion } from 'framer-motion';
import AnimatedBar from '@/components/ui/AnimatedBar';
import { MetricItem, DrillDownLevel } from '@/types/metrics';

interface MetricsChartProps {
  items:       MetricItem[];
  level:       DrillDownLevel;
  onItemClick: (item: MetricItem) => void;
}

const LEVEL_LABELS: Record<DrillDownLevel, string> = {
  cluster:   'CLUSTERS',
  namespace: 'NAMESPACES',
  pod:       'PODS',
};

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055 } },
  exit:    { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

export default function MetricsChart({ items, level, onItemClick }: MetricsChartProps) {
  const isClickable = level !== 'pod';

  return (
    <div>
      {/* Chart header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-text-muted tracking-widest font-semibold"
            style={{ fontSize: 'var(--font-size-xs)' }}
          >
            {LEVEL_LABELS[level]}
          </span>
          <span
            className="text-text-primary font-mono tabular"
            style={{ fontSize: 'var(--font-size-xs)' }}
          >
            {items.length}
          </span>
        </div>

        {/* Legend */}
        <div
          className="flex items-center gap-3 text-text-muted"
          style={{ fontSize: 'var(--font-size-2xs)' }}
        >
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-[4px] rounded-[1px]"
              style={{ background: 'var(--color-accent-amber)' }}
            />
            CPU
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-[4px] rounded-[1px]"
              style={{ background: 'var(--color-accent-cyan)' }}
            />
            MEM
          </span>
        </div>
      </div>

      {/* Bars */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${level}-${items.map((i) => i.id).join('-')}`}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-2"
        >
          {items.map((item, index) => (
            <AnimatedBar
              key={item.id}
              item={item}
              index={index}
              isClickable={isClickable}
              onClick={onItemClick}
              layoutId={`bar-${item.id}`}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {isClickable && items.length > 0 && (
        <p
          className="mt-3 text-text-muted"
          style={{ fontSize: 'var(--font-size-2xs)' }}
        >
          ↑ Click any row to drill down
        </p>
      )}
    </div>
  );
}
