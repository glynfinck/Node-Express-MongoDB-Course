const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject({ message: 'I could not find that file!' });
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject({ message: 'Could not write to file!' });
      } else {
        resolve('Success');
      }
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt');
    console.log(data);

    const prom1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const prom2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const prom3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const messages = (await Promise.all([prom1, prom2, prom3])).map(
      (res) => res.body.message
    );
    console.log(messages);

    await writeFilePro('dogImage.txt', messages.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const result = await getDogPic();
    console.log(result);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR: !!!!!!!');
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then((result) => {
//     console.log(result);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log('ERROR: !!!!!!');
//   });

// readFilePro('./dog.txt')
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     const { message, status } = res.body;
//     console.log(message);

//     return writeFilePro('dogImage.txt', message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// Async/Await
