/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n.?!,]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
      let words = this.words;
      let chainList = {};
      for (let i = 0; i < words.length; i++){
        let nextWord = words[i + 1];
        if (!chainList[words[i]]){
          chainList[words[i]] = [];
        }
        chainList[words[i]].push(nextWord);
      }
      return chainList; 
    }
    
  

    
  


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let text = [];
    let chains = this.chains;
    let words = Object.keys(this.chains);
    let firstWord = random(words);
    let nextMarkovArray;
    let nextWord = firstWord;
    let withPeriod;
    let noPeriod;
    for (let i = 0; i < numWords; i++){
      if (text.length === 0){
        while (!containsUppercase(firstWord)){
          firstWord = random(words);
        } 
        text.push(firstWord);
        nextWord = firstWord;
      } else{
        nextMarkovArray = chains[nextWord];
        nextWord = random(nextMarkovArray);
        if (containsUppercase(nextWord)){
          withPeriod = ". " + nextWord;
          text.push(withPeriod);
        }
        else{
          noPeriod = " " + nextWord;
          text.push(noPeriod);
        }
      }
    }
    let sentences = text;
    sentences = text.join('');
    let lastPeriod = (sentences.lastIndexOf('.')+1);
    sentences = sentences.slice(0, lastPeriod);
    // console.log(sentences);
    return sentences;
  }
}

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}


function random(array){
  let length = (array.length - 1);
  let index = Math.floor(Math.random()*length);
  return array[index];
}

// let input = "I could not, would not, on a boat. I will not, will not, with a goat. I will not eat them in the rain. I will not eat them on a train. Not in the dark! Not in a tree! Not in a car! You let me be! I do not like them in a box. I do not like them with a fox. I will not eat them in a house. I do not like them with a mouse. I do not like them here or there. I do not like them anywhere!"


// let mm = new MarkovMachine(input);
// console.log(mm.makeText())

module.exports = { MarkovMachine , random , containsUppercase };

