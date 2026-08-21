"use client";

import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useMemo } from "react";

import "@xyflow/react/dist/style.css";

export type HierarchyItem = {
  id: string;
  label: string;
  badge?: string;
  children?: HierarchyItem[];
};

export type HierarchyConnection = {
  source: string;
  target: string;
};

type HierarchyNodeData = {
  label: string;
  badge?: string;
};

type HierarchyFlowNode = Node<HierarchyNodeData, "hierarchy">;

type HierarchyFlowProps = {
  data: HierarchyItem;
  connections?: HierarchyConnection[];
  className?: string;
};

function HierarchyNode({
  data,
}: NodeProps<HierarchyFlowNode>) {
  return (
    <div className="relative min-w-36 rounded-xl border border-slate-300 bg-white px-4 py-3 text-center shadow-sm transition-shadow hover:shadow-md">
      {/* Tree connection: incoming */}
      <Handle
        id="tree-target"
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border-0 !bg-slate-400"
      />

      {/* Node title */}
      <div className="text-sm font-semibold text-slate-800">
        {data.label}
      </div>

      {/* Optional badge */}
      {data.badge ? (
        <div className="mt-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          {data.badge}
        </div>
      ) : null}

      {/* Tree connection: outgoing */}
      <Handle
        id="tree-source"
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border-0 !bg-slate-400"
      />

      {/* Secondary connection: incoming */}
      <Handle
        id="connection-target"
        type="target"
        position={Position.Left}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />

      {/* Secondary connection: outgoing */}
      <Handle
        id="connection-source"
        type="source"
        position={Position.Right}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />
    </div>
  );
}

const nodeTypes = {
  hierarchy: HierarchyNode,
};

function createFlowElements(
  data: HierarchyItem,
  connections: HierarchyConnection[],
) {
  const nodes: HierarchyFlowNode[] = [];
  const edges: Edge[] = [];

  let leafIndex = 0;

  function visit(
    item: HierarchyItem,
    depth: number,
    parentId?: string,
  ): number {
    const childPositions = item.children?.map((child) =>
      visit(child, depth + 1, item.id),
    );

    const x =
      childPositions && childPositions.length > 0
        ? childPositions.reduce(
            (total, position) => total + position,
            0,
          ) / childPositions.length
        : leafIndex++;

    nodes.push({
      id: item.id,
      type: "hierarchy",
      position: {
        x: x * 240,
        y: depth * 150,
      },
      data: {
        label: item.label,
        badge: item.badge,
      },
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${item.id}`,
        source: parentId,
        target: item.id,
        sourceHandle: "tree-source",
        targetHandle: "tree-target",
        type: "smoothstep",
        style: {
          stroke: "#94A3B8",
          strokeWidth: 1.5,
        },
      });
    }

    return x;
  }

  visit(data, 0);

  /*
   * Secondary relationships.
   *
   * Example:
   * IAM → Kanban
   * IAM → LMS
   *
   * These are intentionally different from
   * the main hierarchy connections.
   */
  connections.forEach(({ source, target }) => {
    edges.push({
      id: `connection-${source}-${target}`,
      source,
      target,
      sourceHandle: "connection-source",
      targetHandle: "connection-target",
      type: "bezier",
      style: {
        stroke: "#0EA5E9",
        strokeWidth: 1.5,
      },
    });
  });

  return {
    nodes,
    edges,
  };
}

export function HierarchyFlow({
  data,
  connections = [],
  className,
}: HierarchyFlowProps) {
  const { nodes, edges } = useMemo(
    () => createFlowElements(data, connections),
    [data, connections],
  );

  return (
    <div
      className={`h-[520px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${
        className ?? ""
      }`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.25,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnDoubleClick={false}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background
          color="#CBD5E1"
          gap={24}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}