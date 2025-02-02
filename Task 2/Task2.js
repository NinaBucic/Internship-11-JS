const employees = [];
let industryStats = {};

function collectEmployees() {
    while (confirm("Započeti unos novog zaposlenika?")) {
        let firstName = getValidTextInput("Unesite ime zaposlenika:");
        if (firstName === null) continue;

        let lastName = getValidTextInput("Unesite prezime zaposlenika:");
        if (lastName === null) continue;

        let industry = getValidTextInput("Unesite industriju zaposlenja:");
        if (industry === null) continue;
        industry = industry.toLowerCase();

        let salary = getValidSalary("Unesite plaću zaposlenika:");
        if (salary === null) continue;

        employees.push({ firstName, lastName, industry, salary });
        alert("Zaposlenik uspješno unesen!");
    }
}

function analyzeIndustries() {
    if (employees.length === 0) {
        console.log("Nema unesenih zaposlenika.");
        return;
    }

    industryStats = {};
    employees.forEach(({ industry, salary, firstName, lastName }) => {
        if (!industryStats[industry]) {
            industryStats[industry] = { totalSalary: 0, count: 0, employees: [] };
        }
        industryStats[industry].totalSalary += salary;
        industryStats[industry].count++;
        industryStats[industry].employees.push({ firstName, lastName, salary });
    });

    const filteredIndustries = Object.entries(industryStats)
        .filter(([_, data]) => data.count >= 2)
        .map(([industry, data]) => ({
            industry,
            averageSalary: (data.totalSalary / data.count).toFixed(2),
            employeesCount: data.count,
            employees: data.employees
        }))
        .sort((a, b) => b.averageSalary - a.averageSalary);

    if (filteredIndustries.length === 0) {
        console.log("Nema industrija s najmanje dva zaposlenika.");
        return;
    }

    console.log("Statistika industrija s najmanje dva zaposlenika:");
    filteredIndustries.forEach(({ industry, averageSalary, employeesCount, employees }) => {
        console.log(`${industry}:\n Prosječna plaća: ${averageSalary} EUR, Broj zaposlenih: ${employeesCount}\n Zaposlenici:`, employees);
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
analyzeIndustries();
