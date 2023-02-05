class VideoPage {
    private videoTitle: string;
    private videoUrl: string;
  
    constructor() {
      this.fetchVideo();
      document.getElementById('download-button').onclick = () => {
        this.downloadVideo();
      };
    }
    private streamVideo(videoUrl, videoTitle) {
      const videoContainer = document.getElementById('#video');
      const source = document.createElement('video');
      source.src = videoUrl;
      source.width = 560;
      source.height = 315;
      videoContainer.appendChild(source);
    }
    private fetchVideo() {
      fetch('https://www.protube/video/1245332')
        .then((response) => response.json())
        .then((data) => {
          this.videoTitle = data.title;
          this.videoUrl = data.url;
          this.streamVideo(this.videoTitle, this.videoUrl);
          document.getElementById('download-button').style.display = 'block';
        })
        .catch((error) => console.error(error));
    }
  
    private downloadVideo() {
      let link = document.createElement('a');
      link.download = this.videoTitle;
      link.href = this.videoUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link = null;
    }
  }
  
  const videoPage = new VideoPage();