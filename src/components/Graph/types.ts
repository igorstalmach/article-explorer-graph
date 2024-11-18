export type NodeType = {
  id: number;
  name: string;
  similarity: number;
  isTarget: boolean;
};

export type GraphProps = {
  nodes: NodeType[];
};
