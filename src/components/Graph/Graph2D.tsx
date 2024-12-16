import { GraphProps } from "./types.ts";
import ForceGraph2D from "react-force-graph-2d";
import { useCreateGraph } from "./hooks";

const NODE_SIZE = 8;

const LINK_WIDTH = 3;

export const Graph2D = ({ nodes }: GraphProps) => {
  const { graphData, forceGraphRef } = useCreateGraph({ nodes });

  return (
    <ForceGraph2D
      graphData={graphData}
      ref={forceGraphRef}
      backgroundColor={"#000011"}
      nodeRelSize={NODE_SIZE}
      linkWidth={LINK_WIDTH}
      linkDirectionalParticles={1}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleColor={() => "#b9b9b9"}
      linkDirectionalParticleWidth={LINK_WIDTH}
    />
  );
};
