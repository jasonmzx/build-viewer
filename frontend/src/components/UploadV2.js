import React from 'react';
import {Container} from "react-bootstrap";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import nbt from '../nbt';
import View from './View';
import TexturePlane from './TexturePlane';

const Upload = () => {
    const [Vertex , setVertex] = React.useState([]);
    const [Index, setIndex] = React.useState([]);
    const [UV, setUV] = React.useState([]);

    // handleUpload = (event) => {
    //     console.log('Success!');
    // }

    function renderHandler(){
      console.log('[RENDER] calling...')

      if(Vertex.length == 0){
        console.log('[RENDER] Denied!')
        return(
          <div>
            Nothing is rendered..
          </div>
        )
      } else {
        console.log('[RENDER] Working...')
        console.log('[RENDER] Received planes:');

        return (
          <View vertices={Vertex} indices={Index} uv={UV}/>
        )
      }
    }


    function blockStructure(palette, pValue){
      const BlockType = palette[pValue];

      if(BlockType.Name.value == 'minecraft:air'){
        return {'name' : '', 'cube': false};
      }

      if(BlockType.Properties){

        return {
          'name' : BlockType.Name.value,
          'cube' : false,
          'special' : BlockType.Properties.value
        };

      } else {

        return {
          'name' : BlockType.Name.value,
          'cube' : true
        };

      }
    }

    function findBlockIndex(start, end, dimension) {
      return (
        (end[2]-start[2]) * (dimension.x+1) + 
        -1*(end[1]-start[1]) * (dimension.x+1) * (dimension.z+1) +
        (end[0]-start[0])
      );
    } 


    function parseNBT(input) {
      console.log('Parsing...');


      const palette = input.value.palette.value.value;

      
      let airVal = 0;
      //Find the air's value:
      for(let i = 0; i < palette.length; i++){
        if(palette[i].Name.value == "minecraft:air"){
          airVal = i;
          break;
        }
      }

      console.log("PALETTE! Air's value is "+airVal);
      console.log(palette);
      console.log("PALETTE ");


      let dump = {
        author: "",
        dimension: {x:0,y:0,z:0}, 
        blocks: [] //blocks[x][y][z]
      }

      let blocks = input.value.blocks.value.value;

      //First Pass (Grabs dimension of model in blocks)
      for(const block of blocks){ 
        //The [ x, y, z ] Array
        var blockArray = block.pos.value.value;

        if(blockArray[0] > dump.dimension.x){
          dump.dimension.x = blockArray[0]; 
        }
        //y
        if(blockArray[1] > dump.dimension.y){
          dump.dimension.y = blockArray[1]; 
        }
        //z
        if(blockArray[2] > dump.dimension.z){
          dump.dimension.z = blockArray[2]; 
        }

      }

      //Dimensions found:
      console.log(dump.dimension);


      //Sorts the blocks object a lil nicer
      blocks.sort(
        (a,b) => {
          return b.pos.value.value[1] - a.pos.value.value[1]
        });

        console.log(dump.dimension);
      
      let vertices = [];
      let indices = [];
      let uv = [];

      for(const [k,v] of blocks.entries() ){
      //  console.log(v.pos.value.value);
      const blockPos = v.pos.value.value;
      console.log('Looking at block:');
      console.log(blockPos);  

      for(let i = 0; i < 3; i++){

        let dim;// 0
        if ( i== 0 ) {dim = dump.dimension.x;} else if (i == 1) {dim = dump.dimension.y;} else {dim = dump.dimension.z;}
        
        for(let j = 1; j < 3; j++){ //2 iters

          const modified = blockPos[i] + (-1)**j; //positive or negative

          if(modified < 0 || modified > dim){ //if out of bounds, continue
            continue;
          }
          
          let neighbour = [...blockPos];
          neighbour[i] = modified; //Now neighbour is a new valid neighbour
          
          let indexDiff = findBlockIndex(blockPos, neighbour, dump.dimension);

          //Now the neighbour variable turns into the NBT object
          neighbour = blocks[k+indexDiff];
          
          const nbBlockType = neighbour.state.value;

          if(nbBlockType == airVal && v.state.value != airVal){
            console.log("Valid pairing, let's generate some coords");
            const nV = neighbour.pos.value.value

            const diff = [blockPos[0]-nV[0] , blockPos[1]-nV[1] , blockPos[2]-nV[2] ];

            uv.push(  0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0);

            const vL = Math.floor(indices.length/6) * 4

            if( diff.includes(-1) ){
                indices.push(vL, vL+2, vL+1, vL+3, vL+1, vL+2);
            } else if( diff.includes(1) ){
              indices.push(vL+0, vL+1, vL+2, vL+3, vL+2, vL+1);
            }

            if( diff[0] == -1 ) { //If it's -1 in the x direction
              vertices.push(blockPos[0] , blockPos[1], blockPos[2]);
              vertices.push(  blockPos[0] , blockPos[1]+1 , blockPos[2]  );
              vertices.push(  blockPos[0] , blockPos[1] , blockPos[2]+1  );
              vertices.push(  blockPos[0] , blockPos[1]+1 , blockPos[2]+1 );
            }

            if( diff[0] == 1 ) {//If it's 1 in the x direction
              vertices.push(  blockPos[0]+1 , blockPos[1] , blockPos[2]  );
              vertices.push(  blockPos[0]+1 , blockPos[1]+1 , blockPos[2]  );
              vertices.push(  blockPos[0]+1 , blockPos[1] , blockPos[2]+1  );
              vertices.push(  blockPos[0]+1 , blockPos[1]+1 , blockPos[2]+1  );
            }

            if( diff[1] == -1 ){
              vertices.push(  blockPos[0] , blockPos[1] , blockPos[2]   );
              vertices.push(  blockPos[0] , blockPos[1] , blockPos[2]+1  );
              vertices.push(  blockPos[0]+1 , blockPos[1] , blockPos[2]   );
              vertices.push(  blockPos[0]+1 , blockPos[1] , blockPos[2]+1   );
            }

            if(diff[1] == 1){
              vertices.push(  blockPos[0] , blockPos[1]+1 , blockPos[2]   );
              vertices.push(  blockPos[0] , blockPos[1]+1 , blockPos[2]+1  );
              vertices.push(  blockPos[0]+1 , blockPos[1]+1 , blockPos[2]   );
              vertices.push(  blockPos[0]+1 , blockPos[1]+1 , blockPos[2]+1   );
            }

            if( diff[2] == -1) {
              vertices.push(   blockPos[0] , blockPos[1] , blockPos[2]+1   );
              vertices.push(   blockPos[0] , blockPos[1]+1 , blockPos[2]+1   );
              vertices.push(   blockPos[0]+1 , blockPos[1] , blockPos[2]+1   );
              vertices.push(   blockPos[0]+1 , blockPos[1]+1 , blockPos[2]+1   );
            }

            if( diff[2] == 1) {
              vertices.push(   blockPos[0] , blockPos[1] , blockPos[2]   );
              vertices.push(   blockPos[0] , blockPos[1]+1 , blockPos[2]   );
              vertices.push(   blockPos[0]+1 , blockPos[1] , blockPos[2]  );
              vertices.push(   blockPos[0]+1 , blockPos[1]+1 , blockPos[2]   );
            }


          }

          
          console.log(neighbour);
          
          



        }




      }

      }
    console.log('vertices');
    setVertex(vertices);
    console.log('indices');
    setIndex(indices);
    console.log('uv');
    setUV(uv);
    }

    
    function handleChange(event) {

        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {

            console.log(e.target.result);

            var x = nbt.parse(e.target.result, function(error, data) {
              if (error) { throw error; }
          
              console.log(data);
              parseNBT(data);
          });

        }
        reader.readAsArrayBuffer(file);
    }


  return (
    <Container>
    Input NBT file : <br/>
    <input type="file" onChange={handleChange}></input>
    {renderHandler()}
    </Container>
  )
}

export default Upload