import DrillDownSection from '@/components/features/DrillDownSection';

/**
 * Home page — Server Component.
 * Renders the static shell; DrillDownSection is the interactive client boundary.
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen">

      {/* ── Page header ────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-start justify-between gap-4">
          <div>
            <div
              className="text-text-muted tracking-[0.28em] mb-1.5 font-mono"
              style={{ fontSize: 'var(--font-size-2xs)' }}
            >
              INFRASTRUCTURE · METRICS · v2.4.1
            </div>
            <h1
              className="text-gradient-amber font-bold tracking-tight leading-none"
              style={{ fontSize: 'var(--font-size-2xl)' }}
            >
              Cloud Operations
            </h1>
            <p
              className="text-text-secondary mt-2"
              style={{ fontSize: 'var(--font-size-xs)' }}
            >
              Cluster → Namespace → Pod drill-down · React Query cache · Framer Motion
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 mt-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-status-healthy animate-pulse-dot" />
            <span
              className="text-status-healthy tracking-widest font-semibold"
              style={{ fontSize: 'var(--font-size-2xs)' }}
            >
              LIVE
            </span>
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <DrillDownSection />
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border mt-16">
        <div
          className="max-w-6xl mx-auto px-5 sm:px-8 py-4 text-text-muted flex items-center justify-between"
          style={{ fontSize: 'var(--font-size-2xs)' }}
        >
          <span className="tracking-widest">CLOUD METRICS DASHBOARD</span>
          <span className="font-mono">
            Next.js · TanStack Query · Framer Motion · Tailwind
          </span>
        </div>
      </footer>

    </main>
  );
}
