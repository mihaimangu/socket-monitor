const path = require('path');
const express = require('express');
const si = require('systeminformation');

const app = express()
const port = 3000

const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server})


wss.on('connection', function (ws){
  console.log("A new client connected");
  ws.send("Welcome new client");

  ws.on('message', function incoming(message){
    console.log("received: %s", message);
    ws.send("Got your message")
  })

  ws.on('error', function(error){
    console.log("connection was lost", error)
    clearInterval(x);
  })
  

  let x = setInterval(() => {
    // console.log("sending new data through ws");
    si.currentLoad(data => {
      ws.send(data.currentload)
    })
  }, 1000);
})



app.get('/', (req, res) => {
  si.currentLoad()
    .then(data => {
      console.log('current load is', data.currentload)
      res.sendFile(path.join(__dirname+'/index.html'))
    })
    .catch(error => console.error(error));

})



server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})