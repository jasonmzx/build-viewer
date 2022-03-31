import { Canvas, useLoader} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls ,  softShadows } from "@react-three/drei";
import * as THREE from 'three'
import { DoubleSide } from "three";
import { Suspense } from "react";
import React from "react";
import texture from '../images/blocks/sandstone_top.png';


export default function TexturePlane(props) {


  
    const colorMap = useLoader(TextureLoader, texture);
    colorMap.minFilter = THREE.NearestFilter;
    colorMap.magFilter = THREE.NearestFilter;

  //[Math.PI / 2, 0, 0] Flat plane facing up

   return (
     <mesh position={[props.x, props.y, props.z]} rotation={props.rot} scale={[1, 1, 1]} castShadow receiveShadow>

      <planeBufferGeometry />
      <meshStandardMaterial attach="material" color="gray" map={colorMap} side={DoubleSide} />
    </mesh>
   );
}