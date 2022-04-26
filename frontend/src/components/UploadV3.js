import React from 'react';
import {Container} from "react-bootstrap";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import nbt from '../nbt';
import pakoInflate from '../pako/inflate';
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

  
    function handleChange(event) {

        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {

            console.log(e.target.result);

            // G-zip decompressed schem:
            var dcSchem = pakoInflate.ungzip(e.target.result);

            var x = nbt.parse(dcSchem, function(error, data) {
              if (error) { throw error; }
          
              console.log(data);
          });

            console.log(dcSchem);

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