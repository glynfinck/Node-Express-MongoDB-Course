const a = 2;
const b = 5;

// module.exports
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(a, b));
console.log(calc1.multiply(a, b));
console.log(calc1.divide(a, b));

// exports
const { add, multiply, divide } = require('./test-module-2');
console.log(add(a, b));
console.log(multiply(a, b));
console.log(divide(a, b));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
