function getValidNaturalNumber(promptString) {
    let number;
    let input;
    do {
        input = prompt(promptString);
        if (input === null) return null;

        input = input.trim();
        number = parseInt(input, 10);
        if (isNaN(number) || number <= 0 || !/^\d+$/.test(input)) {
            alert("Unos mora biti prirodan broj (1 ili veći).");
        }
    } while (isNaN(number) || number <= 0 || !/^\d+$/.test(input));
    return number;
}

function calculateSquares(n) {
    return Array(n).fill().map((_, i) => Math.pow(i + 1, 2));
}

function analyzeSquares(n) {
    if (n === null) {
        console.log("Unos je prekinut.");
        return;
    }
    
    const squares = calculateSquares(n);
    const sum = squares.reduce((acc, num) => acc + num, 0);
    const average = (sum / n).toFixed(2);
    
    const sortedSquares = [...squares];
    const midIndex = Math.floor(sortedSquares.length / 2);
    const median = sortedSquares.length % 2 === 0 
        ? ((sortedSquares[midIndex - 1] + sortedSquares[midIndex]) / 2).toFixed(2) 
        : sortedSquares[midIndex];

    console.log(`Kvadrati prvih ${n} prirodnih brojeva:`, squares);
    console.log(`Ukupni zbroj kvadrata: ${sum}`);
    console.log(`Prosječna vrijednost: ${average}`);
    console.log(`Medijan: ${median}`);
}

let n = getValidNaturalNumber("Unesite prirodan broj N:");
analyzeSquares(n);
