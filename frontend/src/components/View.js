import React, { Suspense, useMemo } from 'react'
import Input from 'react-bootstrap/InputGroup'

import * as THREE from 'three'
import { Canvas, useLoader} from "@react-three/fiber";
import { OrbitControls, softShadows } from "@react-three/drei";

import { TextureLoader } from "three/src/loaders/TextureLoader";


import {Container} from "react-bootstrap";
import Box from './Box';
import TexturePlane from './TexturePlane';
import DisplayPlane from './DisplayPlane';
import textureMap from '../images/blocks/tnt_side.png';
import { BufferAttribute, MeshBasicMaterial, MeshStandardMaterial } from 'three';

softShadows()

const View = (props) => {

  var quad_vertices =
  [
  -30.0,  30.0, 0.0,
  30.0,  30.0, 0.0,
  30.0, -30.0, 0.0,
  -30.0, -30.0, 0.0,
  ];
  
  var quad_uvs =
  [
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,
  0.0, 0.0
  ];
  

  var quad_indices =
  [
  0, 2, 1, 0, 3, 2
  ];

var geometry = new THREE.BufferGeometry();

var vertices = new Float32Array( quad_vertices );
// Each vertex has one uv coordinate for texture mapping
var uvs = new Float32Array( quad_uvs);
// Use the four vertices to draw the two triangles that make up the square.
var indices = new Uint32Array( quad_indices )

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
geometry.computeVertexNormals();

// Load the texture asynchronously
let sprite = new THREE.TextureLoader().load(textureMap);
sprite.minFilter = THREE.NearestFilter;
sprite.magFilter = THREE.NearestFilter;

var material = new THREE.MeshStandardMaterial( {map: sprite });


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
  shadow-camera-left={-15}
  shadow-camera-right={15}
  shadow-camera-top={20}
  shadow-camera-bottom={-10}

  />

  {/* Actual Scene here: */}
  <OrbitControls enableZoom = {true} />
  <Suspense fallback={null}>

    
  <mesh castShadow receiveShadow position={[1,1,1]} computeVertexNormals="true"
    >
    <bufferGeometry attach="geometry" >
      <bufferAttribute attachObject={['attributes', 'position']} 
      array={vertices}
      itemSize={3}
      count={9}
      />
    </bufferGeometry>
    {/* <meshStandardMaterial attach="material" color="green"  /> */}
    {/* <meshStandardMaterial attach="material"/> */}
    </mesh>

    <mesh geometry={geometry} material={material} castShadow receiveShadow>

    </mesh>

    <DisplayPlane/>

    </Suspense>

  </Canvas>
</Container>
);}

export default View