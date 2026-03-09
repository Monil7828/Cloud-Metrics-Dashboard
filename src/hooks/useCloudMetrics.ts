'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { MOCK_CLUSTERS } from '@/data/mockData';
import { Cluster, Namespace, MetricItem, DrillDownLevel, ClusterStats } from '@/types/metrics';

// ── Simulated async fetch (swap for real API call) ─────────────────
const fetchClusters = async (): Promise<Cluster[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return MOCK_CLUSTERS;
};

// ── Hook ───────────────────────────────────────────────────────────
export function useCloudMetrics() {
  const [selectedCluster,   setSelectedCluster]   = useState<Cluster   | null>(null);
  const [selectedNamespace, setSelectedNamespace] = useState<Namespace | null>(null);

  // React Query handles fetch, caching (staleTime=5min), and error/loading states.
  const { data: clusters, isLoading, isError, refetch } = useQuery({
    queryKey: ['clusters'],
    queryFn:  fetchClusters,
    staleTime: 5  * 60 * 1000,   // cached for 5 minutes — no redundant requests
    gcTime:    10 * 60 * 1000,
  });

  // ── Derived level ─────────────────────────────────────────────
  const level: DrillDownLevel = !selectedCluster
    ? 'cluster'
    : !selectedNamespace
    ? 'namespace'
    : 'pod';

  // ── Normalise current data into MetricItem[] ──────────────────
  const currentItems: MetricItem[] = (() => {
    if (!clusters) return [];

    if (level === 'cluster') {
      return clusters.map((c) => ({
        id:       c.id,
        name:     c.name,
        cpu:      c.cpu,
        memory:   c.memory,
        status:   c.status,
        subLabel: c.region,
        count:    c.podCount,
        extra:    { region: c.region },
      }));
    }

    if (level === 'namespace' && selectedCluster) {
      return selectedCluster.namespaces.map((ns) => ({
        id:     ns.id,
        name:   ns.name,
        cpu:    ns.cpu,
        memory: ns.memory,
        status: ns.status,
        count:  ns.podCount,
      }));
    }

    if (level === 'pod' && selectedNamespace) {
      return selectedNamespace.pods.map((pod) => ({
        id:     pod.id,
        name:   pod.name,
        cpu:    pod.cpu,
        memory: pod.memory,
        status: pod.status,
        extra:  { restarts: pod.restarts, age: pod.age },
      }));
    }

    return [];
  })();

  // ── Actions ───────────────────────────────────────────────────
  const handleItemClick = useCallback(
    (item: MetricItem) => {
      if (level === 'cluster') {
        const cluster = clusters?.find((c) => c.id === item.id);
        if (cluster) setSelectedCluster(cluster);
      } else if (level === 'namespace') {
        const ns = selectedCluster?.namespaces.find((n) => n.id === item.id);
        if (ns) setSelectedNamespace(ns);
      }
      // Pod level: no further drill-down
    },
    [level, clusters, selectedCluster]
  );

  const goBack = useCallback(() => {
    if (selectedNamespace) setSelectedNamespace(null);
    else if (selectedCluster) setSelectedCluster(null);
  }, [selectedCluster, selectedNamespace]);

  const goToLevel = useCallback(
    (targetLevel: DrillDownLevel) => {
      if (targetLevel === 'cluster') {
        setSelectedCluster(null);
        setSelectedNamespace(null);
      } else if (targetLevel === 'namespace') {
        setSelectedNamespace(null);
      }
    },
    []
  );

  // ── Breadcrumbs ───────────────────────────────────────────────
  const breadcrumbs = [
    { label: 'All Clusters', level: 'cluster' as DrillDownLevel },
    ...(selectedCluster
      ? [{ label: selectedCluster.name, level: 'namespace' as DrillDownLevel }]
      : []),
    ...(selectedNamespace
      ? [{ label: selectedNamespace.name, level: 'pod' as DrillDownLevel }]
      : []),
  ];

  // ── Aggregate stats for summary cards ────────────────────────
  const stats: ClusterStats | null = clusters
    ? {
        totalClusters: clusters.length,
        totalPods:     clusters.reduce((s, c) => s + c.podCount, 0),
        criticalCount: clusters.filter((c) => c.status === 'critical').length,
        warningCount:  clusters.filter((c) => c.status === 'warning').length,
        healthyCount:  clusters.filter((c) => c.status === 'healthy').length,
        avgCpu:    Math.round(clusters.reduce((s, c) => s + c.cpu,    0) / clusters.length),
        avgMemory: Math.round(clusters.reduce((s, c) => s + c.memory, 0) / clusters.length),
      }
    : null;

  return {
    clusters,
    isLoading,
    isError,
    refetch,
    level,
    currentItems,
    selectedCluster,
    selectedNamespace,
    handleItemClick,
    goBack,
    goToLevel,
    breadcrumbs,
    canDrillDown: level !== 'pod',
    stats,
  };
}
