const express = require('express');
const app = express();

/**
 * Do CPU intensive work for `duration` time.
 * @param {} duration 
 */
function doWork(duration) {
  const start = Date.now();
  while(Date.now() - start < duration) {

  }
}


app.get('/', (req, res) => {
  /**
   * It'll block all other requests as well.
   */
  doWork(5000);
  res.send('Hi there');
});

app.listen(3002);