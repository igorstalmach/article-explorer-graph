import { useCallback, useEffect } from "react";
import ForceGraph3D, { NodeObject } from "react-force-graph-3d";
import * as THREE from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { useCreateGraph } from "../../hooks";
import { GraphNodeType, GraphProps } from "../../types";

const NODE_RESOLUTION = 32;
const NODE_SIZE = 6;

const LINK_RESOLUTION = 32;
const LINK_WIDTH = 2;

export const Graph3D = ({
  articles,
  selectedId,
  selectCallback,
}: GraphProps) => {
  const { graphData, forceGraphRef, forceGraphWidth } =
    useCreateGraph(articles);

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
    (node: GraphNodeType) => selectCallback(String(node.id)),
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
      width={forceGraphWidth}
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
