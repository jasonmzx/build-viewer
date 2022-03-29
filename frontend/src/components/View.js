import React, { Suspense } from 'react'
import Input from 'react-bootstrap/InputGroup'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import {Container} from "react-bootstrap";
import Box from './Box';
import TexturePlane from './TexturePlane';

const View = () => {
  return (

<Container>
  <Canvas style={{ position: "relative", width: 500, height: 500 }}>
  <ambientLight intensity={0.9} />
  <directionalLight position={[3, 3, 3]} />
  <OrbitControls enableZoom = {true} />
  <Suspense fallback={null}>

    {/*Generate scene here: */}
    {/*bottom: */}

    <TexturePlane x={0} y={0} z={0} rot={[Math.PI / 2, 0, 0]}/>
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

    {/*inner planes in complex view */}
    <TexturePlane x={3} y={3} z={6} rot={[0, Math.PI/2, 0]}/>
    <TexturePlane x={9} y={3} z={6} rot={[0, Math.PI/2, 0]}/>
    </Suspense>
  </Canvas>
</Container>
);}

export default View