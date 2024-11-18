import { LinkProps } from "./types.ts";

export const Link = ({ start_x, start_y, end_x, end_y }: LinkProps) => (
  <line
    x1={start_x}
    y1={start_y}
    x2={end_x}
    y2={end_y}
    stroke="#999"
    strokeOpacity={0.6}
    strokeWidth={2}
  />
);
