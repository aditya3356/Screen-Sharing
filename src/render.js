const videoElement = document.querySelector('video');

// Button
const videoSelectBtn = document.getElementById('videoSelectBtn');

let stream = null;
videoSelectBtn.onclick = getVideoSources;

const { desktopCapturer } = require('electron');

// Get the available video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['screen']
    });

    // console.log(inputSources);

    selectSource(inputSources[0]);
}

// Change the videoSource window to record
async function selectSource(source) {
    videoSelectBtn.innerText = "Stop Sharing";

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    stream = await navigator.mediaDevices
        .getUserMedia(constraints);

    //Preview the source in a video element
    videoElement.srcObject = stream;
    videoElement.play();
    videoSelectBtn.onclick = stopShare;
}

function stopShare() {
    videoSelectBtn.innerText = "Share Screen";
    videoElement.srcObject = null;
    stream = null;
    videoSelectBtn.onclick = getVideoSources;
}