let icon = document.querySelector('.fa-shuffle')
let curr_song = document.createElement('audio')

let playing = document.querySelector(".playing");
let song_art = document.querySelector(".song-art");
let song_name = document.querySelector(".song-name");
let play_btn = document.querySelector(".playpause-song");
let song_artist = document.querySelector(".song-artist");
let next_btn= document.querySelector(".next-song");
let prev_btn = document.querySelector(".previous-song");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total = document.querySelector(".total-time");

let song_no = 0;
let isPlaying = false;
let isRandom = false;
let updateTime;

const playlist = [
    {
        img: 'images/believer.jpg',
        name: 'Believer',
        artist: "Imagine Dragons",
        music: "music/Believer.mp3"
    },
    {
        img: 'images/ddp.jpg',
        name: 'Dil Dil Pakistan',
        artist: "Vital Signs",
        music: 'music/Dil Dil Pakistan.mp3'
    },
    {
        img: 'images/aadat.jpg',
        name: 'Aadat',
        artist: "Atif Aslam",
        music: 'music/Aadat.mp3'
    },
];

loadSong(song_no);

function loadSong(song_no){
    clearInterval(updateTime);
    reset();
    curr_song.src = playlist[song_no].music;
    curr_song.load();

    song_art.style.backgroundImage = "url(" + playlist[song_no].img +  ")";
    song_name.textContent =  playlist[song_no].name;
    song_artist.textContent =  playlist[song_no].artist;
    playing.textContent = "Song " + (song_no + 1) + " of " + playlist.length;
    updateTime = setInterval(setTime, 1000);
    curr_song.addEventListener("ended", nextSong);
}

function reset(){
    curr_time.textContent = "00:00";
    total.textContent = "00:00";
    seek_slider.value = 0;
}

function randomSong(){
    if(isRandom){
        pauseRandom();
    }
    else{
        playRandom();
    }
}

function playRandom(){
    isRandom = true;
    icon.classList.add("randomOn");
    nextSong();
}

function pauseRandom(){
    nextSong();
    isRandom = false;
    icon.classList.remove('randomOn');
    
}
function replaySong(){
    let current_no = song_no;
    loadSong(current_no);
    playSong();
}
function playpauseSong(){
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
}

function playSong(){
    curr_song.play();
    isPlaying = true;
    play_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseSong(){
    curr_song.pause();
    isPlaying = false;
    play_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextSong(){
    if(song_no < playlist.length - 1 && isRandom === false){
        song_no += 1;
    }
    else if(song_no < playlist.length - 1 && isRandom === true){
        let random_no = Number.parseInt(Math.random() * playlist.length);
        song_no = random_no;
    }else{
        song_no = 0;
    }
    loadSong(song_no);
    playSong();
}

function prevSong(){
    if(song_no > 0){
        song_no -= 1;
    }else{
        song_no = playlist.length -1;
    }
    loadSong(song_no);
    playSong();
}

function setSeek(){
    let seekto = curr_song.duration * (seek_slider.value/100);
    curr_song.currentTime = seekto;
}

function setVolume(){
    curr_song.volume = volume_slider.value / 100;
}

function setTime(){
    let slider_position = 0;
    if(!isNaN(curr_song.duration)){
        slider_position = curr_song.currentTime * (100 / curr_song.duration);
        seek_slider.value = slider_position;

        let playedMinutes = Math.floor(curr_song.currentTime / 60);
        let playedSeconds = Math.floor(curr_song.currentTime - playedMinutes * 60);
        let totalMinutes = Math.floor(curr_song.duration / 60);
        let totalSeconds = Math.floor(curr_song.duration - totalMinutes * 60);

        if(playedSeconds < 10) {
            playedSeconds = "0" + playedSeconds; 
        }
        if(totalSeconds < 10) {
             totalSeconds = "0" + totalSeconds;
             }
        if(playedMinutes < 10) {
            playedMinutes = "0" + playedMinutes;
         }
        if(totalMinutes < 10) { 
            totalMinutes = "0" + totalMinutes; 
        }

        curr_time.textContent = playedMinutes + ":" + playedSeconds;
        total.textContent = totalMinutes + ":" + totalSeconds;
    }
}

