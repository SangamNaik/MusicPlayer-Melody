let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let audioElement = new Audio('./assets/songs/1.mp3');
let songItems = Array.from(document.getElementsByClassName('songItem'));
const nextIcon = document.getElementById('next');
const previousIcon = document.getElementById('previous');
const currentSongPoster = document.getElementById('currentSongPoster');
const musicSpectrum = document.querySelector('.musicSpectrum');
const mainContainer = document.querySelector('.container');
const songBannerHeading = document.querySelector('.songBannerHeading');
const playSelectedSongs = Array.from(
  document.getElementsByClassName('songItemPlay')
);
const songDuration = document.querySelector('.songDuration');
const currentTimeStamp = document.getElementById('currentTimeStamp');

let songs = [
  {
    songName: 'Perfect ~ Ed Sheeran',
    filePath: 'assets/songs/1.mp3',
    coverPath: 'assets/covers/1.jpg',
    duration: '4:23',
  },
  {
    songName: 'Kesariya ~ Arijit Singh',
    filePath: 'assets/songs/2.mp3',
    coverPath: 'assets/covers/2.jpg',
    duration: '2:52',
  },
  {
    songName: 'Calm Down ~ Rema & Selena Gomez',
    filePath: 'assets/songs/3.mp3',
    coverPath: 'assets/covers/3.jpg',
    duration: '3:59',
  },
  {
    songName: 'Baarishein ~ Anuv Jain',
    filePath: 'assets/songs/4.mp3',
    coverPath: 'assets/covers/4.jpg',
    duration: '3:24',
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
  element.getElementsByClassName('timestamp')[0].innerText = songs[i].duration;
});

function songPlayPause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    index = audioElement.src.slice(-5)[0];
    songBannerHeading.innerText = 'Now Playing';
    currentSongPoster.src = `assets/covers/${index}.jpg`;
    musicSpectrum.style.opacity = 1;
    musicSpectrum.style.display = 'block';
    mainContainer.style.backgroundImage = "url('./assets/bg_blurred.jpg')";
    songDuration.innerText = songs[index - 1].duration;
    audioElement.play();
    playSelectedSongs[index - 1].classList.remove('fa-circle-play');
    playSelectedSongs[index - 1].classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  } else {
    songBannerHeading.innerText = '';
    currentSongPoster.src = '';
    musicSpectrum.style.opacity = 0;
    musicSpectrum.style.display = 'none';
    mainContainer.style.backgroundImage = "url('./assets/bg.jpeg')";
    audioElement.pause();
    makeAllPlays();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
  }
}

document.body.onkeyup = function (e) {
  if (e.key == ' ' || e.code == 'Space' || e.keyCode == 32) {
    songPlayPause();
  }
};

masterPlay.addEventListener('click', () => {
  songPlayPause();
});

const makeAllPlays = () => {
  playSelectedSongs.forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

function playSong(songIndex) {
  audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  songBannerHeading.innerText = 'Now Playing';
  currentSongPoster.src = `assets/covers/${songIndex + 1}.jpg`;
  musicSpectrum.style.opacity = 1;
  musicSpectrum.style.display = 'block';
  mainContainer.style.backgroundImage = "url('./assets/bg_blurred.jpg')";
  songDuration.innerText = songs[songIndex].duration;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
}

playSelectedSongs.forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    playSong(songIndex);
  });
});

nextIcon.addEventListener('click', () => {
  if (songIndex >= 3) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  playSong(songIndex);
  makeAllPlays();
});

previousIcon.addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 3;
  } else {
    songIndex -= 1;
  }
  playSong(songIndex);
  makeAllPlays();
});

audioElement.addEventListener('timeupdate', () => {
  let currentSongTimeStamp = audioElement.currentTime;
  let minTimeStamp = Math.floor(currentSongTimeStamp / 60);
  let secTimeStamp = Math.floor(currentSongTimeStamp % 60);
  currentTimeStamp.innerText = `${minTimeStamp}:${
    secTimeStamp < 10 ? `0${secTimeStamp}` : `${secTimeStamp}`
  }`;
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;

  index = audioElement.src.slice(-5)[0];
  // console.log(songs[index - 1].duration);
  // console.log(currentTimeStamp.innerText);
  if (currentTimeStamp.innerText === songs[index - 1].duration) {
    playSong(+index);
  }
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
