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

    var magnitude = feature.properties.mag;
    var markerColor;

    if (magnitude >= 5) {
        markerColor = 'red';
    } else if (magnitude >= 3) {
        markerColor = 'orange';
    } else if (magnitude >= 1) {
        markerColor = 'yellow';
    } else {
        markerColor = 'green';
    }

    return L.circleMarker(latlng, {
        radius: magnitude * 3 + 3,
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.7
    });
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

// add earthquake legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'legend');

    div.innerHTML =
        '<h4>Earthquake Magnitude</h4>' +
        '<p><span style="color:green;">●</span> Less than 1</p>' +
        '<p><span style="color:yellow;">●</span> 1 - 2.9</p>' +
        '<p><span style="color:orange;">●</span> 3 - 4.9</p>' +
        '<p><span style="color:red;">●</span> 5+</p>';

    return div;
};

legend.addTo(map);