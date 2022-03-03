function doHardWork() {
  let start = Date.now();
  console.log("Blocking...");
  while (Date.now() < start + 3000) {}
  console.log("Unblocked!");
}

self.addEventListener("message", doHardWork);
