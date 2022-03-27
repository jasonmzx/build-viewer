import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
import { DoubleSide } from "three";

export default function Plane() {
   return (
      <Canvas>
        <OrbitControls enableZoom={true} />
         <ambientLight />
         <mesh position={[3, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>

      <planeBufferGeometry />
      <meshBasicMaterial color="green" side={DoubleSide} />
    </mesh>

         <mesh>
         <planeBufferGeometry attach="geometry" args={[2, 2]} />
   <meshBasicMaterial
    attach="material"
    color="red"
    opacity={0.5}
    transparent
   />

         </mesh>
      </Canvas>
   );
}