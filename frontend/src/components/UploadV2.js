import React from 'react';
import {Container} from "react-bootstrap";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import nbt from '../nbt';
import View from './View';
import TexturePlane from './TexturePlane';

const Upload = () => {
    const [scene , setScene] = React.useState([]);

    // handleUpload = (event) => {
    //     console.log('Success!');
    // }

    function renderHandler(){
      console.log('[RENDER] calling...')
      console.log(scene);

      if(scene.length == 0){
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
          <View top={scene}/>
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

        console.log(
          findBlockIndex([7,9,13] , [14,10,7] , dump.dimension)
        );
        console.log(dump.dimension);

      for(const [i,v] of blocks.entries() ){
      //  console.log(v.pos.value.value);
        
      }
      
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