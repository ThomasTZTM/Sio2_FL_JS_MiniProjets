// Le reste du code JavaScript reste identique
const votes = { Pizza: 0, Sushi: 0, Tacos: 0 };
let totalVotes = 0;

function updateResults() {
    for (const choice in votes) {
        const percent = totalVotes > 0 ? Math.round((votes[choice] / totalVotes) * 100) : 0;
        document.querySelector(`#${choice.toLowerCase()}-percent`).textContent = `${percent}%`;
        document.querySelector(`#${choice.toLowerCase()}-bar`).style.width = `${percent}%`;
    }
}

document.querySelector('#choices').addEventListener('click', (event) => {
    const choice = event.target.closest('.btn-aliment')?.id;
    if (votes[choice] !== undefined) {
        votes[choice]++;
        totalVotes++;
        updateResults();
    }
});

updateResults();