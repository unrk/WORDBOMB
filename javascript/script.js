/* ----- SCRIPT DE RECHERCHES JS ----- */

let mots = [];
let currentTheme = 'normal';

async function chargerMots(listPath = 'lists/sub1.txt') {
    try {
        const response = await fetch(listPath);
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

/* ----- SIDEBAR FUNCTIONS ----- */

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

function switchTheme(theme) {
    const themeCSS = document.querySelector('link[rel="stylesheet"]');
    const navItems = document.querySelectorAll('.sidebar-nav a');
    
    navItems.forEach(item => item.classList.remove('active'));
    
    if (theme === 'minecraft') {
        themeCSS.href = 'styles/minecraft.css';
        document.title = '👑 SUB 1 | version minecraft';
        document.getElementById('nav-minecraft').classList.add('active');
        chargerMots('lists/mcsub1.txt');
        currentTheme = 'minecraft';
    } else {
        themeCSS.href = 'styles/style.css';
        document.title = '👑 SUB 1 | version normal';
        document.getElementById('nav-normal').classList.add('active');
        chargerMots('lists/sub1.txt');
        currentTheme = 'normal';
    }
    
    closeSidebar();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

/*
      /\_/\  
     ( o.o ) 
      > ^ <  "pourquoi tu regardes par ici toi ?" 
*/