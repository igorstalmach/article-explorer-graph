export type NodeType = {
  id: number;
  name: string;
  similarity: number;
  isTarget: boolean;
};

export type GraphProps = {
  nodes: NodeType[];
};

export type GraphNodeType = {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  nodeRelSize?: number;
  color: string;
};

export type GraphLinkType = {
  source: number;
  target: number;
  distance?: number;
};

export type GraphData = {
  nodes: GraphNodeType[];
  links: GraphLinkType[];
};
