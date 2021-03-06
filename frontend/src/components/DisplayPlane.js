import { Canvas, useLoader} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls ,  softShadows } from "@react-three/drei";
import * as THREE from 'three'
import { DoubleSide } from "three";
import { Suspense } from "react";
import React from "react";
import texture from '../images/blocks/gold_block.png';


export default function DisplayPlane(props) {

    // const getTexture = () => {
    //     fetch("http://localhost:5000/texture/stone")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         console.log('Sucess!');
    //       },(error) => {
    //         console.log(error);
    //       }
    //     )
    // }

    const colorMap = useLoader(TextureLoader, texture);
    colorMap.minFilter = THREE.NearestFilter;
    colorMap.magFilter = THREE.NearestFilter;


   return (
     <mesh position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 30, 30]} castShadow receiveShadow>

      <planeBufferGeometry />
      <meshStandardMaterial attach="material" color="gray" side={DoubleSide} map={colorMap} />
    </mesh>
   );
}