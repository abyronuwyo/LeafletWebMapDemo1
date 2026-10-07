// create map
var map = L.map('map').setView([38, -95], 4);

// add basemap
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17
}).addTo(map);


// create weather and earthquake layers
var weather = L.layerGroup().addTo(map);
var earthquakes = L.layerGroup().addTo(map);


// add weather alerts
$.getJSON('https://api.weather.gov/alerts/active?region_type=land', function(data) {

    L.geoJSON(data, {

        style: function(feature) {
            var color = 'orange';

            if (feature.properties.severity === 'Severe') color = 'red';
            if (feature.properties.severity === 'Extreme') color = 'purple';

            return {color: color};
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.headline);
        }

    }).addTo(weather);

});


// add earthquakes
$.getJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(data) {

    L.geoJSON(data, {

        pointToLayer: function(feature, latlng) {

            var mag = feature.properties.mag;

            return L.circleMarker(latlng, {
                radius: mag * 3 + 3
            });
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                'Magnitude: ' + feature.properties.mag +
                '<br>Location: ' + feature.properties.place
            );
        }

    }).addTo(earthquakes);

});


// add layer control
L.control.layers(null, {
    'Weather Alerts': weather,
    'Earthquakes': earthquakes
}).addTo(map);