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

    let blockState = [<TexturePlane x={3} y={3} z={0} rot={[-Math.PI / 2, 0, 0]}/>];

    function renderHandler(s){
      console.log('[RENDER] calling...')
      console.log(s);

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
        console.log(blockState);
        console.log(typeof scene);

        return (
          <View top={blockState}/>
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

    function findBlock(x,y,z,data,palette){
      //console.log(data[0].pos.value.value);
      for(const [i, v] of data.entries()){
        const BlockArray = data[i].pos.value.value;
        if(BlockArray[0] == x && BlockArray[1] == y && BlockArray[2] == z){
          return blockStructure(palette,data[i].state.value);
        }
      }

    }


    function parseNBT(input) {
      console.log('Parsing...');

      let dump = {
        author: "",
        dimension: {x:0,y:0,z:0}, 
        blocks: [] //blocks[x][y][z]
      }

      // const BlockList = input.value.blocks.value.value;
      // BlockPositionArray = input.value.blocks.value.value.pos.value.value;

      //Block palette:
      let palette = input.value.palette.value.value;
      console.log(palette);

      //First Pass
      for(const block of input.value.blocks.value.value){ 

        console.log(block);

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

      //Generating 3d Array Structure: 

      for(let x_i = 0; x_i < dump.dimension.x; x_i++ ){

        //Generate all x indexes
        dump.blocks.push([]);
        
        //Generate all y indexes within x indexes
        for(let y_i = 0; y_i < dump.dimension.y; y_i++){
          dump.blocks[x_i].push([]);

            //Generate z indexes within y indexes
            for(let z_i = 0; z_i < dump.dimension.z; z_i++){
              dump.blocks[x_i][y_i].push(
              findBlock(x_i,y_i,z_i,input.value.blocks.value.value,palette)
              );

            }

        }

        

      }

      console.log(' 3D structure: ')
      console.log(dump.blocks)

      //Generate planes:
      for(const [xIter, xVal] of dump.blocks.entries()) {
        console.log(xIter); //Console logs all x arrays
        for(const [yIter,yVal] of xVal.entries()){
          console.log(yIter);
            for(const [zIter, zVal] of yVal.entries()){
        //This will be the logic for rendering:
        
        //Surrounding block coord differences: xyz 012
        const surround = [ [0,1] , [0,-1] , [1,1] , [1,-1] , [2,1] , [2,-1] ];

        console.log('viewing: ');
        console.log(zVal.name + "@"+xIter+' '+yIter+' '+zIter);

          for(let k = 0; k < surround.length; k++){
            //do something
            
            if(surround[k][0] == 0 ){ //Looking at x
              let compare = '';
              try {
                compare = dump.blocks[ xIter+surround[k][1] ][yIter][zIter];
              } catch(error){
                console.log('Render NULL');
              }

              if(!compare || compare.cube == false ){
                //Render for x
                // blockState.push(
                //   <TexturePlane x={xIter} y={yIter} z={zIter} rot={[0, Math.PI / 2, 0]}/>
                // );
                // console.log('Rendering x @'+surround[k][1]+ ' x'+xIter+' y'+yIter+' z'+zIter);

              }
            }
            
            



          }

            } // end of z loop

        }

      }


      // for(const block of input.value.blocks.value.value){
      //   console.log(block.pos.value.value);
      //   console.log(block.state.value);
      // }
      blockState.push(<TexturePlane x={3} y={3} z={0} rot={[-Math.PI / 2, 0, 0]}/>);
      setScene(scene.push('1'));
      setScene(scene.push('2'));
      console.log('scene:');
      console.log(typeof scene);
      console.log(scene);
      console.log('\n+blockState:');
      console.log(typeof blockState);
      console.log(blockState)



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
    {renderHandler(scene)}
    </Container>
  )
}

export default Upload