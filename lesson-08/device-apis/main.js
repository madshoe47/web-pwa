for (const button of document.querySelectorAll("button[id]")) {
  button.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        let positionLatitude = position.coords.latitude;
        let positionLongitude = position.coords.longitude;
        console.log(positionLatitude + ", " + positionLongitude);

        document.getElementById(
          "geolocation"
        ).innerHTML = `${positionLatitude}, ${positionLongitude}`;
      });
    } else {
      /* geolocation IS NOT available */
      console.log("Geolocatation isn't available");
    }
  });
}

if (navigator.onLine) {
  console.log("online");
  document.getElementById("network-status").innerHTML = "Device is online";
} else {
  console.log("offline");
  document.getElementById("network-status").innerHTML = "Device is offline";
}

navigator.clipboard.writeText("<empty clipboard>").then(
  function () {
    /* clipboard successfully set */
  },
  function () {
    /* clipboard write failed */
  }
);
