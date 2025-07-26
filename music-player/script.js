const songs = [
  {
    title: "Vaathi Coming",
    artist: "Anirudh Ravichander",
    file: "songs/Vaathi.mp3" 
  },
  {
    title: "Why This Kolaveri",
    artist: "Dhanush",
    file: "songs/Why This Kolaveri Di.mp3"
  },
  {
    title: "Rowdy Baby",
    artist: "Dhanush & Dhee",
    file: "songs/Rowdy baby.mp3"
  },
  {
    title: "Enjoy Enjaami",
    artist: "Dhee & Arivu",
    file: "songs/Enjoy Enjaami.mp3"
  },
  {
    title: "Arabic Kuthu",
    artist: "Anirudh Ravichander",
    file: "songs/Arabic Kuthu.mp3"
  },
  {
    title: "Jimikki Kammal",
    artist: "Shaan Rahman",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    title: "Oo Solriya",
    artist: "Indravathi Chauhan",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    title: "Thaai Kelavi",
    artist: "Dhanush",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    title: "Donu Donu Donu",
    artist: "Anirudh Ravichander",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  }
];

let currentSongIndex = 0;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("song")) {
  currentSongIndex = parseInt(urlParams.get("song"));
}

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  highlightPlaylist(index);
}

function highlightPlaylist(index) {
  const items = document.querySelectorAll("#playlist li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function playPauseSong() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

playBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

songs.forEach((s, i) => {
  const li = document.createElement("li");
  li.textContent = s.title;
  li.addEventListener("click", () => {
    currentSongIndex = i;
    loadSong(i);
    audio.play();
  });
  playlist.appendChild(li);
});

loadSong(currentSongIndex);
