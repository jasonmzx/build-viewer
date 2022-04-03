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
import textureMap from '../images/blocks/stone.png';
import { BufferAttribute, MeshBasicMaterial, MeshStandardMaterial } from 'three';

softShadows()

const View = (props) => {

  const loadedTexture = new THREE.TextureLoader().load( "stone.png" );

  const vertices = new Float32Array( [
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,

     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,

    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
] );


const uniforms = {
    // phong material uniforms
    Ka: { value: new THREE.Vector3(1, 1, 1) },
    Kd: { value: new THREE.Vector3(1, 1, 1) },
    Ks: { value: new THREE.Vector3(1, 1, 1) },
    LightIntensity: { value: new THREE.Vector4(1, 0.5, 0.5, 1.0) },
    LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
    Shininess: { value: 200.0 }
  }



  const fragmentShader = `
    varying vec3 Normal;
    varying vec3 Position;

    uniform vec3 Ka;
    uniform vec3 Kd;
    uniform vec3 Ks;
    uniform vec4 LightPosition;
    uniform vec3 LightIntensity;
    uniform float Shininess;

    vec3 phong() {
      vec3 n = normalize(Normal);
      vec3 s = normalize(vec3(LightPosition) - Position);
      vec3 v = normalize(vec3(-Position));
      vec3 r = reflect(-s, n);

      vec3 ambient = Ka;
      vec3 diffuse = Kd * max(dot(s, n), 0.0);
      vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

      return LightIntensity * (ambient + diffuse + specular);
    }

    void main() {
      vec3 blue = vec3(0.0, 1.0, 0.0);
      gl_FragColor = vec4(blue*phong(), 1.0);
  }`
  const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `  

  const color_vertices = new Float32Array([
    1.0 , 1.0 , 0.0 ,1,
    1.0 , 1.0 , 0.5 ,1, 
    1.0 , 0.0 , 1.0 ,1,

    1.0 , 1.0 , 0.0 ,1,
    1.0 , 0.5 , 0.0 ,1, 
    1.0 , 0.0 , 1.0 ,1,
        
    1.0 , 1.0 , 0.0 ,1,
    1.0 , 0.5 , 0.0 ,1, 
    1.0 , 0.0 , 1.0 ,1,
  ]);

  const meshMaterial = new THREE.MeshStandardMaterial({ map : loadedTexture, color : 'red' });

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

  <OrbitControls enableZoom = {true} />
  <Suspense fallback={null}>

    {/*Generate scene here: */}
    {/*bottom: */}

    <mesh castShadow receiveShadow position={[1,1,1]}
    material={meshMaterial} computeVertexNormals="true"
    >
    <bufferGeometry attach="geometry" >
      <bufferAttribute attachObject={['attributes', 'position']} 
      array={vertices}
      itemSize={3}
      count={9}
      computeVertexNormals="true"
      />
    </bufferGeometry>
    <shaderMaterial map={loadedTexture} receiveShadow attach="material" uniforms={uniforms} fragmentShader={fragmentShader} vertexShader={vertexShader} />
    {/* <meshStandardMaterial attach="material" color="green"  /> */}
    {/* <meshStandardMaterial attach="material"/> */}
    </mesh>

    <mesh castShadow receiveShadow position={[1,1,1.5]} computeVertexNormals="true">
    <bufferGeometry attach="geometry" args={[1,1,1]}  >
      <bufferAttribute attachObject={['attributes', 'position']}
      array={vertices}
      itemSize={3}
      count={9}
      />
    </bufferGeometry>
    {/* <meshStandardMaterial attach="material" color="green"  /> */}
    <shaderMaterial attach="material" 
      />
    </mesh>

    

    {/* top */}


    <DisplayPlane/>

    </Suspense>
  </Canvas>
</Container>
);}

export default View