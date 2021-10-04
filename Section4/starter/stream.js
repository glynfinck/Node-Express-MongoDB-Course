const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams
  // start stream
  // const stream = fs.createReadStream('test-file.txt');
  // stream.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // // end stream
  // stream.on('end', () => {
  //   res.end();
  // });
  // // error event for stream
  // stream.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });

  // Solution 3
  const stream = fs.createReadStream('test-file.txt');
  stream.pipe(res);
  // readable source -> pipe(writeable destination)
});

server.listen(3000, 'localhost', () => {
  console.log('Server started on port 3000');
});
