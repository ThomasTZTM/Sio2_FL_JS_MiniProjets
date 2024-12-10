document.querySelector("#convertir-btn").addEventListener("click", () => {
    const valeur = parseFloat(document.querySelector("#valeur").value);
    const uniteDepart = document.querySelector("#unite-depart").value;
    const uniteArrivee = document.querySelector("#unite-arrivee").value;
    const resultatBox = document.querySelector("#resultat");

    // Validation
    if (isNaN(valeur)) {
        resultatBox.textContent = "Veuillez entrer une valeur valide.";
        resultatBox.classList.remove('actif');
        return;
    }

    // Conversion
    const resultat = convertirUnites(valeur, uniteDepart, uniteArrivee);

    // Affichage du résultat avec animation
    resultatBox.textContent = typeof resultat === "number"
        ? `${valeur} ${uniteDepart} = ${resultat} ${uniteArrivee}`
        : resultat;
    resultatBox.classList.add('actif');
});

// Fonction de conversion reste identique
function convertirUnites(valeur, uniteDepart, uniteArrivee) {
    if (uniteDepart === "metres" && uniteArrivee === "kilometres") {
        return valeur / 1000;
    } else if (uniteDepart === "kilometres" && uniteArrivee === "metres") {
        return valeur * 1000;
    } else if (uniteDepart === "grammes" && uniteArrivee === "kilogrammes") {
        return valeur / 1000;
    } else if (uniteDepart === "kilogrammes" && uniteArrivee === "grammes") {
        return valeur * 1000;
    } else if (uniteDepart === "celsius" && uniteArrivee === "fahrenheit") {
        return (valeur * 9/5) + 32;
    } else if (uniteDepart === "fahrenheit" && uniteArrivee === "celsius") {
        return (valeur - 32) * 5/9;
    } else if (uniteDepart === uniteArrivee) {
        return valeur; // Pas de conversion nécessaire
    } else {
        return "Conversion non prise en charge.";
    }
}