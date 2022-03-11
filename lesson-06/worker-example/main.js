var myWorker = new Worker("worker.js");

const hardWorkButton = document.querySelector("#worker");
const clickButton = document.querySelector("#clicky");

function sendMessage() {
  myWorker.postMessage("Dette er en besked (e.data) beskeden");
}

let clickCount = 0;
function handleButtonClick(event) {
  clickCount++;
  event.target.innerText = `Clicked ${clickCount} times`;
}

clickButton.addEventListener("click", handleButtonClick);
hardWorkButton.addEventListener("click", sendMessage());

myWorker.onmessage = function (e) {
  result = e.data;
  console.log("Message received from worker");
};
