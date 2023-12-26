let utterance;
let paused = false;

document.getElementById('stopButton').addEventListener('click', function () {
  window.speechSynthesis.cancel();
  document.getElementById('status').innerText = '[ Stopped ]';
  utterance = null; // Reset utterance
  paused = false;
});

document.getElementById('pauseButton').addEventListener('click', function () {
  window.speechSynthesis.pause();
  document.getElementById('status').innerText = '[ Pause ]';
  paused = true;
});

document.getElementById('resumeButton').addEventListener('click', function () {
  if (paused && utterance) {
    window.speechSynthesis.resume();
    document.getElementById('status').innerText = '[ Resumed ]';
  } else {
    // Check if utterance is already set; if not, create a new one
    if (!utterance) {
      utterance = new SpeechSynthesisUtterance(utterance);
    }
    window.speechSynthesis.speak(utterance);
    document.getElementById('status').innerText = '[ Nothing To Resume ]';
  }
  paused = false;
});
