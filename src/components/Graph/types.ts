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
  color: string;
  size?: number;
};

export type GraphLinkType = {
  source: number | any;
  target: number;
  distance?: number;
  color?: string;
  name?: string;
  
};

export type GraphData = {
  nodes: GraphNodeType[];
  links: GraphLinkType[];
};
