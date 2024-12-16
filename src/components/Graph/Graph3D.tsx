import { GraphNodeType, GraphProps } from "./types.ts";
import ForceGraph3D from "react-force-graph-3d";
import { useCreateGraph } from "./hooks";
import { useCallback } from "react";
import { useCreateBloom } from "./hooks/useCreateBloom.ts";

const NODE_RESOLUTION = 32;
const NODE_SIZE = 6;

const LINK_RESOLUTION = 32;
const LINK_WIDTH = 1;

export const Graph3D = ({ nodes }: GraphProps) => {
  const { graphData, forceGraphRef } = useCreateGraph({
    nodes,
  });

  useCreateBloom({ forceGraphRef });

  const handleNodeClick = useCallback(
    (node: GraphNodeType) => {
      const distance = 80;
      const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);

      forceGraphRef.current.cameraPosition(
        {
          x: node.x! * distRatio,
          y: node.y! * distRatio,
          z: node.z! * distRatio,
        },
        node,
        1500,
      );
    },
    [forceGraphRef],
  );

  return (
    <ForceGraph3D
      graphData={graphData}
      ref={forceGraphRef}
      onNodeClick={handleNodeClick}
      nodeResolution={NODE_RESOLUTION}
      nodeOpacity={1}
      nodeRelSize={NODE_SIZE}
      linkResolution={LINK_RESOLUTION}
      linkWidth={LINK_WIDTH}
      linkOpacity={0.5}
      linkDirectionalParticles={1}
      linkDirectionalParticleWidth={LINK_WIDTH}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleColor={() => "#fff"}
      linkDirectionalParticleResolution={LINK_RESOLUTION / 2}
      backgroundColor={"#000"}
    />
  );
};
