const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let toutesLesTaches = [];

form.addEventListener('submit', event => {  // évènement submit (pour le formulaire)
  event.preventDefault();  // prévient qu'on veut les donné en local

  const text = input.value.trim(); // enlève les espace avant et aprés le texte (trim)
  if(text !== ''){ // différent d'une chaîne de caractère
    rajouterUneTache(text); //apellé une méthode 
    input.value = ''; //clean l'input
  }
})

function rajouterUneTache(text){

  const todo = {
    text,
    // La méthode Dat.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
    id: Date.now()
  }
  afficherListe(todo);
}

function afficherListe(todo){ // remplie la liste Todo d'une LI, Input, Span, Button et d'une img

  const item = document.createElement('li'); // création d'une li
  item.setAttribute('data-key', todo.id);

  const input = document.createElement('input'); // création d'élément
  input.setAttribute('type', 'checkbox');
  input.addEventListener('click', tacheFaite);  // au click de la checkbox on déclenche la tacheFaite
  item.appendChild(input);

  const txt = document.createElement('span'); // création d'élément span
  txt.innerText = todo.text;
  item.appendChild(txt);

  const btn = document.createElement('button'); //création d'élément button pour supprimer une tache
  btn.addEventListener('click', supprimerTache); // au click se déclenchera/ s'envera l'événement de supprimer la tache
  const img = document.createElement('img'); // création d'une image (la croix rouge)
  img.setAttribute('src', 'ressources/fermer.svg'); // selectionner/appelé l'image
  btn.appendChild(img);
  item.appendChild(btn);


  liste.appendChild(item);
  toutesLesTaches.push(item);
  console.log(toutesLesTaches);
}

function tacheFaite(e){ // fonction tache faite
  e.target.parentNode.classList.toggle('finDeTache')
  // click sur l'input checkbox ça va sur le li pour la fonction fin de tache, pour l'animation
}

function supprimerTache(e) { // fonction pour supprimer la tache

  toutesLesTaches.forEach(el => {

    if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
      el.remove(); // l'enlève du DOM
      toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key);
      // garde tous les li qui ont un id strictement différent de l'élément li qui vient d'être enlevé
    }

  })

}