export type NodeType = {
  id: number;
  name: string;
  similarity: number;
  isTarget: boolean;
};

export type GraphProps = {
  nodes: NodeType[];
};

export type NodeEntry = {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  nodeRelSize?: number;
};

export type LinkEntry = {
  source: number;
  target: number;
  distance?: number;
};

export type NodeData = {
  nodes: NodeEntry[];
  links: LinkEntry[];
};
