import React, { Suspense } from 'react'
import Input from 'react-bootstrap/InputGroup'

import { Canvas } from "@react-three/fiber";
import { OrbitControls, softShadows } from "@react-three/drei";

import {Container} from "react-bootstrap";
import Box from './Box';
import TexturePlane from './TexturePlane';
import DisplayPlane from './DisplayPlane';

softShadows()

const View = () => {
  return (

<Container>
  <Canvas shadows style={{ position: "relative", width: 750, height: 750 }}  gl={{ antialias: false }}>
  <ambientLight intensity={0.9} />

  <directionalLight 
  castShadow
  position={[9, 9, 9]} 
  intensity={1.9}  
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-camera-far={100}
  shadow-camera-left={-10}
  shadow-camera-right={10}
  shadow-camera-top={10}
  shadow-camera-bottom={-10}

  />

  <OrbitControls enableZoom = {true} />
  <Suspense fallback={null}>

    {/*Generate scene here: */}
    {/*bottom: */}

    <TexturePlane x={0} y={0} z={0} rot={[Math.PI / 2, 0, 0]} />
    <TexturePlane x={0} y={0} z={6} rot={[Math.PI / 2, 0, 0]}/>
    <TexturePlane x={6} y={0} z={0} rot={[Math.PI / 2, 0, 0]}/>
    <TexturePlane x={12} y={0} z={0} rot={[Math.PI / 2, 0, 0]}/>
    <TexturePlane x={12} y={0} z={6} rot={[Math.PI / 2, 0, 0]}/>


    {/* top */}

    <TexturePlane x={0} y={6} z={0} rot={[-Math.PI / 2, 0, 0]}/>
    <TexturePlane x={0} y={6} z={6} rot={[-Math.PI / 2, 0, 0]}/>
    <TexturePlane x={6} y={6} z={0} rot={[-Math.PI / 2, 0, 0]}/>
    <TexturePlane x={12} y={6} z={0} rot={[-Math.PI / 2, 0, 0]}/>
    <TexturePlane x={12} y={6} z={6} rot={[-Math.PI / 2, 0, 0]}/>


    <TexturePlane x={0} y={3} z={-3} rot={[0, 0, 0]}/>
    <TexturePlane x={6} y={3} z={-3} rot={[0, 0, 0]}/>
    <TexturePlane x={12} y={3} z={-3} rot={[0, 0, 0]}/>

    <TexturePlane x={-3} y={3} z={0} rot={[0, Math.PI/2, 0]}/>
    <TexturePlane x={-3} y={3} z={6} rot={[0, Math.PI/2, 0]}/>

    <TexturePlane x={15} y={3} z={0} rot={[0, -Math.PI/2, 0]}/>
    <TexturePlane x={15} y={3} z={6} rot={[0, -Math.PI/2, 0]}/>

    {/*Outer planes in complex view */}
    <TexturePlane x={6} y={3} z={3} rot={[0, 0, 0]}/>
    <TexturePlane x={0} y={3} z={9} rot={[0, 0, 0]}/>
    <TexturePlane x={12} y={3} z={9} rot={[0, 0, 0]}/>
    <TexturePlane x={6} y={9} z={3} rot={[0, 0, 0]}/>

    {/*inner planes in complex view */}
    <TexturePlane x={3} y={3} z={6} rot={[0, Math.PI/2, 0]}/>
    <TexturePlane x={9} y={3} z={6} rot={[0, Math.PI/2, 0]}/>
    <DisplayPlane/>

    </Suspense>
  </Canvas>
</Container>
);}

export default View