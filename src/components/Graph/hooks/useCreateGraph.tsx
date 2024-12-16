import { UseCreateGraphProps } from "./types.ts";
import { useEffect, useRef, useState } from "react";
import { GraphData, NodeType } from "../types.ts";
import * as d3 from "d3-force";
import { calculateDistance } from "../utils/calculatePosition.ts";

export const useCreateGraph = ({ nodes }: UseCreateGraphProps) => {
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

  return [graphData, forceGraphRef] as const;
};
