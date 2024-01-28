document.addEventListener('DOMContentLoaded', setupWebcam);

async function setupWebcam() {
    const webcamElement = document.getElementById('webcam');
    const outputElement = document.getElementById('output');

    // Check if webcam access is available
    if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
        webcamElement.srcObject = stream;

        return new Promise((resolve) => {
            webcamElement.onloadedmetadata = () => {
                resolve();
            };
        });
    } else {
        console.error('Webcam access not available.');
    }
}

async function detectFace() {
    const webcamElement = document.getElementById('webcam');
    const outputElement = document.getElementById('output');

    const faceLandmarksDetection = await faceLandmarksDetection.load();

    const detectFaceInRealTime = async () => {
        const predictions = await faceLandmarksDetection.estimateFaces({ input: webcamElement });
        outputElement.width = webcamElement.width;
        outputElement.height = webcamElement.height;

        const ctx = outputElement.getContext('2d');
        ctx.clearRect(0, 0, outputElement.width, outputElement.height);

        predictions.forEach(prediction => {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            prediction.landmarks.forEach(landmark => {
                ctx.fillRect(landmark[0], landmark[1], 5, 5);
            });
            ctx.stroke();
        });

        requestAnimationFrame(detectFaceInRealTime);
    };

    detectFaceInRealTime();
}

function shareScreen() {
    
    alert('Share screen clicked!');
}

function endCall() {

   window.open("http://127.0.0.1:5500/after2.html");
}


setupWebcam().then(detectFace);