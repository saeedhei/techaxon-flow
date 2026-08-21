"use client";

import {
  Background,
  Controls,
  ReactFlow,
  type NodeTypes,
} from "@xyflow/react";

import {
  architectureEdges,
  architectureNodes,
} from "../data";

import { ArchitectureNode } from "./architecture-node";

import "@xyflow/react/dist/style.css";

const nodeTypes: NodeTypes = {
  architecture: ArchitectureNode,
};

export function ArchitectureFlow() {
  return (
    <div className="h-[900px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <ReactFlow
        nodes={architectureNodes}
        edges={architectureEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll
        panOnScroll
        proOptions={{
          hideAttribution: true,
        }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "#334155",
            strokeWidth: 2,
          },
        }}
      >
        <Background
          color="#CBD5E1"
          gap={24}
          size={1}
        />

        <Controls
          showInteractive={false}
          className="!border-slate-200 !bg-white"
        />
      </ReactFlow>
    </div>
  );
}