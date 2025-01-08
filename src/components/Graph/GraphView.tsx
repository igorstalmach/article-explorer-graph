import { useState } from "react";
import { Switch } from "antd";
import { Graph3D } from "./Graph3D.tsx";
import { Graph2D } from "./Graph2D.tsx";
import { NodeType } from "./types.ts";
import { ArticleResponse } from "../../types";

const SAMPLE_NODES: NodeType[] = [
  { id: 1, name: "Theory of Relativity", similarity: 0.5, isTarget: false },
  { id: 2, name: "Quantum Mechanics", similarity: 0, isTarget: true },
  { id: 3, name: "String Theory", similarity: 0.3, isTarget: false },
  { id: 4, name: "General Relativity", similarity: 0.9, isTarget: false },
  { id: 5, name: "Special Relativity", similarity: 0.1, isTarget: false },
  { id: 6, name: "Quantum Field Theory", similarity: 0.8, isTarget: false },
  { id: 7, name: "Quantum Gravity", similarity: 0.4, isTarget: false },
  {
    id: 8,
    name: "Quantum Electrodynamics",
    similarity: 0.6,
    isTarget: false,
  },
  { id: 9, name: "Quantum Dynamics", similarity: 0.2, isTarget: false },
  { id: 10, name: "Quantum Entanglement", similarity: 0.9, isTarget: false },
];

export const GraphView = ({ articleData }: { articleData: ArticleResponse }) => {
  const [is3D, setIs3D] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Switch
        style={{ position: "absolute", zIndex: 2, right: 50, bottom: 50 }}
        checkedChildren={"3D"}
        unCheckedChildren={"2D"}
        onChange={() => setIs3D(!is3D)}
      />
      {is3D ? (
        <Graph3D nodes={SAMPLE_NODES} />
      ) : (
        <Graph2D nodes={SAMPLE_NODES} />
      )}
    </div>
  );
};
