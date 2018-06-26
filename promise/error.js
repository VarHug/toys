console.log('start');
// new Promise(resolve => {
//   setTimeout(() => {
//     throw new Error('this is a error');
//   }, 2000);
// }).then(value => {
//   console.log(`${value} world`);
// }).catch(error => {
//   console.log(`Error: ${error.message}`);
// });

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err 2')
  }, 2000);
}).then(value => {
  console.log(`${value} OK`);
}, value => {
  console.log(`${value} ERR`);
})