import type { Edge, Node } from "@xyflow/react";

export type ArchitectureNodeData = {
  title: string;
  subtitle?: string;
  details?: string;
  variant:
    | "users"
    | "internet"
    | "proxy"
    | "application"
    | "iam"
    | "database"
    | "cache";
};

export type ArchitectureNode = Node<ArchitectureNodeData>;

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "users",
    type: "architecture",
    position: {
      x: 400,
      y: 0,
    },
    data: {
      title: "Users",
      variant: "users",
    },
  },

  {
    id: "internet",
    type: "architecture",
    position: {
      x: 400,
      y: 140,
    },
    data: {
      title: "Internet",
      variant: "internet",
    },
  },

  {
    id: "traefik",
    type: "architecture",
    position: {
      x: 400,
      y: 280,
    },
    data: {
      title: "Traefik",
      subtitle: "Reverse Proxy",
      details: "TLS / Routing",
      variant: "proxy",
    },
  },

  {
    id: "kanban",
    type: "architecture",
    position: {
      x: 0,
      y: 500,
    },
    data: {
      title: "Kanban",
      subtitle: "Next.js",
      variant: "application",
    },
  },

  {
    id: "lms",
    type: "architecture",
    position: {
      x: 400,
      y: 500,
    },
    data: {
      title: "LMS",
      subtitle: "Next.js",
      variant: "application",
    },
  },

  {
    id: "shop",
    type: "architecture",
    position: {
      x: 800,
      y: 500,
    },
    data: {
      title: "Shop",
      subtitle: "Next.js",
      variant: "application",
    },
  },

  {
    id: "iam",
    type: "architecture",
    position: {
      x: 400,
      y: 700,
    },
    data: {
      title: "IAM",
      subtitle: "NestJS",
      details: "Auth / RBAC / JWT",
      variant: "iam",
    },
  },

  {
    id: "couchdb",
    type: "architecture",
    position: {
      x: 150,
      y: 900,
    },
    data: {
      title: "CouchDB",
      subtitle: "Database",
      variant: "database",
    },
  },

  {
    id: "redis",
    type: "architecture",
    position: {
      x: 650,
      y: 900,
    },
    data: {
      title: "Redis",
      subtitle: "Cache / Queue",
      variant: "cache",
    },
  },
];

export const architectureEdges: Edge[] = [
  {
    id: "users-internet",
    source: "users",
    target: "internet",
    type: "smoothstep",
  },

  {
    id: "internet-traefik",
    source: "internet",
    target: "traefik",
    type: "smoothstep",
  },

  {
    id: "traefik-kanban",
    source: "traefik",
    target: "kanban",
    type: "smoothstep",
  },

  {
    id: "traefik-lms",
    source: "traefik",
    target: "lms",
    type: "smoothstep",
  },

  {
    id: "traefik-shop",
    source: "traefik",
    target: "shop",
    type: "smoothstep",
  },

  {
    id: "kanban-iam",
    source: "kanban",
    target: "iam",
    type: "smoothstep",
  },

  {
    id: "lms-iam",
    source: "lms",
    target: "iam",
    type: "smoothstep",
  },

  {
    id: "shop-iam",
    source: "shop",
    target: "iam",
    type: "smoothstep",
  },

  {
    id: "iam-couchdb",
    source: "iam",
    target: "couchdb",
    type: "smoothstep",
  },

  {
    id: "iam-redis",
    source: "iam",
    target: "redis",
    type: "smoothstep",
  },
];