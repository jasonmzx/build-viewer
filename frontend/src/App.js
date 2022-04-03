import { Suspense } from "react";
import "./styles.css";
import styled from "styled-components";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Background from "./components/Background";
import TextSection from "./components/TextSection";

import Box from "./components/Box";
import AnimatedSphere from "./components/AnimatedSphere";
import Iphone from "./components/Iphone";
import Plane from "./components/PlaneTest";
import View from "./components/View.js";
import Home from "./components/Home.js";
import Upload from "./components/Upload.js";
import UploadV2 from "./components/UploadV2.js";
import ViewV2 from "./components/ViewV2.js"

import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router> 
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/view" element={<View/>} />
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/upload/v2" element={<UploadV2/>}/>
      <Route path="view/v2" element={<ViewV2/>}/>
      </Routes>
 </Router>
   );
}

const Wrapper = styled.div`
  position: relative;
  background: #1f1144;
`;
