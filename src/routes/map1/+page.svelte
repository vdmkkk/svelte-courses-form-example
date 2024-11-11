<script lang="ts">
	import { Map, TileLayer, Popup, Polygon, Marker, Icon, Circle, Polyline } from "sveaflet";
	import { onMount } from "svelte";
	import axios from "axios";

	let points: number[][];
	const colors = ["white", "black", "red", "blue", "yellow", "green", "brown", "gray"];

	async function getGeoData() {
		return await axios
			.get("http://95.84.137.217:6900/get_geo")
			.then(res => {
				points = res.data;
			})
			.catch(e => {
				console.error("Error while fetching geodata: " + e);
			});
	}

	onMount(() => {
		getGeoData();
	});

	function findConvexHull(points) {
		if (points.length < 3) return points;

		// Функция для сортировки точек по полярному углу
		function polarAngle(p0, p1) {
			return Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
		}

		// Функция для определения поворота: > 0 - против часовой стрелки, < 0 - по часовой
		function cross(o, a, b) {
			return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
		}

		// Находим самую нижнюю точку (или самую левую в случае равенства)
		let start = points.reduce((acc, point) =>
			point[1] < acc[1] || (point[1] === acc[1] && point[0] < acc[0]) ? point : acc
		);

		// Сортируем точки по полярному углу относительно стартовой точки
		points.sort((a, b) => polarAngle(start, a) - polarAngle(start, b));

		const hull = [start];

		for (let i = 1; i < points.length; i++) {
			let top = hull.pop();

			while (hull.length > 0 && cross(hull[hull.length - 1], top, points[i]) <= 0) {
				top = hull.pop();
			}

			hull.push(top);
			hull.push(points[i]);
		}

		return hull;
	}

	$: {
		if (points) console.log(findConvexHull(points));
	}
</script>

<div style="width:100%;height:100vh;">
	<Map
		options={{
			center: [55.728469, 37.609218],
			zoom: 13
		}}
	>
		<TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
		{#each points as point, index}
			<Marker latLng={point} />
		{/each}
		<Polygon latLngs={findConvexHull(points)} />
	</Map>
</div>
