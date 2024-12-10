document.addEventListener('DOMContentLoaded', () => {
    const formulaire = document.querySelector('#formulaire');
    const carte = document.querySelector('#carte');

    document.querySelector('#generer-btn').addEventListener('click', () => {
        const prenom = formulaire.prenom.value.trim();
        const couleur = formulaire.couleur.value;
        const message = formulaire.message.value.trim();

        if (!formulaire.checkValidity()) {
            formulaire.classList.add('was-validated');
            return;
        }

        carte.style.display = 'block';
        carte.classList.add('animate-zoom');
        const carteDiv = carte.querySelector('.card');
        carteDiv.style.backgroundColor = couleur;
        
        const isLightColor = (color) => {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return ((r * 299) + (g * 587) + (b * 114)) / 1000 > 128;
        };
        
        carteDiv.style.color = isLightColor(couleur) ? '#000' : '#fff';
        carte.querySelector('#carte-prenom').textContent = 
            `Joyeux Anniversaire, ${prenom} !`;
        carte.querySelector('#carte-message').textContent = 
            message || "Profite bien de ta journée !";
    });

    document.querySelector('#reset-btn').addEventListener('click', () => {
        carte.style.display = 'none';
        carte.classList.remove('animate-zoom');
        formulaire.reset();
        formulaire.classList.remove('was-validated');
    });
});