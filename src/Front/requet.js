document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // empêche l'envoi du formulaire par défaut
  var formData = new FormData(this); // crée un objet FormData à partir du formulaire soumis
  var xhr = new XMLHttpRequest(); // crée une nouvelle requête HTTP
  xhr.open('POST', 'http://localhost:3000/users'); // définit le type de requête et l'URL de destination
  xhr.send({
    username: formData.username,
    lastName: formData.lastName,
    password: formData.password,
    email: formData.email,
  }); // envoie la requête avec les données du formulaire
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert('Inscription réussie !' + formData);
    } else {
      console.error('Erreur : ' + xhr.status);
    }
  };
});
