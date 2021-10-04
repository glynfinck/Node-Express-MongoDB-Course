const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

setTimeout(() => {
  console.log('Timer 1 Finished!');
}, 0);

setImmediate(() => {
  console.log('Immediate 1 Finished!');
});

fs.readFile('./test-file.txt', (err, data) => {
  console.log('I/O Finished!');
  console.log('----------------------');

  setTimeout(() => {
    console.log('Timer 2 Finished!');
  }, 0);

  setTimeout(() => {
    console.log('Timer 3 Finished!');
  }, 3000);

  setImmediate(() => {
    console.log('Immediate 2 Finished!');
  });

  process.nextTick(() => {
    console.log('Process next tick 1');
  });

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(`Password Encrypted in ${Date.now() - start} ms`);

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(`Password Encrypted in ${Date.now() - start} ms`);

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(`Password Encrypted in ${Date.now() - start} ms`);

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(`Password Encrypted in ${Date.now() - start} ms`);
});

console.log('Hello from the top-level code');
