const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
process.env.UV_THREADPOOL_SIZE = 4;

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 1000000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}
doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

/**
 * 
 * 
Request 421
Hash: 2920
FS: 2921
Hash: 2935
Hash: 3137
Hash: 3143

The output is something weird because fs should take very little amount of time.
The reason is, we have two different things.
Threadpool and OS
 1) Threadpool executes FS module as well as other computing stuff (hash in our case).
 2) OS executes HTTPS request (something that is not running in our machine).

 So hash and fs will be executed by threadpool and we have 5 different things (1 fs and 4 hash) running at the same 
  time.
  The initial thread assignment will as follow:
    Thread 1 => fs
    Thread 2 => hash
    Thread 3 => hash
    Thread 4 => hash
  Now once fs starts communication with hard drive, it'll change the context and start executing 4th hash function while waiting response from harddrive.
  So now thread assigment will be
    Thread 1 => hash
    Thread 2 => hash
    Thread 3 => hash
    Thread 4 => hash
  Now after all hash is computed, one of thread will again go to fs to read the data returned by the harddrive.
    Thread 1 => fs

  That's why 1 fs and 4 hash takes equal amount of time.
 
 However, https will be executed by main eventloop itself, once we have response.

 If we change our default threadpool from 4 to 5, the FS will be executed immediately since it'll not require context switching.
 */
