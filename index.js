const fs = require('fs');
const path = require('path');

for (let i = 1; i <= 15; i++) {
  fs.mkdir(path.join(__dirname, `Section${i}`), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });
}
