const employees = [];
let sectorStats = {};
let totalSalary = 0;
let sortedSectors;

function collectEmployees() {
    while (confirm("Započeti unos novog zaposlenika?")) {
        let firstName = getValidTextInput("Unesite ime zaposlenika:");
        if (firstName === null) continue;

        let lastName = getValidTextInput("Unesite prezime zaposlenika:");
        if (lastName === null) continue;

        let sector = getValidTextInput("Unesite sektor zaposlenja:");
        if (sector === null) continue;
        sector = sector.toLowerCase();

        let salary = getValidSalary("Unesite plaću zaposlenika:");
        if (salary === null) continue;

        employees.push({ firstName, lastName, sector, salary });
        alert("Zaposlenik uspješno unesen!");
    }
}

function analyzeSectors() {
    if (employees.length === 0) {
        console.log("Nema unesenih zaposlenika.");
        return;
    }
    
    totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    sectorStats = {};
    employees.forEach(({ firstName, lastName, sector, salary}) => {
        if (!sectorStats[sector]) {
            sectorStats[sector] = { totalSalary: 0, employees: [] };
        }
        sectorStats[sector].totalSalary += salary;
        sectorStats[sector].employees.push({ firstName, lastName, salary });
    });

    sortedSectors = Object.entries(sectorStats)
        .map(([sector, data]) => ({
            sector,
            sectorContribution: ((data.totalSalary / totalSalary) * 100).toFixed(2),
            employees: data.employees.map(emp => ({
                ...emp,
                contribution: ((emp.salary / data.totalSalary) * 100).toFixed(2)
            }))
        }))
        .sort((a, b) => b.sectorContribution - a.sectorContribution);

    console.log(`Ukupna plaća svih zaposlenika: ${totalSalary.toFixed(2)} EUR`);
    console.log("Doprinosi sektora ukupnoj plaći:");
    sortedSectors.forEach(({ sector, sectorContribution, employees }) => {
        console.log(`${sector}: ${sectorContribution}% ukupne plaće\n Zaposlenici i njihov doprinos u sektoru: `, employees);
    });
}

function getValidSalary(promptString) {
    let salary;
    let input;
    do {
        input = prompt(promptString);
        if (input === null) return null;

        input = input.trim();
        salary = parseFloat(input);
        if (isNaN(salary) || salary <= 0 || !/^\d+(\.\d{1,2})?$/.test(input)) {
            alert("Plaća mora biti pozitivan decimalni broj s točkom i maksimalno dvije decimale.");
            continue;
        }
        salary = parseFloat(salary.toFixed(2));
    } while (isNaN(salary) || salary <= 0 || !/^\d+(\.\d{1,2})?$/.test(input));
    return salary;
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

collectEmployees();
analyzeSectors();
