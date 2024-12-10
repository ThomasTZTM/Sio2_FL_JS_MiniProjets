 // Horaires du magasin
 const horaires = [
    { 
        jour: "Lundi",
        ouverture: "09:00",
        fermeture: "18:00",
        estOuvert: true
    },
    {
        jour: "Mardi", 
        ouverture: "09:00",
        fermeture: "18:00",
        estOuvert: true
    },
    {
        jour: "Mercredi",
        ouverture: "09:00",
        fermeture: "18:00", 
        estOuvert: true
    },
    {
        jour: "Jeudi",
        ouverture: "09:00",
        fermeture: "18:00",
        estOuvert: true
    },
    {
        jour: "Vendredi",
        ouverture: "09:00",
        fermeture: "18:00",
        estOuvert: true
    },
    {
        jour: "Samedi",
        ouverture: "10:00",
        fermeture: "17:00",
        estOuvert: true
    },
    {
        jour: "Dimanche",
        estOuvert: false
    }
];

// Jours fériés
const joursFeries = ["2024-12-25", "2024-01-01"]; // Noël, Nouvel An

// Fonction pour afficher les horaires
function afficherHoraires() {
    const horairesContainer = document.getElementById("horaires");
    horairesContainer.innerHTML = "";
    
    horaires.forEach(plage => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        
        const jourSpan = document.createElement("div");
        jourSpan.className = "d-flex align-items-center";
        jourSpan.innerHTML = `
            <i class="fas ${plage.estOuvert ? 'fa-sun text-warning' : 'fa-moon text-secondary'} me-2"></i>
            <span class="fw-bold">${plage.jour}</span>
        `;
        
        const horaireSpan = document.createElement("div");
        if (plage.estOuvert) {
            horaireSpan.className = "badge bg-success rounded-pill";
            horaireSpan.innerHTML = `
                <i class="fas fa-clock me-1"></i>
                ${plage.ouverture} - ${plage.fermeture}
            `;
        } else {
            horaireSpan.className = "badge bg-danger rounded-pill";
            horaireSpan.innerHTML = `
                <i class="fas fa-times-circle me-1"></i>
                Fermé
            `;
        }
        
        li.appendChild(jourSpan);
        li.appendChild(horaireSpan);
        horairesContainer.appendChild(li);
    });
}

// Fonction pour vérifier si le magasin est ouvert
function estOuvert(jour, heure) {
    const plage = horaires.find(h => h.jour === jour);
    if (!plage || !plage.estOuvert) return false;

    const [hOuverture, mOuverture] = plage.ouverture.split(":").map(Number);
    const [hFermeture, mFermeture] = plage.fermeture.split(":").map(Number);

    const heureEnMinutes = heure.getHours() * 60 + heure.getMinutes();
    const ouvertureEnMinutes = hOuverture * 60 + mOuverture;
    const fermetureEnMinutes = hFermeture * 60 + mFermeture;

    return heureEnMinutes >= ouvertureEnMinutes && heureEnMinutes < fermetureEnMinutes;
}

// Fonction pour afficher le statut actuel
function afficherStatutActuel() {
    const maintenant = new Date();
    const jourActuel = maintenant.toLocaleDateString("fr-FR", { weekday: "long" });
    const jourActuelCapitalise = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1).toLowerCase();
    const estJourFerie = joursFeries.includes(maintenant.toISOString().split("T")[0]);

    const statutElement = document.getElementById("statut");
    if (estJourFerie || !estOuvert(jourActuelCapitalise, maintenant)) {
        statutElement.innerHTML = `
            <i class="fas fa-door-closed fs-3"></i>
            <span class="fs-4 fw-bold">Fermé</span>
        `;
        statutElement.className = "alert alert-danger d-flex align-items-center justify-content-center gap-3 mt-3 py-4";
    } else {
        statutElement.innerHTML = `
            <i class="fas fa-door-open fs-3"></i>
            <span class="fs-4 fw-bold">Ouvert</span>
        `;
        statutElement.className = "alert alert-success d-flex align-items-center justify-content-center gap-3 mt-3 py-4";
    }
}

// Nouvelle fonction pour vérifier une heure spécifique
function verifierHeure() {
    const heureInput = document.querySelector('#heure-test').value;
    const resultatElement = document.querySelector('#resultat-test');

    if (!heureInput) {
        resultatElement.innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Veuillez saisir une heure
            </div>`;
        return;
    }

    const maintenant = new Date();
    const jourActuel = maintenant.toLocaleDateString("fr-FR", { weekday: "long" });
    const jourActuelCapitalise = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1).toLowerCase();

    const [heures, minutes] = heureInput.split(':').map(Number);
    const heureTest = new Date();
    heureTest.setHours(heures, minutes);

    const estOuvertTest = estOuvert(jourActuelCapitalise, heureTest);

    if (estOuvertTest) {
        resultatElement.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-door-open me-2"></i>
                Le magasin est ouvert à ${heureInput}
            </div>`;
    } else {
        resultatElement.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-door-closed me-2"></i>
                Le magasin est fermé à ${heureInput}
            </div>`;
    }
}

// Ajout de l'écouteur d'événement pour le bouton de vérification
document.querySelector('#btn-verifier').addEventListener('click', verifierHeure);

// Initialisation
afficherHoraires();
afficherStatutActuel();
setInterval(afficherStatutActuel, 60000);