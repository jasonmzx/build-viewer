import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import texture from "../images/mapz.jpeg";

export default function Box() {
  const colorMap = useLoader(TextureLoader, texture);

  return (
    <mesh rotation={[90, 0, 20]}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshNormalMaterial attach="material" />
       <meshStandardMaterial map={colorMap} /> 
    </mesh>
  );
}
