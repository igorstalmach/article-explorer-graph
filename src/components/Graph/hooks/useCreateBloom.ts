import { useEffect } from "react";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";
import { UseCreateBloomProps } from "./types.ts";

export const useCreateBloom = ({ forceGraphRef }: UseCreateBloomProps) => {
  useEffect(() => {
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.2,
      0.1,
      0,
    );
    forceGraphRef.current.postProcessingComposer().addPass(bloomPass);
  }, []);
};
