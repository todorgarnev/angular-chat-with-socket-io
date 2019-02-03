import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();

app.set("port", process.env.PORT || 3000);

const http = require('http').Server(app);
// set up socket.io and bind it to our http server.
let io = require('socket.io')(http);

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('../client/index.html'));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', (socket: any) => {
  console.log('a user connected');

  socket.on('message', (message: string) => {
    console.log(`emitted message: ${message}`);
    // echo the message back down the
    // websocket connection
    socket.emit('message', `You just sent '${message}' to the server!`);
  });
});

// start our simple server up on localhost:3000
const server = http.listen(3000, () => {
  console.log('listening on port: 3000');
});