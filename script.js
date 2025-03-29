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
const magnetometerText = document.getElementById("magnetometer");
const ambientLightSensorText = document.getElementById("ambientLightSensor");
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
const magnetometer = new Magnetometer({frequency: frequency});
const ambientLightSensor = new AmbientLightSensor({frequency: frequency});

absoluteOrientationSensor.start();
relativeOrientationSensor.start();
accelerometer.start();
linearAccelerationSensor.start();
gravitySensor.start();
gyroscope.start();
magnetometer.start();
ambientLightSensor.start();

const conversionUnit = 180 / Math.PI;

absoluteOrientationSensor.onreading = () => {
	const euler = QuatToEuler(absoluteOrientationSensor.quaternion[0], absoluteOrientationSensor.quaternion[1], absoluteOrientationSensor.quaternion[2], absoluteOrientationSensor.quaternion[3]);
	absoluteOrientationSensorText.innerHTML = `
		Absolute Orientation X: ${euler[0] * conversionUnit + 2.0*Math.PI}°<br>
		Absolute Orientation Y: ${euler[1] * conversionUnit + 2.0*Math.PI}°<br>
		Absolute Orientation Z: ${euler[2] * conversionUnit + 2.0*Math.PI}°
	`;
};
relativeOrientationSensor.onreading = () => {
	const euler = QuatToEuler(absoluteOrientationSensor.quaternion[0], absoluteOrientationSensor.quaternion[1], absoluteOrientationSensor.quaternion[2], absoluteOrientationSensor.quaternion[3]);
	relativeOrientationSensorText.innerHTML = `
		Relative Orientation X: ${euler[0] * conversionUnit + 2.0*Math.PI}°<br>
		Relative Orientation Y: ${euler[1] * conversionUnit + 2.0*Math.PI}°<br>
		Relative Orientation Z: ${euler[2] * conversionUnit + 2.0*Math.PI}°
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
		Gyroscope X: ${gyroscope.x * conversionUnit}°/s<br>
		Gyroscope Y: ${gyroscope.y * conversionUnit}°/s<br>
		Gyroscope Z: ${gyroscope.z * conversionUnit}°/s
	`;
};
magnetometer.onreading = () => {
	magnetometerText.innerHTML = `
		Magnetic Field X: ${magnetometer.x}µT<br>
		Magnetic Field Y: ${magnetometer.y}µT<br>
		Magnetic Field Z: ${magnetometer.z}µT
	`;
};
ambientLightSensor.onreading = () => {
	ambientLightSensorText.innerHTML = `
		Ambient Light: ${ambientLightSensor.illuminance}lx
	`;
};
intervalText.innerHTML = `Interval: ${Math.floor(1000/frequency)}ms`;

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
magnetometer.onerror = event => {
	magnetometerText.innerHTML = `${event.error.name}: ${event.error.message}`;
}
ambientLightSensor.onerror = event => {
	ambientLightSensorText.innerHTML = `${event.error.name}: ${event.error.message}`;
}

// this implementation assumes normalized quaternion
// converts to Euler angles in 3-2-1 sequence
function QuatToEuler(x, y, z, w) {
	const euler = [0, 0, 0];

    // roll (x-axis rotation)
    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    euler[0] = Math.atan2(sinr_cosp, cosr_cosp);

    // pitch (y-axis rotation)
    const sinp = Math.sqrt(1 + 2 * (w * y - x * z));
    const cosp = Math.sqrt(1 - 2 * (w * y - x * z));
    euler[1] = 2 * Math.atan2(sinp, cosp) - Math.PI / 2;

    // yaw (z-axis rotation)
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    euler[2] = Math.atan2(siny_cosp, cosy_cosp);

    return euler;
}