const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Votre code pour se connecter à un compte (ex: envoi d'une requête HTTP)
  var xhr = new XMLHttpRequest(); // crée une nouvelle requête HTTP
  xhr.open('POST', 'http://localhost:3000/auth/login'); // définit le type de requête et l'URL de destination
  xhr.send({ username: username, password: password }); // envoie la requête avec les données du formulaire
});
