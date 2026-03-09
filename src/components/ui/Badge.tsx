import { ResourceStatus } from '@/types/metrics';

interface BadgeProps {
  status: ResourceStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  ResourceStatus,
  { label: string; wrapClass: string; dotClass: string }
> = {
  healthy: {
    label:     'HEALTHY',
    wrapClass: 'bg-status-healthy/10 text-status-healthy border-status-healthy/25',
    dotClass:  'bg-status-healthy',
  },
  warning: {
    label:     'WARN',
    wrapClass: 'bg-status-warning/10 text-status-warning border-status-warning/25',
    dotClass:  'bg-status-warning animate-pulse-dot',
  },
  critical: {
    label:     'CRIT',
    wrapClass: 'bg-status-critical/10 text-status-critical border-status-critical/25',
    dotClass:  'bg-status-critical animate-pulse-dot',
  },
  unknown: {
    label:     'UNKN',
    wrapClass: 'bg-status-unknown/10 text-status-unknown border-status-unknown/25',
    dotClass:  'bg-status-unknown',
  },
};

export default function Badge({ status, showLabel = true, size = 'md' }: BadgeProps) {
  const cfg = STATUS_CONFIG[status];

  const padClass  = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1';
  const textClass = size === 'sm' ? 'text-[0.6rem]' : 'text-[0.65rem]';
  const dotSize   = size === 'sm' ? 'w-1 h-1'       : 'w-1.5 h-1.5';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 border font-mono font-semibold
        tracking-widest rounded-sm flex-shrink-0
        ${padClass} ${textClass} ${cfg.wrapClass}
      `}
    >
      <span className={`rounded-full flex-shrink-0 ${dotSize} ${cfg.dotClass}`} />
      {showLabel && cfg.label}
    </span>
  );
}
