// const os = require('os');
// console.log(os.cpus().length);

// If you make threadpool size to 0, it will take as 1
process.env.UV_THREADPOOL_SIZE = 2; // 4 is default
const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});
console.log('Hello 1')
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});
console.log('Hello 2')
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});
console.log('Hello 3')
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});
console.log('Hello 4')
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});
console.log('Hello 5')
crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
  console.log('6:', Date.now() - start);
});
console.log('Hello 6')