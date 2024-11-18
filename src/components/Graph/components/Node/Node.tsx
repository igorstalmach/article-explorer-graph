import { NodeProps } from "./types.ts";

export const Node = ({ x, y, color, radius = 5 }: NodeProps) => (
  <circle
    cx={x}
    cy={y}
    r={radius}
    fill={color}
    stroke="#fff"
    strokeWidth={1.5}
  />
);
