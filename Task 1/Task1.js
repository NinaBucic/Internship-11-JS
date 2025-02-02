const books = [];
let totalPrice = 0;
let averagePrice = 0;

function collectBooks() {
    while(confirm("Započeti unos nove knjige?")){
        let title = getValidTextInput("Unesite naslov knjige");
        if (title === null) continue;

        let price = getValidPrice("Unesite cijenu knjige");
        if (price === null) continue;

        let genre = getValidTextInput("Unesite žanr knjige");
        if (genre === null) continue;
        genre = genre.toLowerCase();

        books.push({ title, price, genre });
        alert("Knjiga uspješno unesena!");
    }
}

function analyzeBooks() {
    if (books.length === 0) {
        console.log("Nema unesenih knjiga.");
        return;
    }

    totalPrice = books.reduce((acc, book) => acc + book.price, 0);
    averagePrice = totalPrice / books.length;

    books.forEach(book => book.deviation = Math.abs(book.price - averagePrice));

    let mostDeviantBook = books.reduce((max, book) => book.deviation > max.deviation ? book : max, books[0]);

    books.sort((a, b) => b.deviation - a.deviation);

    console.log(`Prosječna cijena knjiga: ${averagePrice.toFixed(2)} EUR`);
    if (mostDeviantBook.deviation === 0) {
        console.log("Sve knjige imaju istu cijenu, nema odstupanja.");
    } else {
        console.log(`Knjiga s najvećim odstupanjem:\n "${mostDeviantBook.title}"\nŽanr: ${mostDeviantBook.genre} \n(${mostDeviantBook.price} EUR)`);
    }
    console.log("Knjige sortirane prema odstupanju od prosjeka:");
    books.forEach(book => {
        console.log(`${book.title} - ${book.price} EUR (Odstupanje: ${book.deviation.toFixed(2)})`);
    });
}

function getValidPrice(promptString) {
    let price;
    let input;
    do {
        input = prompt(promptString);
        if (input === null) return null;

        input = input.trim();
        price = parseFloat(input);
        if (isNaN(price) || price <= 0 || !/^\d+(\.\d{1,2})?$/.test(input)) {
            alert("Cijena mora biti pozitivan decimalan broj s točkom i maksimalno dvije decimale.");
            continue;
        }
        price = parseFloat(price.toFixed(2));
    } while (isNaN(price) || price <= 0 || !/^\d+(\.\d{1,2})?$/.test(input));
    return price;
}

function getValidTextInput(promptString) {
    let text;
    do {
        let input = prompt(promptString);
        if (input === null) return null;

        text = input.trim();
        if (text === "") {
            alert("Polje ne smije biti prazno.");
            continue;
        }
        if (/^\d+$/.test(text)) {
            alert("Tekstualni unos ne smije sadržavati samo brojeve.");
            continue;
        }
    } while (text === "" || /^\d+$/.test(text));
    return text;
}

collectBooks();
analyzeBooks();