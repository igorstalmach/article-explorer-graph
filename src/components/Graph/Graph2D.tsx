import { GraphProps } from "./types.ts";
import ForceGraph2D from "react-force-graph-2d";
import { useCreateGraph } from "./hooks";

export const Graph2D = ({ nodes }: GraphProps) => {
  const [graphData, forceGraphRef] = useCreateGraph({ nodes });

  return <ForceGraph2D graphData={graphData} ref={forceGraphRef} />;
};
