var map = L.map('earthquakemap').setView([38, -95], 4);

var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var basemap = L.tileLayer(basemapUrl, {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// add earthquake data
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

$.getJSON(earthquakeUrl, function(data) {

    L.geoJSON(data, {

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                'Magnitude: ' + feature.properties.mag +
                '<br>Location: ' + feature.properties.place +
                '<br>Time: ' + new Date(feature.properties.time).toLocaleString()
            );
        }

    }).addTo(map);

});