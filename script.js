const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')

// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
}

function togglePlay() {
    if(video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title','Pause')
    } else {
        video.pause()
        showPlayIcon()
    }
}

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}` 
}

// Update progress bar as the video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`
    duration.textContent = `${displayTime(video.duration)}`
}

// Allow user to seek a certain part of the video by clicking on the progress bar
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth
    //console.log(newTime)
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}


// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// EventListners

// On playBtn click
playBtn.addEventListener('click',togglePlay)
video.addEventListener('click',togglePlay)

// On video end show play Icon
video.addEventListener('ended',showPlayIcon)

// Update progress bar
video.addEventListener('timeupdate',updateProgress)
video.addEventListener('canplay', updateProgress)

// Seek using the progress bar
progressRange.addEventListener('click', setProgress)