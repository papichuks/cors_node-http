/*Create a simple server using the core ‘node:http’ module that can handle multiple concurrent requests. 
Each request should respond with a message after a random delay (simulating some asynchronous operation) without blocking the server. 
The server should be configured to handle CORS. Provide a GET route that when hit, returns information about the user’s CPU and OS (any information you’d like to return).*/

import { createServer } from 'http';
import os from 'os';

const port = 3000;

async function simulateRandomDelay() {
  const delayTime = Math.floor(Math.random() * (4000) + 1000);
  return new Promise(resolve => setTimeout(resolve, delayTime));
}

const server = createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': false,
    'Content-Type': 'text/plain'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    await simulateRandomDelay();
    const osModel = os.cpus()[0].model;
    const osType = os.type();
    res.writeHead(200, headers);
    res.end(`OS Model: ${osModel}\nOS Type: ${osType}`);
  }
  else if (req.method === 'GET' && req.url === '/info') {
    await simulateRandomDelay();
    const osRelease = os.release();
    const osArch = os.arch();
    res.writeHead(200, headers);
    res.end(`OS Release: ${osRelease}\nOS Architecture: ${osArch}`);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
