import React from 'react';
import {Container} from "react-bootstrap";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import nbt from '../nbt';

const Upload = () => {

    // handleUpload = (event) => {
    //     console.log('Success!');
    // }

    function parseNBT(input) {
      console.log('Parsing...');
      let dump = {
        author: "",
        dimension: {x:0,y:0,z:0}, 
        blocks: [ //blocks[x][y][z]
       //   [ [ [] /*z*/ ] /*y*/  ] /*x*/
        ]
      }

    //  console.log(input['value']['blocks']['value']['value']) //Block Array

      // const BlockList = input.value.blocks.value.value;
      // BlockPositionArray = input.value.blocks.value.value.pos.value.value;


      //First Pass
      for(const block of input.value.blocks.value.value){ 

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
      dump.dimension.x++; dump.dimension.y++; dump.dimension.z++; //( +1 to each axis after loop )

      console.log(dump.dimension)


      for(let x_i = 0; x_i < dump.dimension.x; x_i++ ){

        //Generate all x indexes
        dump.blocks.push([]);
        
        //Generate all y indexes within x indexes
        for(let y_i = 0; y_i < dump.dimension.y; y_i++){
          dump.blocks[x_i].push([]);

            //Generate z indexes within y indexes
            for(let z_i = 0; z_i < dump.dimension.z; z_i++){
              dump.blocks[x_i][y_i].push({ //Object
                'name' : '0',
                'isBlock' : true,
                'direction': null
              }
              );

            }

        }

        

      }

      console.log(dump.blocks)

      // for(const block of input.value.blocks.value.value){
      //   console.log(block.pos.value.value);
      //   console.log(block.state.value);
      // }
    }

    
    function handleChange(event) {
        console.log(event.target.files);
        // console.log(event.target.files[0]); //file struc
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
    Input NBT file <br/>
    <input type="file" onChange={handleChange}></input>
    </Container>
  )
}

export default Upload