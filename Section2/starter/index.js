const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

//// Files ////

// fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err1, data1) => {
//   fs.readFile(`${__dirname}/txt/${data1}.txt`, 'utf-8', (err2, data2) => {
//     fs.readFile(`${__dirname}/txt/append.txt`, 'utf-8', (err3, data3) => {
//       const final = `${data2}\n${data3}`;
//       fs.writeFile(`${__dirname}/txt/final.txt`, final, 'utf-8', (err) => {
//         if (err) console.log(err);
//       });
//     });
//   });
// });

// console.log('Able to do this first!');

//// Server ////

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

const slugs = products.map((prod) => {
  return slugify(prod.productName, { lower: true });
});

console.log(slugs);

let overviewPage = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

let productPage = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

let cardPage = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const constructCards = (products) => {
  let cards = '';
  for (let i = 0; i < products.length; i++) {
    const card = `${replaceTemplate(products[i], cardPage)}\n`;
    cards += card;
  }
  return cards;
};

const constructOverview = (products) => {
  const cards = constructCards(products);
  return overviewPage.replace(/{%PRODUCT_CARDS%}/g, cards);
};

const overview = constructOverview(products);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(overview);
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    if (query) {
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      const { id } = query;
      const product = products.find((prod) => {
        return +prod.id === +id;
      });
      if (product) {
        const productFinal = replaceTemplate(product, productPage);
        res.end(productFinal);
      } else {
        res.end('<h1>No Product Found</h1>');
      }
    } else {
      res.end('<h1>No Product Found</h1>');
    }
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Listening to requests on port 3000');
});
