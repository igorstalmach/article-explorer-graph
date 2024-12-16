import { GraphProps, GraphData, NodeType } from "./types.ts";
import { calculateDistance } from "./utils/calculatePosition.ts";
import ForceGraph2D from "react-force-graph-2d";
// import ForceGraph3D from "react-force-graph-3d";
import * as d3 from "d3-force";
import { useEffect, useRef, useState } from "react";

export const Graph = ({ nodes }: GraphProps) => {
  let didMount = false;
  const forceGraphRef = useRef<any>();
  const mainNode: NodeType = nodes.filter((node) => node.isTarget)[0];
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [{ id: mainNode && mainNode.id, name: mainNode && mainNode.name }],
    links: [],
  });

  const updateNodes = () => {
    forceGraphRef.current.d3Force(
      "link",
      d3.forceLink().distance((link: any) => link.distance),
    );
    nodes.forEach((node) => {
      const nodeDistance = calculateDistance(node.similarity);

      if (mainNode && !node.isTarget) {
        setGraphData((prevState) => ({
          ...prevState,
          nodes: [...prevState.nodes, { id: node.id, name: node.name }],
          links: [
            ...prevState.links,
            { source: node.id, target: mainNode.id, distance: nodeDistance },
          ],
        }));
      }
    });
  };

  useEffect(() => {
    // Required due to impurity of d3 handlers.
    didMount ? updateNodes() : (didMount = true);
  }, []);

  return <ForceGraph2D graphData={graphData} ref={forceGraphRef} />;
};
