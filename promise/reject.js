let promise = Promise.reject('something wrong');

promise
  .then( () => {
    console.log('it\'s ok');
  })
  .catch( () => {
    console.log('no, it\'s not ok');

    return Promise.reject({
      then() {
        console.log('it well be ok');
      },
      catch() {
        console.log('not yet');
      }
    });
  });
