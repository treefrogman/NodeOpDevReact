export default function useCorrectedDevicePixelRatio() {
	const retinaMultiplier = Math.round(devicePixelRatio / (window.outerWidth / window.innerWidth));
	return devicePixelRatio / retinaMultiplier;
}
