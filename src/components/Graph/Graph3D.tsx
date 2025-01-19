import { GraphNodeType} from "./types.ts";
import ForceGraph3D, { NodeObject } from "react-force-graph-3d";
import { useCreateGraphA } from "./hooks";
import { useCallback, useEffect, useState } from "react";
import * as THREE from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ArticleResponse } from "../../types";

const NODE_RESOLUTION = 32;
const NODE_SIZE = 6;

const LINK_RESOLUTION = 32;
const LINK_WIDTH = 2;
const vwValue= 87

export const Graph3D = ({ articles, selectedId, selectCallback }: { articles: ArticleResponse; selectedId: number | null | undefined; selectCallback: any }) => {
  const { graphData, forceGraphRef } = useCreateGraphA(
    articles
  );
  const [pixels, setPixels] = useState(0);
  useEffect(() => {
    const calculatePixels = () => {
      const pxValue = (window.innerWidth * vwValue) / 100;
      setPixels(pxValue);
    };

    calculatePixels();
    window.addEventListener('resize', calculatePixels);

    return () => window.removeEventListener('resize', calculatePixels);
  }, [vwValue]);

  useEffect(() => {
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.25,
      0.1,
      0.1,
    );
    forceGraphRef.current.postProcessingComposer().addPass(bloomPass);
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNodeType) => {
      selectCallback(node.id)
      // const distance = 80;
      // const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);

      // forceGraphRef.current.cameraPosition(
      //   {
      //     x: node.x! * distRatio,
      //     y: node.y! * distRatio,
      //     z: node.z! * distRatio,
      //   },
      //   node,
      //   1500,
      // );
    },
    [forceGraphRef],
  );

  const handlePaintTarget = (node: NodeObject) =>
    new THREE.Mesh(
      new THREE.SphereGeometry(node.size ? node.size : 10),
      new THREE.MeshLambertMaterial({
        color: node.id == selectedId ? "#1677ff" : node.color,
        transparent: false,
        opacity: 1,
      }),
    );

  return (
    <ForceGraph3D
      graphData={graphData}
      ref={forceGraphRef}
      width={pixels}
      backgroundColor={"#000001"}
      onNodeClick={handleNodeClick}
      nodeThreeObject={handlePaintTarget}
      nodeResolution={NODE_RESOLUTION}
      nodeOpacity={1}
      nodeRelSize={NODE_SIZE}
      linkResolution={LINK_RESOLUTION}
      linkWidth={LINK_WIDTH}
      linkOpacity={0.75}
      linkDirectionalParticles={1}
      linkDirectionalParticleWidth={LINK_WIDTH}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleColor={() => "#fff"}
      linkDirectionalParticleResolution={LINK_RESOLUTION / 2}
    />
  );
};
