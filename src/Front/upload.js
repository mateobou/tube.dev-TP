document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var formData = new FormData();
    formData.append("video", document.querySelector("input[type=file]").files[0]);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/video/upload", true);
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert("La vidéo a été envoyée avec succès !");
      } else {
        alert("Une erreur s'est produite lors de l'envoi de la vidéo.");
      }
    };
  
    xhr.send(formData);
  });