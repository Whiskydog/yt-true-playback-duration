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

function getTrueDurationString(video) {
  const trueDuration = video.duration / video.playbackRate;
  return durationToString(trueDuration);
}

function updateTrueDuration(video, trueDuration) {
  trueDuration.textContent =
    video.playbackRate === 1 ? "" : ` (${getTrueDurationString(video)})`;
  console.log("[YT True Duration] True duration updated!");
}

console.log("[YT True Duration] Loaded!");
document.addEventListener("yt-navigate-finish", () => {
  if (document.querySelector("#ytp-true-duration")) return;

  let video = document.querySelector("video");
  let trueDuration = document.createElement("span");

  video.onratechange = () => {
    updateTrueDuration(video, trueDuration);
  };
  video.onloadedmetadata = () => {
    updateTrueDuration(video, trueDuration);
  };

  let timeDisplay = document.querySelector(".ytp-time-duration").parentElement;
  trueDuration.id = "ytp-true-duration";
  trueDuration.className = "ytp-time-duration";
  timeDisplay.appendChild(trueDuration);
  console.log("[YT True Duration] True duration element appended!");
});
