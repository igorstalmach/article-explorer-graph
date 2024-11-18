import {
  SCREEN_CENTER,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../constants.ts";

export const calculatePosition = (similarity: number) => {
  // Random angle between 0 and 2π
  const angle = Math.random() * 2 * Math.PI;

  // Convert polar coordinates to cartesian coordinates
  const x =
    SCREEN_CENTER[0] + similarity * (SCREEN_WIDTH / 4) * Math.cos(angle);
  const y =
    SCREEN_CENTER[1] + similarity * (SCREEN_HEIGHT / 4) * Math.sin(angle);

  return [x, y];
};
