import { GraphProps, NodeData, NodeType } from "./types.ts";
import {
  calculateDistance,
} from "./utils/calculatePosition.ts";
import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import * as d3 from "d3-force";
import { useEffect, useRef, useState } from "react";

export const Graph = ({ nodes }: GraphProps) => {
  let didMount = false;
  const fg = useRef<any>();
  const mainNode: NodeType = nodes.filter((node) => node.isTarget)[0];
  const [nodesObject, setNodes] = useState<NodeData>({
    nodes: [{ id: mainNode.id, name: mainNode.name}],
    links: [],
  });

  const updateNodes = () => {
    fg.current.d3Force(
      "link",
      d3.forceLink().distance((link: any) => {
        console.log(link);
        return link.distance;
      })
    );
    nodes.map((node) => {
      const nodeDistance = calculateDistance(node.similarity);

      if (!node.isTarget && mainNode != null) {
        setNodes((prevState) => ({
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
    didMount ? updateNodes() : (didMount = true);
  }, []);

  return <ForceGraph2D graphData={nodesObject} ref={fg} />;
};
