'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCloudMetrics } from '@/hooks/useCloudMetrics';
import MetricsChart from './MetricsChart';
import DataTable from './DataTable';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { DrillDownLevel } from '@/types/metrics';

// ── Motion variants ────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.1 },
  },
};

const childVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

// ── Skeleton ───────────────────────────────────────────────────────
function SkeletonBar({ opacity }: { opacity: number }) {
  return (
    <div
      className="p-3 border border-border rounded bg-bg-surface animate-pulse"
      style={{ opacity }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="h-3 bg-bg-elevated rounded w-36" />
        <div className="h-3 bg-bg-elevated rounded w-12" />
      </div>
      <div className="space-y-1.5">
        <div className="h-[5px] bg-bg-elevated rounded" />
        <div className="h-[5px] bg-bg-elevated rounded w-4/5" />
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  accent,
}: {
  label:   string;
  value:   string | number;
  accent?: string;
}) {
  return (
    <motion.div
      variants={childVariants}
      className="cq-container p-4 border border-border bg-bg-surface rounded"
    >
      <div
        className="text-text-muted tracking-widest mb-1"
        style={{ fontSize: 'var(--font-size-2xs)' }}
      >
        {label}
      </div>
      <div
        className={`font-bold tabular ${accent ?? 'text-text-primary'}`}
        style={{ fontSize: 'var(--font-size-xl)' }}
      >
        {value}
      </div>
    </motion.div>
  );
}

// ── Context banner — shown when drilled into a cluster/namespace ───
function ContextBanner({
  name,
  sub,
  status,
}: {
  name:    string;
  sub?:    string;
  status:  import('@/types/metrics').ResourceStatus;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="px-5 py-3 border-b border-accent-amber/20 bg-accent-amber-dim flex items-center justify-between gap-4">
        <div>
          <div
            className="text-text-muted tracking-widest mb-0.5"
            style={{ fontSize: 'var(--font-size-2xs)' }}
          >
            CONTEXT
          </div>
          <div
            className="text-accent-amber font-semibold"
            style={{ fontSize: 'var(--font-size-md)' }}
          >
            {name}
          </div>
          {sub && (
            <div
              className="text-text-secondary font-mono mt-0.5"
              style={{ fontSize: 'var(--font-size-xs)' }}
            >
              {sub}
            </div>
          )}
        </div>
        <Badge status={status} />
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function DrillDownSection() {
  const {
    isLoading,
    isError,
    level,
    currentItems,
    selectedCluster,
    selectedNamespace,
    handleItemClick,
    goBack,
    goToLevel,
    breadcrumbs,
    stats,
  } = useCloudMetrics();

  // Key for AnimatePresence — changes whenever the view changes
  const viewKey = `${level}-${selectedCluster?.id ?? ''}-${selectedNamespace?.id ?? ''}`;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative z-10 space-y-4"
    >
      {/* ── Summary stats ─────────────────────────────────────── */}
      {stats && (
        <motion.div
          variants={childVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatCard label="CLUSTERS"  value={stats.totalClusters} />
          <StatCard label="TOTAL PODS" value={stats.totalPods} />
          <StatCard
            label="AVG CPU"
            value={`${stats.avgCpu}%`}
            accent={stats.avgCpu >= 70 ? 'text-status-warning' : 'text-accent-amber'}
          />
          <StatCard
            label="AVG MEMORY"
            value={`${stats.avgMemory}%`}
            accent={stats.avgMemory >= 70 ? 'text-status-warning' : 'text-accent-cyan'}
          />
        </motion.div>
      )}

      {/* ── Main drill-down panel ─────────────────────────────── */}
      <motion.div variants={childVariants}>
        <Card variant="elevated" className="overflow-hidden">

          {/* Panel toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border gap-4">
            {/* Breadcrumb navigation */}
            <nav className="flex items-center gap-1 min-w-0 overflow-hidden" aria-label="Drill-down breadcrumbs">
              {breadcrumbs.map((crumb, i) => {
                const isActive = i === breadcrumbs.length - 1;
                return (
                  <span key={crumb.level} className="flex items-center gap-1 flex-shrink-0">
                    {i > 0 && (
                      <span
                        className="text-text-muted px-0.5"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                      >
                        /
                      </span>
                    )}
                    <button
                      onClick={() => !isActive && goToLevel(crumb.level as DrillDownLevel)}
                      disabled={isActive}
                      className={`
                        font-mono transition-colors duration-150 truncate max-w-[120px]
                        ${isActive
                          ? 'text-accent-amber cursor-default'
                          : 'text-text-muted hover:text-text-primary cursor-pointer'}
                      `}
                      style={{ fontSize: 'var(--font-size-xs)' }}
                      title={crumb.label}
                    >
                      {crumb.label}
                    </button>
                  </span>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {level !== 'cluster' && (
                <button
                  onClick={goBack}
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                  aria-label="Go back one level"
                >
                  ← BACK
                </button>
              )}
              <span
                className="text-text-muted tracking-widest border border-border px-2 py-0.5 rounded-sm"
                style={{ fontSize: 'var(--font-size-2xs)' }}
              >
                {level.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Context banner — morphs in with layoutId when drilling */}
          <AnimatePresence>
            {selectedNamespace && (
              <ContextBanner
                key={`ns-ctx-${selectedNamespace.id}`}
                name={selectedNamespace.name}
                status={selectedNamespace.status}
              />
            )}
            {selectedCluster && !selectedNamespace && (
              <ContextBanner
                key={`cl-ctx-${selectedCluster.id}`}
                name={selectedCluster.name}
                sub={selectedCluster.region}
                status={selectedCluster.status}
              />
            )}
          </AnimatePresence>

          {/* Content area */}
          <div className="p-5">

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-2">
                {[1, 0.75, 0.5, 0.35].map((opacity, i) => (
                  <SkeletonBar key={i} opacity={opacity} />
                ))}
              </div>
            )}

            {/* Error state */}
            {isError && (
              <div className="text-center py-12">
                <div className="text-status-critical text-3xl mb-3">⚠</div>
                <div
                  className="text-status-critical font-mono"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  Failed to load cluster metrics
                </div>
                <p
                  className="text-text-muted mt-1"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  Check your connection and try again
                </p>
              </div>
            )}

            {/* Main grid: chart + table */}
            {!isLoading && !isError && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0,  transition: { duration: 0.15 } }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1px_380px] xl:grid-cols-[1fr_1px_440px] gap-0"
                >
                  {/* Left: animated bars */}
                  <div className="lg:pr-6">
                    <MetricsChart
                      items={currentItems}
                      level={level}
                      onItemClick={handleItemClick}
                    />
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block bg-border self-stretch" />

                  {/* Right: data table */}
                  <div className="lg:pl-6 mt-6 lg:mt-0">
                    <div
                      className="text-text-muted tracking-widest mb-3 font-semibold"
                      style={{ fontSize: 'var(--font-size-xs)' }}
                    >
                      DETAIL VIEW
                    </div>
                    <DataTable
                      items={currentItems}
                      level={level}
                      onItemClick={handleItemClick}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}
