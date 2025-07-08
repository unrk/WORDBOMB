
/* ----- SCRIPT DE RECHERCHES JS ----- */

let mots = [];

async function chargerMots() {
    try {
        const response = await fetch('SUB1.txt');
        const text = await response.text();
        mots = text.split('\n').map(mot => mot.trim()).filter(mot => mot.length > 0);
        console.log(`${mots.length} mots chargés`);
    } catch (error) {
        console.error('Erreur lors du chargement des mots:', error);
    }
}

function filtrer() {
    const syllabe = document.getElementById('syllabe').value.toUpperCase().trim();
    const listeMots = document.getElementById('liste-mots');

    if (syllabe.length === 0) {
        listeMots.innerHTML = '';
        return;
    }

    const motsFiltrés = mots.filter(mot => mot.includes(syllabe));

    listeMots.innerHTML = motsFiltrés.map(mot => {
        const motSurlignée = mot.replace(new RegExp(`(${syllabe})`, 'gi'), '<mark>$1</mark>');
        return `<div class="mot">${motSurlignée}</div>`;
    }).join('');
}

document.getElementById('syllabe').addEventListener('input', filtrer);

chargerMots();




/*
      /\_/\  
     ( o.o ) 
      > ^ <  "pourquoi tu regardes par ici toi ?" 
*/