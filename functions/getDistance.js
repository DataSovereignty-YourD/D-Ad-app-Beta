function getDistance(center, point) {
	const R = 6371e3;
	const [lat0, lon0] = center;
	const [lat, lon] = point;

	const latDiff = (lat - lat0) * (Math.PI / 180); // 위도 차이 라디안
	const lonDiff = (lon - lon0) * (Math.PI / 180); // 경도 차이 라디안

	const a =
		Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
		Math.cos(lat0 * (Math.PI / 180)) *
			Math.cos(lat * (Math.PI / 180)) *
			Math.sin(lonDiff / 2) *
			Math.sin(lonDiff / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c ; // 거리를 미터 단위로 계산

	return parseInt(distance);
}

export default getDistance