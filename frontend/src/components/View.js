import React, { Suspense } from 'react'
import Input from 'react-bootstrap/InputGroup'

import { Canvas } from "@react-three/fiber";
import { OrbitControls, softShadows } from "@react-three/drei";

import {Container} from "react-bootstrap";
import Box from './Box';
import TexturePlane from './TexturePlane';
import DisplayPlane from './DisplayPlane';

softShadows()

const View = (props) => {

  let top = props.top;

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

    {top}

    {/* top */}


    <DisplayPlane/>

    </Suspense>
  </Canvas>
</Container>
);}

export default View