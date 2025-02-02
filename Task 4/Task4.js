const plants = [];
let colorStats = {};
let sortedColors;
let topColors;

function collectPlants() {
    while (confirm("Započeti unos nove biljke?")) {
        let name = getValidTextInput("Unesite naziv biljke:");
        if (name === null) continue;

        let color = getValidTextInput("Unesite boju biljke:");
        if (color === null) continue;
        color = color.toLowerCase();

        let calories = getValidCalories("Unesite broj kalorija biljke:");
        if (calories === null) continue;

        plants.push({ name, color, calories });
        alert("Biljka uspješno unesena!");
    }
}

function analyzePlants() {
    if (plants.length === 0) {
        console.log("Nema unesenih biljaka.");
        return;
    }

    colorStats = {};
    plants.forEach(({ name, color, calories }) => {
        if (!colorStats[color]) {
            colorStats[color] = { totalCalories: 0, plants: [] };
        }
        colorStats[color].totalCalories += calories;
        colorStats[color].plants.push({ name, calories });
    });

    sortedColors = Object.entries(colorStats)
        .map(([color, data]) => ({
            color,
            totalCalories: data.totalCalories,
            plants: data.plants
        }))
        .sort((a, b) => a.color.localeCompare(b.color));

    console.log("Grupirane biljke po boji i ukupne kalorije:");
    sortedColors.forEach(({ color, totalCalories, plants }) => {
        console.log(`${color}: ${totalCalories} kalorija\n Biljke: `, plants);
    });

    topColors = sortedColors
        .sort((a, b) => b.totalCalories - a.totalCalories)
        .slice(0, 3);

    console.log("Top 3 boje s najvećim kalorijskim doprinosom:");
    topColors.forEach(({ color, totalCalories }) => {
        console.log(`${color}: ${totalCalories} kalorija`);
    });
}

function getValidCalories(promptString) {
    let calories;
    let input;
    do {
        input = prompt(promptString);
        if (input === null) return null;

        input = input.trim();
        calories = parseFloat(input);
        if (isNaN(calories) || calories <= 0 || !/^\d+(\.\d{1,2})?$/.test(input)) {
            alert("Kalorije moraju biti pozitivan decimalan broj s točkom i maksimalno dvije decimale.");
            continue;
        }
        calories = parseFloat(calories.toFixed(2));
    } while (isNaN(calories) || calories <= 0 || !/^\d+(\.\d{1,2})?$/.test(input));
    return calories;
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

collectPlants();
analyzePlants();
