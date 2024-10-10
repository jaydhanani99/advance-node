const cluster = require("cluster");

/**
 * Master process to manage cluster.
 * All other would be false, as it is considered as fork/slave/child.
 */
if (cluster.isMaster) {
  console.log('This is master')
  // Cause index.js to be executed again but in fork/slave/child mode.
  cluster.fork();
  // Multiple fork
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  console.log('This is fork');
  // This block will be executed by child only.
  const express = require("express");
  const app = express();

  /**
   * Do CPU intensive work for `duration` time.
   * @param {} duration
   */
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("Hi there, this is fast");
  });

  app.listen(3002);
}