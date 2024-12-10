// Création d'une fonction pour injecter le menu de navigation
function injectNavigationMenu() {
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark bg-primary fixed-top';
    nav.innerHTML = `
        <div class="container">
            <a class="navbar-brand" href="/index.html">
                <i class="fas fa-code me-2"></i>
                Mes Projets
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Navigation rapide
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/horaires/horaires.html">Horaires d'ouverture</a></li>
                            <li><a class="dropdown-item" href="/liste-courses/liste-courses.html">Liste de courses</a></li>
                            <li><a class="dropdown-item" href="/panier/panier.html">Panier d'achat</a></li>
                            <li><a class="dropdown-item" href="/quizz/quizz.html">Quiz</a></li>
                            <li><a class="dropdown-item" href="/convertisseur-mesures/convertisseur-mesures.html">Convertisseur de mesures</a></li>
                            <li><a class="dropdown-item" href="/convertisseur-devises/convertisseur.html">Convertisseur de devises</a></li>
                            <li><a class="dropdown-item" href="/generateur-citations/generateur.html">Générateur de citations</a></li>
                            <li><a class="dropdown-item" href="/simulateur-votes/simulateur.html">Simulateur de votes</a></li>
                            <li><a class="dropdown-item" href="/todos/todos.html">Liste de tâches</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Ajout du style pour le body
    document.body.style.paddingTop = '70px';

    // Injection du menu au début du body
    document.body.insertBefore(nav, document.body.firstChild);

    // Ajout du lien Font Awesome s'il n'existe pas déjà
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
        fontAwesomeLink.rel = "stylesheet";
        document.head.appendChild(fontAwesomeLink);
    }
}

// Exécution de la fonction quand le DOM est chargé
document.addEventListener('DOMContentLoaded', injectNavigationMenu); 