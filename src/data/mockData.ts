import { Cluster } from '@/types/metrics';

/**
 * Static mock data — three-level hierarchy:
 *   Cluster  →  Namespace  →  Pod
 *
 * Replace fetchClusters() with a real API call when ready.
 */
export const MOCK_CLUSTERS: Cluster[] = [
  {
    id: 'prod-us-east',
    name: 'prod-us-east-1',
    region: 'us-east-1',
    cpu: 72,
    memory: 61,
    podCount: 142,
    status: 'warning',
    namespaces: [
      {
        id: 'ns-api',
        name: 'api-services',
        cpu: 84,
        memory: 71,
        podCount: 38,
        status: 'warning',
        pods: [
          { id: 'pod-gateway',  name: 'api-gateway-7d4f',   cpu: 91, memory: 78, status: 'critical', restarts: 3, age: '12d' },
          { id: 'pod-auth',     name: 'auth-service-6b2c',  cpu: 45, memory: 52, status: 'healthy',  restarts: 0, age: '4d'  },
          { id: 'pod-users',    name: 'user-svc-9a1e',      cpu: 67, memory: 81, status: 'warning',  restarts: 1, age: '8d'  },
          { id: 'pod-payments', name: 'payment-svc-3f8d',   cpu: 38, memory: 44, status: 'healthy',  restarts: 0, age: '2d'  },
          { id: 'pod-notifs',   name: 'notification-svc',   cpu: 22, memory: 31, status: 'healthy',  restarts: 0, age: '6d'  },
        ],
      },
      {
        id: 'ns-data',
        name: 'data-pipeline',
        cpu: 63,
        memory: 55,
        podCount: 22,
        status: 'healthy',
        pods: [
          { id: 'pod-kafka',  name: 'kafka-broker-0',      cpu: 78, memory: 82, status: 'warning', restarts: 0, age: '30d' },
          { id: 'pod-spark',  name: 'spark-driver-5c2a',   cpu: 55, memory: 43, status: 'healthy', restarts: 0, age: '1d'  },
          { id: 'pod-redis',  name: 'redis-master-1',      cpu: 31, memory: 67, status: 'healthy', restarts: 0, age: '30d' },
          { id: 'pod-flink',  name: 'flink-jobmgr-3e7b',   cpu: 48, memory: 39, status: 'healthy', restarts: 0, age: '5d'  },
        ],
      },
      {
        id: 'ns-monitoring',
        name: 'monitoring',
        cpu: 41,
        memory: 38,
        podCount: 18,
        status: 'healthy',
        pods: [
          { id: 'pod-prometheus', name: 'prometheus-0',      cpu: 48, memory: 71, status: 'healthy', restarts: 0, age: '30d' },
          { id: 'pod-grafana',    name: 'grafana-6d8f',      cpu: 22, memory: 28, status: 'healthy', restarts: 0, age: '15d' },
          { id: 'pod-alertmgr',  name: 'alertmanager-0',    cpu: 12, memory: 18, status: 'healthy', restarts: 0, age: '30d' },
          { id: 'pod-otel',       name: 'otel-collector-2',  cpu: 19, memory: 24, status: 'healthy', restarts: 0, age: '7d'  },
        ],
      },
    ],
  },
  {
    id: 'prod-eu-west',
    name: 'prod-eu-west-2',
    region: 'eu-west-2',
    cpu: 48,
    memory: 54,
    podCount: 97,
    status: 'healthy',
    namespaces: [
      {
        id: 'ns-web-eu',
        name: 'web-frontend',
        cpu: 52,
        memory: 47,
        podCount: 31,
        status: 'healthy',
        pods: [
          { id: 'pod-nginx-eu',  name: 'nginx-proxy-4a1b',  cpu: 18, memory: 22, status: 'healthy', restarts: 0, age: '14d' },
          { id: 'pod-nextjs',    name: 'nextjs-app-2f9c',   cpu: 61, memory: 58, status: 'healthy', restarts: 0, age: '3d'  },
          { id: 'pod-cdn',       name: 'cdn-origin-8e3d',   cpu: 29, memory: 31, status: 'healthy', restarts: 0, age: '7d'  },
          { id: 'pod-ssr',       name: 'ssr-renderer-1a3c', cpu: 44, memory: 39, status: 'healthy', restarts: 0, age: '2d'  },
        ],
      },
      {
        id: 'ns-db-eu',
        name: 'databases',
        cpu: 71,
        memory: 88,
        podCount: 12,
        status: 'critical',
        pods: [
          { id: 'pod-postgres',    name: 'postgres-primary',   cpu: 82, memory: 94, status: 'critical', restarts: 2, age: '30d' },
          { id: 'pod-pg-replica',  name: 'postgres-replica-0', cpu: 61, memory: 82, status: 'warning',  restarts: 0, age: '30d' },
          { id: 'pod-pgbouncer',   name: 'pgbouncer-6f2a',     cpu: 14, memory: 19, status: 'healthy',  restarts: 0, age: '12d' },
        ],
      },
      {
        id: 'ns-infra-eu',
        name: 'infra',
        cpu: 28,
        memory: 33,
        podCount: 9,
        status: 'healthy',
        pods: [
          { id: 'pod-coredns',  name: 'coredns-7b4e',   cpu: 11, memory: 14, status: 'healthy', restarts: 0, age: '30d' },
          { id: 'pod-ingress',  name: 'ingress-nginx-0', cpu: 33, memory: 41, status: 'healthy', restarts: 0, age: '30d' },
          { id: 'pod-cert-mgr', name: 'cert-manager-0',  cpu: 8,  memory: 12, status: 'healthy', restarts: 0, age: '30d' },
        ],
      },
    ],
  },
  {
    id: 'staging',
    name: 'staging-cluster',
    region: 'us-west-2',
    cpu: 31,
    memory: 28,
    podCount: 54,
    status: 'healthy',
    namespaces: [
      {
        id: 'ns-stg-api',
        name: 'api-staging',
        cpu: 38,
        memory: 32,
        podCount: 21,
        status: 'healthy',
        pods: [
          { id: 'pod-stg-gw',   name: 'api-gateway-stg',   cpu: 41, memory: 35, status: 'healthy', restarts: 0, age: '2d' },
          { id: 'pod-stg-auth', name: 'auth-service-stg',  cpu: 28, memory: 24, status: 'healthy', restarts: 0, age: '2d' },
          { id: 'pod-stg-user', name: 'user-svc-stg',      cpu: 33, memory: 29, status: 'healthy', restarts: 1, age: '1d' },
        ],
      },
      {
        id: 'ns-stg-test',
        name: 'integration-tests',
        cpu: 12,
        memory: 15,
        podCount: 8,
        status: 'unknown',
        pods: [
          { id: 'pod-test-runner', name: 'test-runner-7c4e', cpu: 15, memory: 18, status: 'unknown', restarts: 4, age: '1d' },
          { id: 'pod-test-db',     name: 'test-postgres',    cpu: 9,  memory: 11, status: 'unknown', restarts: 0, age: '1d' },
        ],
      },
    ],
  },
  {
    id: 'dev',
    name: 'dev-cluster',
    region: 'us-central-1',
    cpu: 22,
    memory: 19,
    podCount: 29,
    status: 'healthy',
    namespaces: [
      {
        id: 'ns-dev-sandbox',
        name: 'sandbox',
        cpu: 25,
        memory: 21,
        podCount: 19,
        status: 'healthy',
        pods: [
          { id: 'pod-dev-1', name: 'dev-sandbox-alpha',   cpu: 28, memory: 22, status: 'healthy', restarts: 0, age: '5d' },
          { id: 'pod-dev-2', name: 'dev-sandbox-beta',    cpu: 18, memory: 17, status: 'healthy', restarts: 0, age: '3d' },
          { id: 'pod-dev-3', name: 'feature-branch-main', cpu: 31, memory: 28, status: 'healthy', restarts: 0, age: '1d' },
        ],
      },
      {
        id: 'ns-dev-tools',
        name: 'dev-tools',
        cpu: 14,
        memory: 16,
        podCount: 10,
        status: 'healthy',
        pods: [
          { id: 'pod-vault',  name: 'vault-dev-0',       cpu: 12, memory: 19, status: 'healthy', restarts: 0, age: '15d' },
          { id: 'pod-jaeger', name: 'jaeger-all-in-one', cpu: 16, memory: 13, status: 'healthy', restarts: 0, age: '10d' },
        ],
      },
    ],
  },
];
