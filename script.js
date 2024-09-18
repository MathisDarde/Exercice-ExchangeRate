async function converter() {
  if (source.value != "0" && cible.value != "0" && number.value) {
    const devise = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${source.value}/${cible.value}/${number.value}`
    );
    let resultat_chiffre = await devise.json();
    console.log(resultat_chiffre);
    resultat.innerHTML = resultat_chiffre.conversion_result;
  } else if (source.value == "0") {
    resultat.innerHTML = "Choisir une devise source";
  } else if (!number.value) {
    resultat.innerHTML = "Entrer un montant";
  } else {
    resultat.innerHTML = "Choisir une devise cible";
  }
}

async function LoadDevise() {
  const devise = await fetch(
    "https://v6.exchangerate-api.com/v6/13fb17a204ececd22714c061/latest/EUR"
  );
  let data = await devise.json();
  data = data.conversion_rates;
  Object.keys(data).forEach((devise) => {
    const option_devise = document.createElement("option");
    option_devise.textContent = devise;

    source.appendChild(option_devise);
  });
  Object.keys(data).forEach((devise) => {
    const option_devise = document.createElement("option");
    option_devise.textContent = devise;

    cible.appendChild(option_devise);
  });
}

const API_KEY = "13fb17a204ececd22714c061";

let number = document.getElementById("number");
let resultat = document.getElementById("resultat");

const source = document.getElementById("devise_source");
const cible = document.getElementById("devise_cible");

number.addEventListener("input", converter);
source.addEventListener("input", converter);
cible.addEventListener("input", converter);

LoadDevise();
