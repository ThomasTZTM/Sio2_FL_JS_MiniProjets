 // Taux de change (exemple statique)
 const tauxChange = {
    EUR: { USD: 1.1, GBP: 0.85 },
    USD: { EUR: 0.91, GBP: 0.77 },
    GBP: { EUR: 1.17, USD: 1.3 }
};

// Éléments du DOM
const formulaire = document.getElementById('conversion-form');
const montantInput = document.getElementById('montant');
const deviseDepartSelect = document.getElementById('devise-depart');
const deviseArriveeSelect = document.getElementById('devise-arrivee');
const convertirBtn = document.getElementById('convertir-btn');
const reinitialiserBtn = document.getElementById('reinitialiser-btn');
const resultatDiv = document.getElementById('resultat');
const erreurMontantDiv = document.getElementById('erreur-montant');
const erreurDevisesDiv = document.getElementById('erreur-devises');

// Fonction de conversion
function convertir() {
    const montant = parseFloat(montantInput.value);
    const deviseDepart = deviseDepartSelect.value;
    const deviseArrivee = deviseArriveeSelect.value;

    // Cacher les messages d'erreur précédents
    erreurMontantDiv.style.display = 'none';
    erreurDevisesDiv.style.display = 'none';
    resultatDiv.style.display = 'none';

    // Validation
    if (isNaN(montant) || montant <= 0) {
        erreurMontantDiv.style.display = 'block';
        return;
    }

    if (deviseDepart === deviseArrivee) {
        erreurDevisesDiv.style.display = 'block';
        return;
    }

    // Calcul du taux de conversion
    const taux = tauxChange[deviseDepart][deviseArrivee];
    const resultat = (montant * taux).toFixed(2);

    // Affichage du résultat
    resultatDiv.textContent = `${montant} ${deviseDepart} = ${resultat} ${deviseArrivee}`;
    resultatDiv.style.display = 'block';
}

// Fonction de réinitialisation
function reinitialiser() {
    formulaire.reset();
    resultatDiv.style.display = 'none';
    erreurMontantDiv.style.display = 'none';
    erreurDevisesDiv.style.display = 'none';
}

// Écouteurs d'événements
convertirBtn.addEventListener('click', convertir);
reinitialiserBtn.addEventListener('click', reinitialiser);