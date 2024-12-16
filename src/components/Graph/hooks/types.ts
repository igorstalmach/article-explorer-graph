import { NodeType } from "../types.ts";
import { MutableRefObject } from "react";

export type UseCreateGraphProps = {
  nodes: NodeType[];
};

export type UseCreateBloomProps = {
  forceGraphRef: MutableRefObject<any>;
};
