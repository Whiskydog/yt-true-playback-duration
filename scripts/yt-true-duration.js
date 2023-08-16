const video = document.querySelector("video");
const durationSpan = document.querySelector(".ytp-time-duration").parentElement;
const trueDurationSpan = document.createElement("span");

function getTrueDurationString() {
  const trueDuration = video.duration / video.playbackRate;
  return durationToString(trueDuration);
}

function durationToString(duration) {
  let timeLeft = duration;
  const hours = Math.trunc(timeLeft / 3600);
  timeLeft %= 3600;
  const mins = Math.trunc(timeLeft / 60);
  timeLeft %= 60;
  const secs = Math.trunc(timeLeft);
  let str = "";
  if (hours) str += `${hours.toString().padStart(2, "0")}:`;
  str += `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

  return str;
}

function updateTrueDurationSpan() {
  trueDurationSpan.textContent =
    video.playbackRate === 1 ? "" : ` (${getTrueDurationString()})`;
}

video.onratechange = () => {
  updateTrueDurationSpan();
};

updateTrueDurationSpan();
durationSpan.appendChild(trueDurationSpan);
console.log("YT True Duration loaded!");
