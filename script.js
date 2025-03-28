const orientationText = document.getElementById('orientation');
const accelerationText = document.getElementById('acceleration');
const accelerationIncludingGravityText = document.getElementById('accelerationIncludingGravity');
const rotationRateText = document.getElementById('rotationRate');
const intervalText = document.getElementById('interval');

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", (event) => {
		orientationText.innerHTML = `
			Orientation Alpha: ${event.alpha}°<br>
			Orientation Beta: ${event.beta}°<br>
			Orientation Gamma: ${event.gamma}°
		`;
	}, true);
}
else {
	orientationText.innerHTML = "Device Orientation API not supported.";
}

if (window.DeviceMotionEvent) {
	window.addEventListener("devicemotion", (event) => {
		accelerationText.innerHTML = `
			Acceleration X: ${event.acceleration.x}m/s²<br>
			Acceleration Y: ${event.acceleration.y}m/s²<br>
			Acceleration Z: ${event.acceleration.z}m/s²
		`;

		accelerationIncludingGravityText.innerHTML = `
			Acceleration X: ${event.accelerationIncludingGravity.x}m/s²<br>
			Acceleration Y: ${event.accelerationIncludingGravity.y}m/s²<br>
			Acceleration Z: ${event.accelerationIncludingGravity.z}m/s²
		`;

		rotationRateText.innerHTML = `
			Rotation Rate Alpha: ${event.rotationRate.alpha}°/s<br>
			Rotation Rate Beta: ${event.rotationRate.beta}°/s<br>
			Rotation Rate Gamma: ${event.rotationRate.gamma}°/s
		`;

		intervalText.innerHTML = `Interval: ${event.interval}ms`;
	}, true);
}
else {
	accelerationText.innerHTML = "Device Motion API not supported.";
	accelerationIncludingGravityText.innerHTML = "";
	rotationRateText.innerHTML = "";
	intervalText.innerHTML = "";
}

const magnetometerText = document.getElementById('magnetometer');
navigator.permissions.query({name: "magnetometer"}).then((result) => {
	if (result.state === "denied") {
		magnetometerText.innerHTML = "Permission to use magnetometer sensor is denied.";
		return;
	}

	const sensor = new Magnetometer();
	sensor.start();

	sensor.onreading = () => {
		magnetometerText.innerHTML = `
			Magnetic Field X: ${sensor.x}µT<br>
			Magnetic Field Y: ${sensor.y}µT<br>
			Magnetic Field Z: ${sensor.z}µT
		`;
	};

	sensor.onerror = event => {
		magnetometerText.innerHTML = `${event.error.name}: ${event.error.message}`;
	}
});