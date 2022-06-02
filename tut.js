console.log("Welcome to spotify!!");

let songIndex = 1;
let audio = new Audio(`songs/${songIndex}.mp3`);
let progressBar = document.getElementById('progressBar');
let btn = document.getElementById('masterplay');
let songPercent = parseInt((audio.currentTime / audio.duration) * 100);
let maingif = document.getElementById('playgif');
let gifs = document.getElementsByClassName('songgif');
let allicons = document.getElementsByClassName('songicon');
let allsongs = document.getElementsByClassName('songItem');
let songnaam = document.getElementById('songnaam');
let nextbtn = document.getElementById('next');
let previousbtn = document.getElementById('previous');


let songs = [
    { songname: "Teri Deewani", cover: "images/icons-images/1.jpg" },
    { songname: "Saiyaan", cover: "images/icons-images/2.jpg" },
    { songname: "Mujhko Barsaat", cover: "images/icons-images/3.jpg" },
    { songname: "Kya Tujhe Ab", cover: "images/icons-images/4.jpg" },
    { songname: "O Re Piya", cover: "images/icons-images/5.jpg" },
]

Array.from(allsongs).forEach((eachSong, index) => {
    eachSong.querySelector('.cover').src = songs[index].cover;
    eachSong.querySelector('.songName').innerText = songs[index].songname;
})

// PROGRESS BAR
audio.addEventListener('timeupdate', () => {
    progressBar.value = parseInt((audio.currentTime / audio.duration) * 100);
})

progressBar.addEventListener('change', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
})

//Make all small gifs stop
const stopGifs = () => {
    Array.from(gifs).forEach(eachgif => {
        eachgif.style.opacity = 0;
    })
}

//Make all small icons gayab
const pauseIcons = () => {
    Array.from(allicons).forEach(eachicon => {
        eachicon.classList.add('fa-play-circle');
        eachicon.classList.remove('fa-pause-circle');
    })
}

//MASTERPLAY BUTTON
btn.addEventListener('click', () => {

    if (audio.duration == 0 || audio.paused) {
        btn.classList.remove('fa-play-circle');
        btn.classList.add('fa-pause-circle');
        audio.play();

        stopGifs();
        pauseIcons();
        maingif.style.opacity = 1;

        let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
        playedsongicon.classList.remove('fa-play-circle');
        playedsongicon.classList.add('fa-pause-circle');

        document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
        songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
    }
    else {
        btn.classList.add('fa-play-circle');
        btn.classList.remove('fa-pause-circle');
        audio.pause();

        maingif.style.opacity = 0;
        stopGifs();
        pauseIcons();
        document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
        songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
    }
})

// PLAYING NEXT SONG AUTOMATICALLY
if (audio.currentTime == audio.duration) {

    btn.classList.remove('fa-play-circle');
    btn.classList.add('fa-pause-circle');
    if (songIndex == songs.length) {
        songIndex = 1;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();

    }
    else {
        songIndex = songIndex + 1;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();
    }

    stopGifs();
    pauseIcons();
    let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
    playedsongicon.classList.remove('fa-play-circle');
    playedsongicon.classList.add('fa-pause-circle');

    document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
    songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
}

// NEXT BUTTON
nextbtn.addEventListener('click', () => {

    btn.classList.remove('fa-play-circle');
    btn.classList.add('fa-pause-circle');

    if (songIndex == songs.length) {
        songIndex = 1;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();
    }
    else {
        songIndex = songIndex + 1;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();
    }

    stopGifs();
    pauseIcons();
    let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
    playedsongicon.classList.remove('fa-play-circle');
    playedsongicon.classList.add('fa-pause-circle');

    document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
    songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
})

// PREVIOUS BUTTON
previousbtn.addEventListener('click', () => {
    btn.classList.remove('fa-play-circle');
    btn.classList.add('fa-pause-circle');

    if (songIndex == 1) {
        songIndex = songs.length;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();
    }
    else {
        songIndex = songIndex - 1;
        audio.src = `songs/${songIndex}.mp3`;
        audio.play();
    }

    stopGifs();
    pauseIcons();
    let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
    playedsongicon.classList.remove('fa-play-circle');
    playedsongicon.classList.add('fa-pause-circle');

    document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
    songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
})

// ASCESSING SONGS FROM LIST
Array.from(allicons).forEach(eachicon => {
    eachicon.addEventListener('click', () => {

        if (audio.played) {
            if (songIndex === eachicon.parentNode.parentNode.id) {
                audio.pause();
                stopGifs();
                pauseIcons();
                document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;

                btn.classList.add('fa-play-circle');
                btn.classList.remove('fa-pause-circle');
                maingif.style.opacity = 0;
            }
            else {
                songIndex = eachicon.parentNode.parentNode.id;
                console.log(songIndex);
                audio.src = `songs/${songIndex}.mp3`;
                audio.play();

                btn.classList.remove('fa-play-circle');
                btn.classList.add('fa-pause-circle');

                stopGifs();
                pauseIcons();

                maingif.style.opacity = 1;
                document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
                let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
                playedsongicon.classList.remove('fa-play-circle');
                playedsongicon.classList.add('fa-pause-circle');
            }
        }
        else {
            if (songIndex === eachicon.parentNode.parentNode.id){
                console.log(songIndex);

                audio.src = `songs/${songIndex}.mp3`;
                audio.play();
                stopGifs();
                pauseIcons();

                maingif.style.opacity = 1
                document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
                btn.classList.remove('fa-play-circle');
                btn.classList.add('fa-pause-circle');

                let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
                playedsongicon.classList.remove('fa-play-circle');
                playedsongicon.classList.add('fa-pause-circle');
            }
            else{
                songIndex = eachicon.parentNode.parentNode.id;
                console.log(songIndex);

                audio.src = `songs/${songIndex}.mp3`;
                audio.play();
                stopGifs();
                pauseIcons();

                maingif.style.opacity = 1
                document.getElementById(`${songIndex}`).querySelector('.songgif').style.opacity = 1;
                btn.classList.remove('fa-play-circle');
                btn.classList.add('fa-pause-circle');

                let playedsongicon = document.getElementById(`${songIndex}`).querySelector('.songicon');
                playedsongicon.classList.remove('fa-play-circle');
                playedsongicon.classList.add('fa-pause-circle');
            }
        }
        songnaam.innerText = `- ${songs[songIndex - 1].songname}`;
    })

})