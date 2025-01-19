import { useEffect, useRef, useState } from "react";
import { GraphData, GraphLinkType, GraphNodeType } from "../../../types";
import * as d3 from "d3-force";
import { calculateDistance } from "../utils";
import { Article, ArticleResponse } from "../../../types";

const LINK_COLOR = "#29727e";

const MAIN_NODE_SIZE = 30;
const MAIN_NODE_COLOR = "#cd3232";

const GRAPH_WIDTH = 87;

export const useCreateGraph = (articles: ArticleResponse) => {
  const forceGraphRef = useRef<any>();

  const [forceGraphWidth, setForceGraphWidth] = useState(0);

  const mainNode: Article = articles.original_article;
  const initialGraphData: GraphData = {
    nodes: [
      {
        id: 0,
        name: mainNode.title,
        color: MAIN_NODE_COLOR,
        size: MAIN_NODE_SIZE,
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

  useEffect(() => {
    const calculatePixels = () => {
      const pxValue = (window.innerWidth * GRAPH_WIDTH) / 100;
      setForceGraphWidth(pxValue);
    };

    calculatePixels();
    window.addEventListener("resize", calculatePixels);

    return () => window.removeEventListener("resize", calculatePixels);
  }, []);

  const getNodes = () => {
    const newNodes: GraphNodeType[] = [];
    const newLinks: GraphLinkType[] = [];

    articles.similar_articles.forEach((node, index) => {
      newNodes.push({
        id: index + 1,
        name: node.title,
        color: "#eed78c",
      });
      newLinks.push({
        source: index + 1,
        target: 0,
        distance: calculateDistance(node.similarity),
        color: LINK_COLOR,
        // TODO: Fix during integration with backend.
        name: `Similarity: ${Number(node.similarity).toFixed(2)}`,
      });
    });

    return {
      nodes: [...initialGraphData.nodes, ...newNodes],
      links: [...initialGraphData.links, ...newLinks],
    };
  };

  return { graphData: getNodes(), forceGraphRef, forceGraphWidth } as const;
};
