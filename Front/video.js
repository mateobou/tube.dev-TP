function streamVideo(videoUrl, videoTitle){
    const videoContainer = document.getElementById("#video");
    const source = document.createElement("video");
    source.src = videoUrl;
    source.width = 560;
    source.height = 315;
    videoContainer.appendChild(source);
}

fetch('https://www.protube/video/1245332')
    .then((response) => response.json())
    .then((data) => {
    // Récupération des informations de la vidéo
    const videoTitle = data.title;
    const videoUrl = data.url;
    streamVideo(videoTitle, videoUrl);
    // Création de l'élément iframe pour afficher la vidéo
    
  })
    .catch(error => console.error(error));