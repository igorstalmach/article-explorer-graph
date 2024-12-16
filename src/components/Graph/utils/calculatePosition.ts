import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants.ts";

export const calculateDistance = (similarity: number) => {
  const distance =
    similarity *
    Math.sqrt(Math.pow(SCREEN_WIDTH / 4, 2) + Math.pow(SCREEN_HEIGHT / 4, 2)) *
    0.5;

  return distance;
};
