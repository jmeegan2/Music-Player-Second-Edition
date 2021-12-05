let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  
  
  {
    
    name: "NIGHTLAPSE Mix",
    artist: "Astral",
    image: "img/nightlapse-new-2.jpg",
    path: "music/NIGHTLAPSE.mp3",
  },
  {
    name: "Space Trip Mix",
    artist: "Artur",
    image: "img/1They-Live.png" ,
    path: "music/SpaceTripMix.mp3"
  },
  {
    name: "Dark Side Mix",
    artist: "The 80's Guy",
    image: "img/DarkSide.jpg",
    path: "music/Dark-Side-mix.mp3",
  },
  {
    name: "DEPARTURE Mix",
    artist: "Artur",
    image: "img/Departure.jpg",
    path: "music/Departure.mp3",
  },
  {
    name: "Gymnopedie No.1",
    artist: "Erik Satie",
    image: "img/ErikSatieFormatted.jpg",
    path: "music/Gymnopedie.mp3",
  },
  {
    name: "BTS lofi playlist",
    artist: "Unknown Artist",
    image: "img/bts-lofi.jpg",
    path: "music/bts lofi playlist - smyang.mp3",
  },
  {
    name: "Progressive Mix",
    artist: "Unknown Artist",
    image: "img/progressive-mix-pic.jpg",
    path: "music/Progressive Mix III.mp3",
  },
  {
    name: "Hate It When You Leave",
    artist: "Keith Richards",
    image: "img/keith-richards-crazy.jpg",
    path: "music/Hate It When You Leave.mp3",
  },
  {
    name: "Calm Piano",
    artist: "Unknown",
    image: "img/piano-beige.jpg",
    path: "music/calm-piano.mp3",
  },
];
// function random_bg_color() {

//   // Get a number between 64 to 256 (for getting lighter colors)
//   let red = Math.floor(Math.random() * 256) + 64;
//   let green = Math.floor(Math.random() * 256) + 64;
//   let blue = Math.floor(Math.random() * 256) + 64;

//   // Construct a color withe the given values
//   let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

//   // Set the background to that color
//   document.body.style.background = bgColor;
// }

function loadTrack(track_index) {
  
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  // now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  // random_bg_color();
  }


function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


function play() {
  var audio = document.getElementById("audio");
  audio.play();
}
// this will cause new song to play
// var audio = new audio("music/Gymnopedie.mp3");

// document.onclick = function() {
//   audio.play();
// }
// if (value=5){
//     clearInterval(updateTimer);
//     resetValues();
//     curr_track.src = track_list[track_index].path;
//     curr_track.load();
//     var audio = new song("music/Gymnopedie.mp3");
//     audio.play();
//     track_art.style.backgroundImage = "img/ErikSatieFormatted.jpg";
//     track_name.textContent = "Gymnopedie No.1";
//     track_artist.textContent = "Erik";
//     // now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  
//     updateTimer = setInterval(seekUpdate, 1000);
//     curr_track.addEventListener("ended", nextTrack);
//     // random_bg_color();
//   }
//   else{