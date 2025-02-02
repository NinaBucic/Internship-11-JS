let cities = [];

function enterCities() {
  cities = [];
  while (true) {
    let city = prompt(
      "Unesite naziv grada (ili pritisnite Cancel za završetak):"
    );
    if (city === null) break;

    city = city.trim();
    if (city === "") {
      alert("Naziv grada ne smije biti prazan.");
      continue;
    }
    if (/^\d+$/.test(city)) {
      alert("Naziv grada ne smije sadržavati samo brojeve.");
      continue;
    }

    cities.push(city);
  }
  updateCityList();
}

function updateCityList() {
  cities.sort((a, b) => a.localeCompare(b));
  document.getElementById("fullCityList").textContent =
    cities.join(", ") || "Nema unesenih gradova.";
  let filteredCities = cities.filter((city) => city.length > 5);

  let csvOutput = filteredCities.join(", ");
  document.getElementById("cityList").textContent =
    csvOutput || "Nema gradova koji zadovoljavaju kriterije.";
}

function downloadCities() {
  let filteredCities = cities.filter((city) => city.length > 5);

  let csvContent = filteredCities.join(", ");
  if (csvContent === "") {
    alert("Nema podataka za preuzimanje.");
    return;
  }

  let blob = new Blob([csvContent], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gradovi.txt";
  a.click();
}
