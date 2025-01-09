import { GraphNodeType, GraphProps } from "./types.ts";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";
import { useCreateGraph, useCreateGraphA } from "./hooks";
import { ArticleResponse } from "../../types";
import { useCallback, useEffect, useState } from "react";

const NODE_SIZE = 8;

const LINK_WIDTH = 3;
const vwValue= 87
export const Graph2D = ({ articles, selectedId, selectCallback }: { articles: ArticleResponse; selectedId: number | null }) => {

  const { graphData, forceGraphRef } = useCreateGraphA(articles);
  const [pixels, setPixels] = useState(0);

  useEffect(() => {
    const calculatePixels = () => {
      const pxValue = (window.innerWidth * vwValue) / 100;
      setPixels(pxValue);
    };

    calculatePixels();
    window.addEventListener('resize', calculatePixels);

    return () => window.removeEventListener('resize', calculatePixels);
  }, [vwValue]);

  const handlePaintTarget = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.beginPath();
    ctx.fillStyle = node.id === selectedId ? "#1677ff" : node.color;

    if (node.size) {
      ctx.arc(node.x!, node.y!, 15, 0, 2 * Math.PI, false);
    } else if (node.id === selectedId) {
      ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
    } else {
      ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
    }

    ctx.fill();
  };

  const handleNodeClick = (node: GraphNodeType) => {
    console.log(node)
    selectCallback(node.id)
  }
  

  return (
    <ForceGraph2D
    width={pixels}
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
    />
  );
};
