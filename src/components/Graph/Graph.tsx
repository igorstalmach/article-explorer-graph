import { GraphProps } from "./types.ts";
import { calculatePosition } from "./utils/calculatePosition.ts";
import { Node } from "./components/Node";
import { Link } from "./components/Link";
import { SCREEN_CENTER, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants.ts";

export const Graph = ({ nodes }: GraphProps) => {
  const renderNodes = () =>
    nodes.map((node) => {
      const [x, y] = calculatePosition(node.similarity);

      if (node.isTarget) {
        return <Node key={node.id} x={x} y={y} color={"#eebf06"} radius={30} />;
      }

      return (
        <>
          <Link
            start_x={SCREEN_CENTER[0]}
            start_y={SCREEN_CENTER[1]}
            end_x={x}
            end_y={y}
          />
          <Node key={node.id} x={x} y={y} color={"#459e45"} radius={15} />
        </>
      );
    });

  return (
    <svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
      <g>{renderNodes()}</g>
    </svg>
  );
};
