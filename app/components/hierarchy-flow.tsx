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

export type HierarchyItem = {
  id: string;
  label: string;
  children?: HierarchyItem[];
};

export type HierarchyConnection = {
  source: string;
  target: string;
};

type HierarchyNodeData = { label: string };
type HierarchyFlowNode = Node<HierarchyNodeData, "hierarchy">;

type HierarchyFlowProps = {
  data: HierarchyItem;
  connections?: HierarchyConnection[];
  className?: string;
};

function HierarchyNode({ data }: NodeProps<HierarchyFlowNode>) {
  return (
    <div className="min-w-32 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <Handle id="tree-target" type="target" position={Position.Top} className="!border-0 !bg-zinc-400" />
      {data.label}
      <Handle id="tree-source" type="source" position={Position.Bottom} className="!border-0 !bg-zinc-400" />
      <Handle id="connection-target" type="target" position={Position.Left} className="!border-0 !bg-sky-500" />
      <Handle id="connection-source" type="source" position={Position.Right} className="!border-0 !bg-sky-500" />
    </div>
  );
}

const nodeTypes = { hierarchy: HierarchyNode };

function createFlowElements(data: HierarchyItem, connections: HierarchyConnection[]) {
  const nodes: HierarchyFlowNode[] = [];
  const edges: Edge[] = [];
  let leafIndex = 0;

  function visit(item: HierarchyItem, depth: number, parentId?: string): number {
    const childPositions = item.children?.map((child) => visit(child, depth + 1, item.id));
    const x =
      childPositions && childPositions.length > 0
        ? childPositions.reduce((total, position) => total + position, 0) / childPositions.length
        : leafIndex++;

    nodes.push({
      id: item.id,
      type: "hierarchy",
      position: { x: x * 210, y: depth * 150 },
      data: { label: item.label },
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${item.id}`,
        source: parentId,
        target: item.id,
        sourceHandle: "tree-source",
        targetHandle: "tree-target",
        type: "smoothstep",
        style: { stroke: "#a1a1aa", strokeWidth: 1.5 },
      });
    }

    return x;
  }

  visit(data, 0);

  connections.forEach(({ source, target }) => {
    edges.push({
      id: `connection-${source}-${target}`,
      source,
      target,
      sourceHandle: "connection-source",
      targetHandle: "connection-target",
      type: "smoothstep",
      style: { stroke: "#0ea5e9", strokeWidth: 1.5, strokeDasharray: "5 4" },
    });
  });

  return { nodes, edges };
}

export function HierarchyFlow({ data, connections = [], className }: HierarchyFlowProps) {
  const { nodes, edges } = useMemo(() => createFlowElements(data, connections), [data, connections]);

  return (
    <div className={`h-[520px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 ${className ?? ""}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#d4d4d8" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
