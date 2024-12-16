import { UseCreateGraphProps } from "./types.ts";
import { useEffect, useRef } from "react";
import { GraphData, GraphLinkType, GraphNodeType, NodeType } from "../types.ts";
import * as d3 from "d3-force";
import { calculateDistance, getRandomColor } from "../utils";

const LINK_COLOR = "#29727e";
const MAIN_NODE_COLOR = "red";

export const useCreateGraph = ({ nodes }: UseCreateGraphProps) => {
  const forceGraphRef = useRef<any>();

  const mainNode: NodeType = nodes.filter((node) => node.isTarget)[0];
  const initialGraphData: GraphData = {
    nodes: [
      {
        id: mainNode && mainNode.id,
        name: mainNode && mainNode.name,
        color: MAIN_NODE_COLOR,
      },
    ],
    links: [],
  };

  useEffect(() => {
    forceGraphRef.current.d3Force(
      "link",
      d3.forceLink().distance((link: any) => link.distance),
    );
  }, []);

  const getNodes = () => {
    const newNodes: GraphNodeType[] = [];
    const newLinks: GraphLinkType[] = [];

    nodes.forEach((node) => {
      if (node.isTarget) {
        return;
      }

      newNodes.push({
        id: node.id,
        name: node.name,
        color: getRandomColor(),
      });
      newLinks.push({
        source: mainNode.id,
        target: node.id,
        distance: calculateDistance(node.similarity),
        color: LINK_COLOR,
        name: `Similarity: ${node.similarity.toFixed(2)}`,
      });
    });

    return {
      nodes: [...initialGraphData.nodes, ...newNodes],
      links: [...initialGraphData.links, ...newLinks],
    };
  };

  return { graphData: getNodes(), forceGraphRef } as const;
};
