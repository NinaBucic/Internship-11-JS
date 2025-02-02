let equipment = [];

document
  .getElementById("equipmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = getValidTextInput("name");
    let price = parseFloat(document.getElementById("price").value);
    let status = document.getElementById("status").value;

    if (!name || isNaN(price) || price < 0 || name===null) {
      alert("Molimo unesite ispravan naziv i cijenu opreme.");
      return;
    }

    equipment.push({ name, price, status });
    updateEquipmentList();
    document.getElementById("equipmentForm").reset();
  });

function updateEquipmentList() {
  let equipmentList = document.getElementById("equipmentList");
  equipmentList.innerHTML = "";

  equipment.sort(
    (a, b) => a.status.localeCompare(b.status) || a.name.localeCompare(b.name)
  );

  let availableCount = 0;
  let unavailableCount = 0;

  equipment.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toFixed(2)} EUR`;
    li.className = item.status === "dostupno" ? "available" : "unavailable";

    if (item.status === "dostupno") availableCount++;
    else unavailableCount++;

    equipmentList.appendChild(li);
  });

  let ratio = unavailableCount > 0 ? (availableCount / unavailableCount).toFixed(2) : availableCount;

  document.getElementById(
    "equipmentRatio"
  ).textContent = `Omjer dostupne i nedostupne opreme: ${availableCount} / ${unavailableCount} = ${ratio}`;
}

function getValidTextInput(id) {
  let text = document.getElementById(id).value.trim();
  if (/^\d+$/.test(text)) {
    alert("Tekstualni unos ne smije sadržavati samo brojeve.");
    return null;
  }
  return text;
}
