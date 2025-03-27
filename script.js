const text = document.getElementsByTagName('p')[0];

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", (event) => {
		console.log(`Alpha: ${event.alpha}, Beta: ${event.beta}, Gamma: ${event.gamma}`);
		text.innerHTML = `Alpha: ${event.alpha}, Beta: ${event.beta}, Gamma: ${event.gamma}`;
	}, true);
}
else {
	text.innerHTML = "Device Orientation API not supported.";
}