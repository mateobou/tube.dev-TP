fetch('https://www.protube/video/1245332')
    .then((response) => response.json())
    .then((data) => {
    // Récupération des informations de la vidéo
    const videoTitle = data.title;
    const videoUrl = data.url;

    // Création de l'élément iframe pour afficher la vidéo
    const videoContainer = document.getElementById('video-container');
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.width = 560;
    iframe.height = 315;
    iframe.frameborder = 0;
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen = true;
    videoContainer.appendChild(iframe);
    })
    .catch(error => console.error(error));