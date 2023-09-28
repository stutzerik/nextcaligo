const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client } = require('ssh2');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('connectSSH', ({ host, username, password }) => {
    const conn = new Client();

    conn.on('ready', () => {
      socket.emit('sshReady');

      conn.shell((err, stream) => {
        if (err) {
          console.error('SSH shell error:', err);
          socket.emit('sshError', err.message); 
          return; 
        }

        stream.on('data', (data) => {
          socket.emit('sshData', data.toString('utf-8'));
        });

        socket.on('sshCommand', (command) => {
          stream.write(command + '\n');
        });

        socket.on('disconnect', () => {
          conn.end();
        });
      });
    });

    conn.on('error', (err) => {
      console.error('SSH connection error:', err);
      socket.emit('sshError', err.message); 
    });

    conn.connect({
      host,
      username,
      password,
    });
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});