// Use the request library to make the HTTP request
// Use Node's fs module to write the file
// Use the callback based approach we've been learning so far
// Do not use the pipe function
// Do not use synchronous functions (see warning below)

const info = process.argv.slice(2);
const fs = require("fs");
const url = info[0];
const path = info[1];

const request = require('request');
request(url, (error, response, body) => {
  
  //This might be redundant since it automatically overwrites a file
  //Error returns no such flie or directory if it's a bad path
  //Error also returns non-200 results
  if (fs.existsSync(path)) {
    console.log('statusCode:', response && response.statusCode);
    fs.writeFile(path, body, {
      encoding: 'utf8',
      flag: 'w'
    }, (error) => {
      if (error) {
        // Handle error
        console.log("Failed to write to file:", error);
        return;
      }
      // Success!
      console.log(`Successfully wrote ${response.headers['content-length']} to ${path}.`);
    });
  
  } else {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    fs.writeFile(path, body, (error) => {
      if (error) {
        // Handle error
        console.log("Failed to write to file:", error);
        return;
      }
      // Success!
      console.log(`Successfully wrote ${response.headers['content-length']} to ${path}.`);
    
    });

  }
  

});

