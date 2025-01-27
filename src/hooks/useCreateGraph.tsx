import * as d3 from "d3-force";
import { useEffect, useRef, useState } from "react";

import {
  GraphData,
  GraphLinkType,
  GraphNodeType,
  SimilarArticle,
} from "../types";
import { Article, ArticleResponse } from "../types";
import { calculateDistance } from "../utils";

const LINK_COLOR = "#29727e";

const MAIN_NODE_SIZE = 30;
const MAIN_NODE_COLOR = "#cd3232";

const GRAPH_WIDTH = 80;

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

  const getNodesAndLinks = (
    simArticles: SimilarArticle[],
    targetId?: number | string,
  ): { nodes: GraphNodeType[]; links: GraphLinkType[] } => {
    let newNodes: GraphNodeType[] = [];
    let newLinks: GraphLinkType[] = [];

    simArticles.forEach((node, index) => {
      newNodes.push({
        id:
          targetId !== undefined
            ? targetId + "-" + Number(index + 1)
            : index + 1,
        name: node.title,
        color: "#eed78c",
      });
      newLinks.push({
        source:
          targetId !== undefined
            ? targetId + "-" + Number(index + 1)
            : index + 1,
        target: targetId !== undefined ? targetId : 0,
        distance: calculateDistance(node.similarity),
        color: LINK_COLOR,
        name: `Similarity: ${Number(node.similarity * 100).toFixed(2)}%`,
      });

      if (node.subArticles !== undefined) {
        let nextTargetId =
          targetId !== undefined
            ? targetId + "-" + Number(index + 1)
            : index + 1;
        let additionalNodes = getNodesAndLinks(
          node.subArticles.similar_articles,
          nextTargetId,
        );

        newNodes = newNodes.concat(additionalNodes.nodes);
        newLinks = newLinks.concat(additionalNodes.links);
      }
    });
    return { nodes: newNodes, links: newLinks };
  };

  const getNodes = () => {
    let data = getNodesAndLinks(articles.similar_articles);
    let newNodes = data.nodes;
    let newLinks = data.links;

    return {
      nodes: [...initialGraphData.nodes, ...newNodes],
      links: [...initialGraphData.links, ...newLinks],
    };
  };

  return { graphData: getNodes(), forceGraphRef, forceGraphWidth } as const;
};
