const students = [];
let scoreCategories;

function collectStudents() {
    while (confirm("Započeti unos novog studenta?")) {
        let firstName = getValidTextInput("Unesite ime studenta:");
        if (firstName === null) continue;
        firstName=firstName.toUpperCase();

        let lastName = getValidTextInput("Unesite prezime studenta:");
        if (lastName === null) continue;
        lastName=lastName.toUpperCase();

        let score = getValidScore("Unesite broj bodova studenta (int 0-100):");
        if (score === null) continue;

        students.push({ firstName, lastName, score });
        alert("Student uspješno unesen!");
    }
}

function analyzeStudents() {
    if (students.length === 0) {
        console.log("Nema unesenih studenata.");
        return;
    }

    scoreCategories = {
        "0-25%": { students: [], totalScore: 0, count: 0 },
        "25-50%": { students: [], totalScore: 0, count: 0 },
        "50-75%": { students: [], totalScore: 0, count: 0 },
        "75-100%": { students: [], totalScore: 0, count: 0 }
    };

    students.forEach(({ firstName, lastName, score }) => {
        let category;
        if (score <= 25) category = "0-25%";
        else if (score <= 50) category = "25-50%";
        else if (score <= 75) category = "50-75%";
        else category = "75-100%";

        scoreCategories[category].students.push({ lastName, firstName, score });
        scoreCategories[category].totalScore += score;
        scoreCategories[category].count++;
    });

    Object.keys(scoreCategories).forEach(category => {
        scoreCategories[category].students.sort((a, b) => a.lastName.localeCompare(b.lastName));
    });

    console.log("Rezultati testova po kategorijama:");
    Object.entries(scoreCategories).forEach(([category, data]) => {
        let averageScore = data.count > 0 ? Math.round(data.totalScore / data.count) : 0;
        console.log(`\nKategorija ${category} (Prosječni bodovi: ${averageScore}%):`);
        if (data.students.length > 0) {
            data.students.forEach(({ lastName, firstName, score }) => {
                console.log(`${lastName}, ${firstName} - ${score}%`);
            });
        } else {
            console.log("Nema studenata u ovoj kategoriji.");
        }
    });
}

function getValidScore(promptString) {
    let score;
    let input;
    do {
        input = prompt(promptString);
        if (input === null) return null;

        input = input.trim();
        score = parseInt(input, 10);
        if (isNaN(score) || score < 0 || score > 100 || !/^\d+$/.test(input)) {
            alert("Bodovi moraju biti cijeli broj između 0 i 100.");
        }
    } while (isNaN(score) || score < 0 || score > 100 || !/^\d+$/.test(input));
    return score;
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

collectStudents();
analyzeStudents();
