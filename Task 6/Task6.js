const equipment = [];
let availableEquipment = [];
let unavailableIndexes = [];
let totalValue = 0;
let unavailableValue = 0;
let priceCategories = {
    cheap: [],
    medium: [],
    expensive: []
};

function collectEquipment() {
    while (confirm("Započeti unos nove opreme?")) {
        let name = getValidTextInput("Unesite naziv opreme:");
        if (name === null) continue;

        let price = getValidPrice("Unesite cijenu opreme:");
        if (price === null) continue;

        let status = getValidStatus("Unesite status opreme (dostupno/nedostupno):");
        if (status === null) continue;

        equipment.push({ name, price, status });
        alert("Oprema uspješno unesena!");
    }
}

function analyzeEquipment() {
    if (equipment.length === 0) {
        console.log("Nema unesenih podataka o opremi.");
        return;
    }

    availableEquipment = [];
    unavailableIndexes = [];
    totalValue = 0;
    unavailableValue = 0;
    priceCategories = { cheap: [], medium: [], expensive: [] };

    equipment.forEach(({ name, price, status }, index) => {
        totalValue += price;
        if (status.toLowerCase() === "nedostupno") {
            unavailableIndexes.push(index);
            unavailableValue += price;
        } else {
            availableEquipment.push({ name, price });
        }
    });

    availableEquipment.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    
    availableEquipment.forEach(({ name, price }) => {
        if (price < 100) priceCategories.cheap.push({ name, price });
        else if (price < 500) priceCategories.medium.push({ name, price });
        else priceCategories.expensive.push({ name, price });
    });

    let unavailablePercentage = totalValue > 0 ? ((unavailableValue / totalValue) * 100).toFixed(2) : 0;
    
    console.log("Indeksi nedostupne opreme:", unavailableIndexes.join(", "));
    console.log("Dostupna oprema (sortirana po cijeni i nazivu):", availableEquipment);
    console.log(`Postotak ukupne vrijednosti koju čini nedostupna oprema: ${unavailablePercentage}%`);
    console.log("Grupirana dostupna oprema:");
    console.log("Jeftina oprema (<100 EUR):", priceCategories.cheap);
    console.log("Srednja oprema (<500 EUR):", priceCategories.medium);
    console.log("Skupa oprema:", priceCategories.expensive);
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

function getValidStatus(promptString) {
    let status;
    do {
        let input = prompt(promptString);
        if (input === null) return null;

        status = input.trim().toLowerCase();
        if (status !== "dostupno" && status !== "nedostupno") {
            alert("Status mora biti 'dostupno' ili 'nedostupno'.");
        }
    } while (status !== "dostupno" && status !== "nedostupno");
    return status;
}

collectEquipment();
analyzeEquipment();
