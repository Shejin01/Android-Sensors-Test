const orientationText = document.getElementById('orientationText');
const accelerationText = document.getElementById('accelerationText');
const accelerationIncludingGravityText = document.getElementById('accelerationIncludingGravityText');
const rotationRateText = document.getElementById('rotationRateText');
const intervalText = document.getElementById('intervalText');

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", (event) => {
		orientationText.innerHTML = `Orientation Alpha: ${event.alpha}°\n Orientation Beta: ${event.beta}°\n Orientation Gamma: ${event.gamma}°`;
	}, true);
}
else {
	orientationText.innerHTML = "Device Orientation API not supported.";
}

if (window.DeviceMotionEvent) {
	window.addEventListener("devicemotion", (event) => {
		accelerationText.innerHTML = `Acceleration X: ${event.acceleration.x}m/s²\n Acceleration Y: ${event.acceleration.y}m/s²\n Acceleration Z: ${event.acceleration.z}m/s²`;

		accelerationIncludingGravityText.innerHTML = `Acceleration X: ${event.accelerationIncludingGravity.x}m/s²\n Acceleration Y: ${event.accelerationIncludingGravity.y}m/s²\n Acceleration Z: ${event.accelerationIncludingGravity.z}m/s²`;

		rotationRateText.innerHTML = `Rotation Rate Alpha: ${event.rotationRate.alpha}°/s\n Rotation Rate Beta: ${event.rotationRate.beta}°/s\n Rotation Rate Gamma: ${event.rotationRate.gamma}°/s`;

		intervalText.innerHTML = `Interval: ${event.interval}ms`;
	}, true);
}
else {
	accelerationText.innerHTML = "Device Motion API not supported.";
	accelerationIncludingGravityText.innerHTML = "";
	rotationRateText.innerHTML = "";
	intervalText.innerHTML = "";
}