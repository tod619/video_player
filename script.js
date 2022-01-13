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
let lastVolume = 1

// Update sound on volume bar click
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    // Rounding volume up or down
    if(volume < 0.1) {
        volume = 0
    }

    if(volume > 0.9) {
        volume = 1
    }

    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    //console.log(volume)

    // Change icon depeneding on volume
    volumeIcon.className = ''
    if(volume > 0.7) {
        volumeIcon.classList.add('fas','fa-volume-up')
    }else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas','fa-volume-down')
    }else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }

    lastVolume = volume
} 

// Mute/Unmute volume
function toggleMute() {
    if(video.volume) {
        lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`
    }
}

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

// Change the volume using volume slider
volumeRange.addEventListener('click', changeVolume)

// Mute/unmute by clicking on volume icon
volumeIcon.addEventListener('click', toggleMute)