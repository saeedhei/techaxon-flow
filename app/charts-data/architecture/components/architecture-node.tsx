"use client";

import {
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import type { ArchitectureNode } from "../data";

const variantStyles = {
  users: {
    border: "border-blue-400",
    icon: "bg-blue-500",
  },

  internet: {
    border: "border-violet-400",
    icon: "bg-violet-500",
  },

  proxy: {
    border: "border-emerald-400",
    icon: "bg-emerald-500",
  },

  application: {
    border: "border-blue-400",
    icon: "bg-blue-500",
  },

  iam: {
    border: "border-amber-400",
    icon: "bg-amber-500",
  },

  database: {
    border: "border-emerald-400",
    icon: "bg-emerald-500",
  },

  cache: {
    border: "border-violet-400",
    icon: "bg-violet-500",
  },
};

function ArchitectureIcon({
  variant,
}: {
  variant: ArchitectureNode["data"]["variant"];
}) {
  const icon = {
    users: "👥",
    internet: "◎",
    proxy: "◆",
    application: "▣",
    iam: "🔒",
    database: "●",
    cache: "◆",
  }[variant];

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-white ${
        variantStyles[variant].icon
      }`}
    >
      {icon}
    </div>
  );
}

export function ArchitectureNode({
  data,
}: NodeProps<ArchitectureNode>) {
  const styles = variantStyles[data.variant];

  return (
    <div
      className={`w-[230px] rounded-xl border bg-white px-5 py-4 shadow-sm ${styles.border}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-slate-700"
      />

      <div className="flex items-center gap-4">
        <ArchitectureIcon variant={data.variant} />

        <div className="min-w-0">
          <div className="text-base font-semibold text-slate-900">
            {data.title}
          </div>

          {data.subtitle && (
            <div className="mt-0.5 text-sm text-slate-600">
              {data.subtitle}
            </div>
          )}

          {data.details && (
            <div className="mt-1 text-sm text-slate-600">
              {data.details}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-slate-700"
      />
    </div>
  );
}