/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const async = require('async');
const { MarkovMachine } = require('./markov');

// let mm = new MarkovMachine(input);
// console.log(mm.makeText())

const cat = path => {
    fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.log("ERROR: Check local file path.", err);
        process.exit(1);
    }
        let mm = new MarkovMachine(data);
        console.log(mm.makeText());
    })
}

async function webCat(path){
    try{
        let response = await axios.get(path);
        let mm = new MarkovMachine(response.data);
        console.log(mm.makeText());
    } catch (err){
        console.log(err, "ERROR: Check URL path.");
        process.exit(1);
    }
} 

const readFile = (type, path) => {
  if (type === 'url') {
  webCat(path);
} else if (type === 'file'){
  cat(path);
}  else{
    console.error(`Unknown method: ${type}. Please pass in "file" or "url" as first parameter. Then pass in appropriate path. For example: makeText.js file eggs.txt or makeText.js url http://www.gutenberg.org/files/11/11-0.txt.`)
}
}

readFile(process.argv[2], process.argv[3]);