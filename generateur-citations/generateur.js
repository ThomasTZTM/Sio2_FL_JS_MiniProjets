 // Citations classées par catégories
 const citations = {
    inspiration: [
        { texte: "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", auteur: "Gandhi" },
        { texte: "Le succès c'est tomber sept fois, se relever huit.", auteur: "Proverbe japonais" },
    ],
    humour: [
        { texte: "Je ne suis pas superstitieux, mais je suis un peu stitieux.", auteur: "Michael Scott" },
        { texte: "La vie c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", auteur: "Einstein" },
    ],
    philosophie: [
        { texte: "Je pense, donc je suis.", auteur: "Descartes" },
        { texte: "L'enfer, c'est les autres.", auteur: "Sartre" },
    ]
};

// Sélection des éléments
const conteneurCitation = document.querySelector("#conteneur-citation");
const texteCitation = document.querySelector("#texte-citation");
const auteurCitation = document.querySelector("#auteur-citation");
const btnGenerer = document.querySelector("#btn-generer");
const historique = document.querySelector("#historique");
const btnEffacerHistorique = document.querySelector("#btn-effacer-historique");

// Ajouter une citation à l'historique
function ajouterHistorique(citation, auteur) {
    const element = document.createElement("li");
    element.className = "list-group-item";
    element.textContent = `"${citation}" - ${auteur}`;
    historique.appendChild(element);
}

// Effacer l'historique
function effacerHistorique() {
    historique.innerHTML = '';
}

// Générer une citation
function genererCitation() {
    const categorie = document.querySelector("#categorie").value;
    const citationAleatoire = citations[categorie][Math.floor(Math.random() * citations[categorie].length)];

    // Animation et mise à jour
    conteneurCitation.classList.add("cacher");
    setTimeout(() => {
        texteCitation.textContent = citationAleatoire.texte;
        auteurCitation.textContent = `- ${citationAleatoire.auteur}`;
        conteneurCitation.classList.remove("cacher");
        conteneurCitation.classList.add("montrer");

        // Ajouter à l'historique
        ajouterHistorique(citationAleatoire.texte, citationAleatoire.auteur);
    }, 300);
}

// Écouteurs d'événements
btnGenerer.addEventListener("click", genererCitation);
btnEffacerHistorique.addEventListener("click", effacerHistorique);