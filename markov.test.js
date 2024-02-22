const { MarkovMachine, containsUppercase, random } = require('./markov');

describe("testsMarkovMachine", function () {
        let input;
        let mm;
        let chains;
        let objKeys;
        let text;
        beforeEach(function () {
            console.log("BEFORE EACH!")
        })
        afterEach(function () {
            console.log("AFTER EACH!")
        })
        beforeAll(function () {
            console.log("BEFORE ALL")
            input = "I could not, would not, on a boat. I will not, will not, with a goat. I will not eat them in the rain. I will not eat them on a train. Not in the dark! Not in a tree! Not in a car! You let me be! I do not like them in a box. I do not like them with a fox. I will not eat them in a house. I do not like them with a mouse. I do not like them here or there. I do not like them anywhere!"
            mm = new MarkovMachine(input);
            chains = mm.chains;
            objKeys = Object.keys(chains);
            text = mm.makeText();
        })
        afterAll(function () {
            console.log("after ALL")
        })
        test("check random function returns random word from makeChains array", function () {
            const randomWord = random(objKeys);
            expect(objKeys).toContain(randomWord);
        });

        test("tests uppercase detection function", function () {
            let capWord = 'Hello';
            let capWord2 = 'hELLo';
            let lowerCase = 'hello';
            expect(containsUppercase(capWord)).toBe(true);
            expect(containsUppercase(capWord2)).toBe(true);
            expect(containsUppercase(lowerCase)).toBe(false);
        });

        test("tests length of text generated by makeText()", function () {
            let textArray = text.split(' ');
            expect(textArray.length).toBeLessThan(101);
            expect(textArray.length).toBeGreaterThanOrEqual(85);
        });

        test("tests that a random word from the original input made it into the chains object", function () {
            let inputArray = input.split(' ');
            let randomInput = random(inputArray);
            let randomInput2 = random(inputArray);
            let randomInput3 = random(inputArray);
            expect(objKeys).toContain(randomInput);
            expect(objKeys).toContain(randomInput2);
            expect(objKeys).toContain(randomInput3);
        });

        test("tests that a random word from the text made from the makeText function came from the original input", function () {
            let inputArray = input.split(' ');
            let randomInput = random(inputArray);
            let randomInput2 = random(inputArray);
            let randomInput3 = random(inputArray);
            expect(text).toMatch(randomInput);
            expect(text).toMatch(randomInput2);
            expect(text).toMatch(randomInput3);
        });
    }
);
