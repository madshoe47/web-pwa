self.onmessage = function (e) {
  console.log("Message received from main.js");
  console.log(e.data);
  doHardWork();
  self.postMessage("Message posted to main");
};

function doHardWork() {
  let start = Date.now();
  console.log("Blocking...");
  while (Date.now() < start + 3000) {}
  console.log("Unblocked!");
}
