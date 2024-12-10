// Produits disponibles avec images
const produits = [
    { 
        id: 1, 
        nom: "Pomme", 
        prix: 1,
        image: "https://cdn-icons-png.flaticon.com/512/415/415733.png"
    },
    { 
        id: 2, 
        nom: "Banane", 
        prix: 0.5,
        image: "https://cdn-icons-png.flaticon.com/512/3143/3143645.png"
    },
    { 
        id: 3, 
        nom: "Orange", 
        prix: 0.8,
        image: "https://cdn-icons-png.flaticon.com/512/415/415734.png"
    },
    { 
        id: 4, 
        nom: "Mangue", 
        prix: 1.5,
        image: "https://cdn-icons-png.flaticon.com/512/6866/6866569.png"
    }
];

let panier = [];

const conteneurProduits = document.querySelector("#produits");
const conteneurPanier = document.querySelector("#panier");
const elementPrixTotal = document.querySelector("#prix-total");

function afficherProduits() {
    produits.forEach((produit) => {
        const divProduit = document.createElement("div");
        divProduit.className = "col-md-3 mb-3";
        divProduit.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <img src="${produit.image}" 
                         alt="${produit.nom}" 
                         class="img-produit mb-3">
                    <h5 class="card-title">${produit.nom}</h5>
                    <p class="card-text">${produit.prix} €</p>
                    <button class="btn btn-primary w-100" onclick="ajouterAuPanier(${produit.id})">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        conteneurProduits.appendChild(divProduit);
    });
}

function ajouterAuPanier(idProduit) {
    const produit = produits.find((p) => p.id === idProduit);
    const produitExistant = panier.find((item) => item.id === idProduit);

    if (produitExistant) {
        produitExistant.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }

    mettreAJourPanier();
}

function supprimerDuPanier(idProduit) {
    panier = panier.filter((item) => item.id !== idProduit);
    mettreAJourPanier();
}

function mettreAJourPanier() {
    conteneurPanier.innerHTML = "";

    if (panier.length === 0) {
        conteneurPanier.innerHTML = `<p class="text-muted">Votre panier est vide.</p>`;
        elementPrixTotal.textContent = "0 €";
        return;
    }

    panier.forEach((item) => {
        const elementPanier = document.createElement("div");
        elementPanier.className = "d-flex justify-content-between align-items-center mb-3";
        elementPanier.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" 
                     alt="${item.nom}" 
                     class="img-panier me-3">
                <span>${item.nom} x ${item.quantite}</span>
            </div>
            <div class="d-flex align-items-center">
                <span class="me-3">${(item.prix * item.quantite).toFixed(2)} €</span>
                <button class="btn btn-sm btn-danger" onclick="supprimerDuPanier(${item.id})">
                    Supprimer
                </button>
            </div>
        `;
        conteneurPanier.appendChild(elementPanier);
    });

    const total = panier.reduce((somme, item) => somme + item.prix * item.quantite, 0);
    elementPrixTotal.textContent = `${total.toFixed(2)} €`;
}

afficherProduits();