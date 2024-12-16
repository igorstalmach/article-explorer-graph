import { GraphProps } from "./types.ts";
import ForceGraph3D from "react-force-graph-3d";
import { useCreateGraph } from "./hooks";

export const Graph3D = ({ nodes }: GraphProps) => {
  const [graphData, forceGraphRef] = useCreateGraph({ nodes });

  return <ForceGraph3D graphData={graphData} ref={forceGraphRef} />;
};
