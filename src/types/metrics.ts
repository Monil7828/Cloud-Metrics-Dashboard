export type ResourceStatus = 'healthy' | 'warning' | 'critical' | 'unknown';

export interface Pod {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  status: ResourceStatus;
  restarts: number;
  age: string;
}

export interface Namespace {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  podCount: number;
  status: ResourceStatus;
  pods: Pod[];
}

export interface Cluster {
  id: string;
  name: string;
  region: string;
  cpu: number;
  memory: number;
  podCount: number;
  status: ResourceStatus;
  namespaces: Namespace[];
}

export type DrillDownLevel = 'cluster' | 'namespace' | 'pod';

export interface MetricItem {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  status: ResourceStatus;
  subLabel?: string;
  count?: number;
  extra?: {
    restarts?: number;
    age?: string;
    region?: string;
  };
}

export interface Breadcrumb {
  label: string;
  level: DrillDownLevel;
}

export interface ClusterStats {
  totalClusters: number;
  totalPods: number;
  criticalCount: number;
  warningCount: number;
  healthyCount: number;
  avgCpu: number;
  avgMemory: number;
}
