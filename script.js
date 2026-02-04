 // Load YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

var player;
var isYouTubeReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    videoId: '09R8_2nJtjg',
    playerVars: {
      start: 42,
      controls: 0,
      autoplay: 0,
      mute: 1,
      rel: 0
    },
    events: {
      onReady: () => isYouTubeReady = true,
      onError: (e) => console.log("YT error:", e.data)
    }
  });
}

function playMusicSafe() {
  if (isYouTubeReady && player) {
    document.getElementById('youtube-player-container').style.display = 'block';
    try {
      player.playVideo();
      setTimeout(() => player.unMute(), 300);
    } catch (e) {
      console.log("Playback blocked");
    }
  }
}

function showMessage(response) {

  const img = document.getElementsByClassName("image")[0];

  // ✅ CLICK counts as user interaction → safe to start music
  playMusicSafe();

  if (response === "No") {
    const noButton = document.getElementById("no-button");

    // fix image path
    img.src = "gun.gif";

    noButton.style.position = "absolute";

    function moveButton() {
      const maxWidth = window.innerWidth - noButton.offsetWidth;
      const maxHeight = window.innerHeight - noButton.offsetHeight;

      noButton.style.left = Math.random() * maxWidth + "px";
      noButton.style.top = Math.random() * maxHeight + "px";
    }

    moveButton();

    document.getElementById("question").textContent = "Choose wisely";
    document.getElementById("name").style.display = "none";

    noButton.onmouseover = moveButton;
  }

  if (response === "Yes") {

    // remove elements
    document.getElementById("name")?.remove();
    document.getElementById("no-button")?.remove();
    document.getElementById("yesButton")?.remove();

    // stop youtube
    if (player) {
      player.stopVideo();
      player.destroy();
    }
    document.getElementById('youtube-player-container')?.remove();

    // play cheering audio
    const audio = new Audio("Minions.mp4");
    audio.play().catch(() => {});

    // update message + gif
    const q = document.getElementById("question");
    q.textContent = "See you on the 14th my princess";
    q.style.fontStyle = "normal";

    img.src = "dance.gif";
  }
}
