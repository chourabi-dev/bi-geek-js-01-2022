const express = require('express');
const { createUser, authUser } = require('./my-modules/auth');
const app = express()
const port = 8080
var jwt = require('jsonwebtoken');
const cors = require('cors');
const { createNewClient, getAllClients } = require('./my-modules/clients');

app.use(cors())


app.use(function(req,res,next){
  if (req.path == '/api/create-user') {
    next();
  }else if (req.path == '/api/auth') {
    next();
  }else{
    const token = req.headers.authorization;

    if (token != null) {
      try {
        const decod = jwt.verify(token,"secret-key-in-string-fomr");
        console.log(decod);
        next();
      } catch (error) {
        res.send({ success:false, message: 'session expired.' })
      }
    } else {
      res.send({ success:false, message: "a full auth is required." })
    }
  }
})


app.post('/api/create-user',(req,res)=>{
    createUser(req,res);
})

app.post('/api/auth',(req,res)=>{
    authUser(req,res);
})




app.post('/api/clients/add',(req,res)=>{
  createNewClient(req,res);
})
app.get('/api/clients/list',(req,res)=>{
  
  getAllClients(req,res);
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})