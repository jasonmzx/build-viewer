import { Canvas, useLoader} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
import { DoubleSide } from "three";
import { Suspense } from "react";
import React from "react";
import texture from '../images/stone.png';


export default function TexturePlane(props) {



    const colorMap = useLoader(TextureLoader, texture);

  //[Math.PI / 2, 0, 0] Flat plane facing up

   return (
     <mesh position={[props.x, props.y, props.z]} rotation={props.rot} scale={[6, 6, 6]}>

      <planeBufferGeometry />
      <meshBasicMaterial attach="material" color="gray" side={DoubleSide} map={colorMap} />
    </mesh>
   );
}