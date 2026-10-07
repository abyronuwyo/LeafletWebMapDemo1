var map = L.map('earthquakemap').setView([38, -95], 4);

var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var basemap = L.tileLayer(basemapUrl, {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);