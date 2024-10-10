/**
 * Testing using apache benchmark
 * 1) ab -c 1 -n 1 localhost:3002/
 *    => Total of 1 requests, make 1 concurrent requests.
 * 2) ab -c 2 -n 2 localhost:3002/
 *    => Total of 2 requests, make 2 concurrent requests.
 *
 * What if we fork large number of processses.
 *  => It would take even more time because of context switching, idle is to number of CPUs.
 */
const cluster = require("cluster");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1; // Every child in cluster will have only one threadpool.
/**
 * Master process to manage cluster.
 * All other would be false, as it is considered as fork/slave/child.
 */
if (cluster.isMaster) {
  console.log("This is master");
  // Cause index.js to be executed again but in fork/slave/child mode.
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  console.log("This is fork");
  // This block will be executed by child only.
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 1000000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.listen(3002);
}
