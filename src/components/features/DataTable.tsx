'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { MetricItem, DrillDownLevel } from '@/types/metrics';

interface DataTableProps {
  items:       MetricItem[];
  level:       DrillDownLevel;
  onItemClick: (item: MetricItem) => void;
}

const rowVariants = {
  hidden:  { opacity: 0, x: 8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: 'easeOut' as const },
  }),
  exit: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.14 },
  },
};

function ValueCell({ value, type }: { value: number; type: 'cpu' | 'memory' }) {
  const alertClass =
    value >= 85
      ? 'text-status-critical'
      : value >= 70
      ? 'text-status-warning'
      : type === 'cpu'
      ? 'text-accent-amber'
      : 'text-accent-cyan';

  return (
    <td className="py-2 px-2 text-right">
      <span
        className={`font-mono font-semibold tabular ${alertClass}`}
        style={{ fontSize: 'var(--font-size-xs)' }}
      >
        {value}%
      </span>
    </td>
  );
}

export default function DataTable({ items, level, onItemClick }: DataTableProps) {
  const isClickable = level !== 'pod';

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[280px]">
        <thead>
          <tr className="border-b border-border">
            {['NAME', 'CPU', 'MEM', level !== 'pod' ? 'PODS' : 'AGE', 'STATUS'].map((h) => (
              <th
                key={h}
                className={`py-2 px-2 text-text-muted font-normal tracking-widest ${
                  h === 'NAME' ? 'text-left' : 'text-right'
                }`}
                style={{ fontSize: 'var(--font-size-2xs)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence mode="wait">
            {items.map((item, index) => (
              <motion.tr
                key={item.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                onClick={() => isClickable && onItemClick(item)}
                className={`
                  border-b border-border/40 last:border-b-0
                  ${isClickable ? 'cursor-pointer hover:bg-bg-hover' : ''}
                  transition-colors duration-100
                `}
              >
                {/* Name */}
                <td className="py-2 px-2">
                  <div
                    className="text-text-primary truncate max-w-[140px]"
                    style={{ fontSize: 'var(--font-size-xs)' }}
                    title={item.name}
                  >
                    {item.name}
                  </div>
                  {item.subLabel && (
                    <div
                      className="text-text-muted font-mono"
                      style={{ fontSize: 'var(--font-size-2xs)' }}
                    >
                      {item.subLabel}
                    </div>
                  )}
                </td>

                <ValueCell value={item.cpu}    type="cpu"    />
                <ValueCell value={item.memory} type="memory" />

                {/* Pods / Age */}
                <td className="py-2 px-2 text-right">
                  <span
                    className="text-text-secondary font-mono tabular"
                    style={{ fontSize: 'var(--font-size-xs)' }}
                  >
                    {level !== 'pod'
                      ? (item.count ?? '—')
                      : (item.extra?.age ?? '—')}
                  </span>
                </td>

                {/* Status */}
                <td className="py-2 px-2 text-right">
                  <Badge status={item.status} size="sm" />
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
