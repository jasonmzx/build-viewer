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

  var quad_vertices = [0,2,0,0,3,0,0,2,1,0,3,1,0,3,0,0,3,1,1,3,0,1,3,1,0,2,1,0,3,1,1,2,1,1,3,1,3,2,0,3,3,0,3,2,1,3,3,1,2,3,0,2,3,1,3,3,0,3,3,1,2,2,1,2,3,1,3,2,1,3,3,1,0,2,2,0,3,2,0,2,3,0,3,3,0,3,2,0,3,3,1,3,2,1,3,3,0,2,2,0,3,2,1,2,2,1,3,2,3,2,2,3,3,2,3,2,3,3,3,3,2,3,2,2,3,3,3,3,2,3,3,3,2,2,2,2,3,2,3,2,2,3,3,2,2,1,1,2,2,1,2,1,2,2,2,2,1,1,1,1,2,1,1,1,2,1,2,2,1,2,1,1,2,2,2,2,1,2,2,2,1,1,1,1,1,2,2,1,1,2,1,2,1,1,1,1,2,1,2,1,1,2,2,1,1,1,2,1,2,2,2,1,2,2,2,2,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,1,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1,1,1,1,3,0,0,3,1,0,3,0,1,3,1,1,2,0,0,2,0,1,3,0,0,3,0,1,2,0,1,2,1,1,3,0,1,3,1,1,0,0,2,0,1,2,0,0,3,0,1,3,0,0,2,0,0,3,1,0,2,1,0,3,0,0,2,0,1,2,1,0,2,1,1,2,3,0,2,3,1,2,3,0,3,3,1,3,2,0,2,2,0,3,3,0,2,3,0,3,2,0,2,2,1,2,3,0,2,3,1,2];

  // var quad_vertices = [];
  // for(const v of unfilt){
  //   quad_vertices.push(v[0]);
  //   quad_vertices.push(v[1]);
  //   quad_vertices.push(v[2]);
  // }

  var quad_uvs = [0,0,0,1,1,0,1,1];

  

  var quad_indices = [0,2,1,3,1,2,4,5,6,7,6,5,8,10,9,11,9,10,12,13,14,15,14,13,16,17,18,19,18,17,20,22,21,23,21,22,24,26,25,27,25,26,28,29,30,31,30,29,32,33,34,35,34,33,36,37,38,39,38,37,40,41,42,43,42,41,44,45,46,47,46,45,48,49,50,51,50,49,52,54,53,55,53,54,56,57,58,59,58,57,60,62,61,63,61,62,64,65,66,67,66,65,68,70,69,71,69,70,72,74,73,75,73,74,76,78,77,79,77,78,80,82,81,83,81,82,84,85,86,87,86,85,88,90,89,91,89,90,92,94,93,95,93,94,96,98,97,99,97,98,100,102,101,103,101,102,104,105,106,107,106,105,108,109,110,111,110,109,112,114,113,115,113,114,116,117,118,119,118,117];
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