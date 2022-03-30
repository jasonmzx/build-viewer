const express = require('express'); 
var fs = require('fs');
var path = require('path');
const cors = require('cors');
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true,
  // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


app.get('/texture/:id', async (req,res) =>{

  var id = req.params.id;
  const file = path.join('./static/'+id+'.png');


  var s = fs.createReadStream(file);
  s.on('open', ()=>{
    res.set('Content-Type', 'image/png');
    s.pipe(res);
  });


});