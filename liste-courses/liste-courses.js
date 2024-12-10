 // Sélection des éléments
 const articleInput = document.getElementById('article-input');
 const quantiteInput = document.getElementById('quantite-input');
 const addBtn = document.getElementById('add-btn');
 const clearBtn = document.getElementById('clear-btn');
 const articleList = document.getElementById('article-list');

 // Fonction pour ajouter un article
 function addArticle() {
     const articleName = articleInput.value.trim();
     const quantite = parseInt(quantiteInput.value);

     if (articleName === '') {
         alert('Veuillez entrer un nom d\'article.');
         return;
     }

     if (isNaN(quantite) || quantite < 1) {
         alert('Veuillez entrer une quantité valide.');
         return;
     }

     // Création de l'élément de liste
     const li = document.createElement('li');
     li.className = 'list-group-item d-flex justify-content-between align-items-center';

     // Texte de l'article avec quantité
     li.innerHTML = `
         <div>
             <span class="article-name">${articleName}</span>
             <span class="badge bg-secondary ms-2">x${quantite}</span>
         </div>
         <div>
             <button class="btn btn-success btn-sm me-2 mark-btn">Acheté</button>
             <button class="btn btn-danger btn-sm delete-btn">Supprimer</button>
         </div>
     `;

     // Ajout de l'article à la liste
     articleList.appendChild(li);

     // Réinitialisation des champs
     articleInput.value = '';
     quantiteInput.value = '1';
     articleInput.focus();
 }

 // Fonction pour marquer un article comme "Acheté"
 function markAsBought(event) {
     const button = event.target;
     const li = button.closest('li');
     const articleName = li.querySelector('.article-name');

     articleName.classList.toggle('text-decoration-line-through');
     button.disabled = true;
 }

 // Fonction pour supprimer un article
 function deleteArticle(event) {
     const button = event.target;
     const li = button.closest('li');
     articleList.removeChild(li);
 }

 // Fonction pour tout supprimer
 function clearList() {
     articleList.innerHTML = '';
 }

 // Écouteurs d'événements
 addBtn.addEventListener('click', addArticle);

 articleList.addEventListener('click', (event) => {
     if (event.target.classList.contains('mark-btn')) {
         markAsBought(event);
     } else if (event.target.classList.contains('delete-btn')) {
         deleteArticle(event);
     }
 });

 clearBtn.addEventListener('click', clearList);

 // Permettre l'ajout avec la touche Entrée
 articleInput.addEventListener('keypress', (event) => {
     if (event.key === 'Enter') {
         addArticle();
     }
 });