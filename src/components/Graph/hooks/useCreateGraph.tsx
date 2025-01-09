import { UseCreateGraphProps } from "./types.ts";
import { useEffect, useRef } from "react";
import { GraphData, GraphLinkType, GraphNodeType, NodeType } from "../types.ts";
import * as d3 from "d3-force";
import { calculateDistance, getRandomColor } from "../utils";
import { Article, ArticleResponse } from "../../../types";

const LINK_COLOR = "#29727e";

const MAIN_NODE_SIZE = 30;
const MAIN_NODE_COLOR = "#cd3232";

export const useCreateGraphA = (articles: ArticleResponse) => {
  const forceGraphRef = useRef<any>();

  const mainNode: Article = articles.original_article
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

  const getNodes = () => {
    const newNodes: GraphNodeType[] = [];
    const newLinks: GraphLinkType[] = [];

    articles.similar_articles.forEach((node,index) => {
      newNodes.push({
        id: index+1,
        name: node.title,
        color: "#eed78c",
      });
      newLinks.push({
        source: index+1,
        target: 0,
        distance: calculateDistance(node.similarity),
        color: LINK_COLOR,
        // TODO: Fix during integration with backend.
        name: `Similarity: ${(Number(node.similarity)).toFixed(2)}`,
      });
    });

    return {
      nodes: [...initialGraphData.nodes, ...newNodes],
      links: [...initialGraphData.links, ...newLinks],
    };
  };

  return { graphData: getNodes(), forceGraphRef } as const;
};

export const useCreateGraph = ({ nodes }: UseCreateGraphProps) => {
  const forceGraphRef = useRef<any>();

  const mainNode: NodeType = nodes.filter((node) => node.isTarget)[0];
  const initialGraphData: GraphData = {
    nodes: [
      {
        id: mainNode && mainNode.id,
        name: mainNode && mainNode.name,
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
        // TODO: Fix during integration with backend.
        name: `Similarity: ${(1 - Number(node.similarity)).toFixed(2)}`,
      });
    });

    return {
      nodes: [...initialGraphData.nodes, ...newNodes],
      links: [...initialGraphData.links, ...newLinks],
    };
  };

  return { graphData: getNodes(), forceGraphRef } as const;
};