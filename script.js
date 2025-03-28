/*const orientationText = document.getElementById('orientation');
const accelerationText = document.getElementById('acceleration');
const accelerationIncludingGravityText = document.getElementById('accelerationIncludingGravity');
const rotationRateText = document.getElementById('rotationRate');
const intervalText = document.getElementById('interval');*/

const absoluteOrientationSensorText = document.getElementById("absoluteOrientationSensor");
const relativeOrientationSensorText = document.getElementById("relativeOrientationSensor");
const accelerometerText = document.getElementById("accelerometer");
const linearAccelerationSensorText = document.getElementById("linearAccelerationSensor");
const gravitySensorText = document.getElementById("gravitySensor");
const gyroscopeText = document.getElementById("gyroscope");
const ambientLightSensorText = document.getElementById("ambientLightSensor");
const magnetometerText = document.getElementById("magnetometer");
const intervalText = document.getElementById("interval");

/*if (window.DeviceOrientationEvent) {
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
}*/

navigator.permissions.query({name: "accelerometer"}).then((result) => {
	if (result.state === "denied") {
		accelerometerText.innerHTML = "Permission to use Accelerometer sensor is denied.";
		return;
	}
});
navigator.permissions.query({name: "gyroscope"}).then((result) => {
	if (result.state === "denied") {
		gyroscopeText.innerHTML = "Permission to use Gyroscope sensor is denied.";
		return;
	}
});
navigator.permissions.query({name: "magnetometer"}).then((result) => {
	if (result.state === "denied") {
		magnetometerText.innerHTML = "Permission to use Magnetometer sensor is denied.";
		return;
	}
});
navigator.permissions.query({name: "ambient-light-sensor"}).then((result) => {
	if (result.state === "denied") {
		ambientLightSensorText.innerHTML = "Permission to use Ambient Light sensor is denied.";
		return;
	}
});

const frequency = 60;
const absoluteOrientationSensor = new AbsoluteOrientationSensor({frequency: frequency});
const relativeOrientationSensor = new RelativeOrientationSensor({frequency: frequency});
const accelerometer = new Accelerometer({frequency: frequency});
const linearAccelerationSensor = new LinearAccelerationSensor({frequency: frequency});
const gravitySensor = new GravitySensor({frequency: frequency});
const gyroscope = new Gyroscope({frequency: frequency});
const ambientLightSensor = new AmbientLightSensor({frequency: frequency});
const magnetometer = new Magnetometer({frequency: frequency});

absoluteOrientationSensor.start();
relativeOrientationSensor.start();
accelerometer.start();
linearAccelerationSensor.start();
gravitySensor.start();
gyroscope.start();
ambientLightSensor.start();
magnetometer.start();

absoluteOrientationSensor.onreading = () => {
	absoluteOrientationSensorText.innerHTML = `
		Absolute Orientation R: ${absoluteOrientationSensor.quaternion[0]}<br>
		Absolute Orientation I: ${absoluteOrientationSensor.quaternion[1]}<br>
		Absolute Orientation J: ${absoluteOrientationSensor.quaternion[2]}<br>
		Absolute Orientation K: ${absoluteOrientationSensor.quaternion[3]}
	`;
};
relativeOrientationSensor.onreading = () => {
	relativeOrientationSensorText.innerHTML = `
		Relative Orientation R: ${relativeOrientationSensor.quaternion[0]}<br>
		Relative Orientation I: ${relativeOrientationSensor.quaternion[1]}<br>
		Relative Orientation J: ${relativeOrientationSensor.quaternion[2]}<br>
		Relative Orientation K: ${relativeOrientationSensor.quaternion[3]}
	`;
};
accelerometer.onreading = () => {
	accelerometerText.innerHTML = `
		Accelerometer X: ${accelerometer.x}m/s²<br>
		Accelerometer Y: ${accelerometer.y}m/s²<br>
		Accelerometer Z: ${accelerometer.z}m/s²
	`;
};
linearAccelerationSensor.onreading = () => {
	linearAccelerationSensorText.innerHTML = `
		Linear Acceleration X: ${linearAccelerationSensor.x}m/s²<br>
		Linear Acceleration Y: ${linearAccelerationSensor.y}m/s²<br>
		Linear Acceleration Z: ${linearAccelerationSensor.z}m/s²
	`;
};
gravitySensor.onreading = () => {
	gravitySensorText.innerHTML = `
		Gravity X: ${gravitySensor.x}m/s²<br>
		Gravity Y: ${gravitySensor.y}m/s²<br>
		Gravity Z: ${gravitySensor.z}m/s²
	`;
};
gyroscope.onreading = () => {
	gyroscopeText.innerHTML = `
		Gyroscope X: ${gyroscope.x}°/s<br>
		Gyroscope Y: ${gyroscope.y}°/s<br>
		Gyroscope Z: ${gyroscope.z}°/s
	`;
};
ambientLightSensor.onreading = () => {
	ambientLightSensorText.innerHTML = `
		Ambient Light: ${ambientLightSensor.illuminance}lx
	`;
};
magnetometer.onreading = () => {
	magnetometerText.innerHTML = `
		Magnetic Field X: ${sensor.x}µT<br>
		Magnetic Field Y: ${sensor.y}µT<br>
		Magnetic Field Z: ${sensor.z}µT
	`;
};
intervalText.innerHTML = `Interval: ${absoluteOrientationSensor.timestamp}ms`;

absoluteOrientationSensor.onerror = event => {
	absoluteOrientationSensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
relativeOrientationSensor.onerror = event => {
	relativeOrientationSensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
accelerometer.onerror = event => {
	accelerationText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
linearAccelerationSensor.onerror = event => {
	linearAccelerationSensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
gravitySensor.onerror = event => {
	gravitySensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
gyroscope.onerror = event => {
	gyroscopeText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
ambientLightSensor.onerror = event => {
	ambientLightSensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
magnetometer.onerror = event => {
	magnetometerText.innerHTML = `${event.error.name}: ${event.error.message}`;
}