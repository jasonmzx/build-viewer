import { Canvas, useLoader} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls ,  softShadows } from "@react-three/drei";
import * as THREE from 'three'
import { DoubleSide } from "three";
import { Suspense } from "react";
import React from "react";
import texture from '../images/stone.png';


export default function DisplayPlane(props) {



    const colorMap = useLoader(TextureLoader, texture);
    //Texture interpolation:
    // colorMap.minFilter = THREE.NearestFilter;
    // colorMap.magFilter = THREE.NearestFilter;

  //[Math.PI / 2, 0, 0] Flat plane facing up

   return (
     <mesh position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 30, 30]} castShadow receiveShadow>

      <planeBufferGeometry />
      <meshStandardMaterial attach="material" color="red" side={DoubleSide} map={colorMap} />
    </mesh>
   );
}