<script>
	import { Map, TileLayer, Polygon, Popup } from "sveaflet";
</script>

<div style="width: 100%;height: 100vh; padding: 0; margin: 0">
	<Map options={{ center: [55.728469, 37.609218], zoom: 13 }}>
		<TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
		<Polygon
			latLngs={[
				[55.727666, 37.608868],
				[55.728817, 37.607061],
				[55.72928, 37.608495],
				[55.728436, 37.610713]
			]}
			><Popup options={{ content: "Popup in Polygon." }} />
		</Polygon>
	</Map>
</div>
