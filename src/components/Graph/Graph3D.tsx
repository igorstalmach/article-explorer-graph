import { GraphNodeType, GraphProps } from "./types.ts";
import ForceGraph3D from "react-force-graph-3d";
import { useCreateGraph } from "./hooks";
import { useCallback } from "react";

const NODE_RESOLUTION = 32;

export const Graph3D = ({ nodes }: GraphProps) => {
  const { graphData, forceGraphRef } = useCreateGraph({
    nodes,
  });

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
    />
  );
};
