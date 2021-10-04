const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmmitter = new Sales();

myEmmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});

myEmmitter.emit('newSale', 9);
myEmmitter.emit('newSale', 10);

///////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Received!');
  console.log(req.url);
  res.end('Request Received!');
});

server.on('request', (req, res) => {
  console.log('Another Request!');
});

server.on('close', () => {
  console.log('Server Closing!');
});

server.listen(3000, 'localhost', () => {
  console.log('Server started on port 3000');
});
