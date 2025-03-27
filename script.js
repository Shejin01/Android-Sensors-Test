const orientationText = document.getElementById('orientationText');
const motionText = document.getElementById('motionText');

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", (event) => {
		console.log(`Alpha: ${event.alpha}\n Beta: ${event.beta}\n Gamma: ${event.gamma}`);
		orientationText.innerHTML = `Alpha: ${event.alpha}\n Beta: ${event.beta}\n Gamma: ${event.gamma}`;
	}, true);
}
else {
	orientationText.innerHTML = "Device Orientation API not supported.";
}

if (window.DeviceMotionEvent) {
	window.addEvenetListener("devicemotion", (event) => {
		console.log(`Acceleration X: ${event.x}\n Acceleration Y: ${event.y}\n Acceleration Z: ${event.z}`);
		motionText.innerHTML = `Acceleration X: ${event.x}\n Acceleration Y: ${event.y}\n Acceleration Z: ${event.z}`;
	}, true);
}
else {
	motionText.innerHTML = "Device Motion API not supported.";
}