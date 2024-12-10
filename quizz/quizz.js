const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        reponses: ["Paris", "Londres", "Berlin"],
        correcte: 0 // L'index de la bonne réponse
    },
    {
        question: "Combien de continents existe-t-il ?",
        reponses: ["5", "6", "7"],
        correcte: 2
    },
    {
        question: "Quel est le langage de programmation du web ?",
        reponses: ["Python", "JavaScript", "C++"],
        correcte: 1
    }
];

let indexQuestionActuelle = 0;
let score = 0;

const elementQuiz = document.getElementById("quiz");
const elementQuestion = document.querySelector(".question");
const elementReponses = document.querySelector(".reponses");
const btnSuivant = document.getElementById("btn-suivant");
const elementResultat = document.getElementById("resultat");
const elementScore = document.getElementById("score");
const btnRecommencer = document.getElementById("btn-recommencer");
const messageErreur = document.getElementById("message-erreur");

function afficherQuestion(index) {
    const donneesQuestion = questions[index];
    elementQuestion.textContent = donneesQuestion.question;
    elementReponses.innerHTML = "";
    messageErreur.style.display = "none";

    donneesQuestion.reponses.forEach((reponse, i) => {
        const div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
            <input class="form-check-input" type="radio" name="reponse" id="reponse${i}" value="${i}">
            <label class="form-check-label" for="reponse${i}">
                ${reponse}
            </label>
        `;
        elementReponses.appendChild(div);
    });
}

function obtenirReponseSelectionnee() {
    const boutons = document.querySelectorAll("input[name='reponse']");
    for (const bouton of boutons) {
        if (bouton.checked) {
            return parseInt(bouton.value);
        }
    }
    return null;
}

function afficherResultat() {
    elementQuiz.style.display = "none";
    elementResultat.style.display = "block";
    elementScore.textContent = `Votre score : ${score}/${questions.length}`;
}

function recommencerQuiz() {
    indexQuestionActuelle = 0;
    score = 0;
    elementQuiz.style.display = "block";
    elementResultat.style.display = "none";
    afficherQuestion(indexQuestionActuelle);
}

btnSuivant.addEventListener("click", () => {
    const reponseSelectionnee = obtenirReponseSelectionnee();
    if (reponseSelectionnee === null) {
        messageErreur.style.display = "block";
        return;
    }

    messageErreur.style.display = "none";
    if (reponseSelectionnee === questions[indexQuestionActuelle].correcte) {
        score++;
    }

    indexQuestionActuelle++;

    if (indexQuestionActuelle < questions.length) {
        afficherQuestion(indexQuestionActuelle);
    } else {
        afficherResultat();
    }
});

btnRecommencer.addEventListener("click", recommencerQuiz);

// Initialisation
afficherQuestion(indexQuestionActuelle);