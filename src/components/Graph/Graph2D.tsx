import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

import { useCreateGraph } from "../../hooks";
import { GraphProps } from "../../types";

const NODE_SIZE = 8;
const LINK_WIDTH = 3;

export const Graph2D = ({
  articles,
  selectedId,
  selectCallback,
}: GraphProps) => {
  const { graphData, forceGraphRef, forceGraphWidth } =
    useCreateGraph(articles);

  const handlePaintTarget = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
  ) => {
    ctx.beginPath();
    ctx.fillStyle = String(node.id) === selectedId ? "#1677ff" : node.color;

    if (node.size) {
      ctx.arc(node.x!, node.y!, 15, 0, 2 * Math.PI, false);
    } else if (String(node.id) === selectedId) {
      ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
    } else {
      ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
    }

    ctx.fill();
  };

  const handleNodeClick = (node: NodeObject) => {
    selectCallback(node);
  };

  return (
    <ForceGraph2D
      width={forceGraphWidth}
      graphData={graphData}
      ref={forceGraphRef}
      backgroundColor={"#000011"}
      nodeRelSize={NODE_SIZE}
      linkWidth={LINK_WIDTH}
      linkDirectionalParticles={1}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleColor={() => "#b9b9b9"}
      linkDirectionalParticleWidth={LINK_WIDTH}
      nodeCanvasObject={handlePaintTarget}
      onNodeClick={handleNodeClick}
      linkColor={(link) =>
        (link.source as any).id == selectedId
          ? "#1677ff"
          : link.color
            ? link.color
            : "grey"
      }
    />
  );
};
