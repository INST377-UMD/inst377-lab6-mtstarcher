
function Map() {
    var map = L.map('map').setView([40, -100], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function getLocality(latitude, longitude, marker) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById(marker).innerText = `Marker: Latitude: ${latitude}, Longitude: ${longitude}`;
            document.getElementById(marker.replace('marker', 'locality')).innerText = `Locality: ${data.locality || 'Not available'}`;
        });
}

function addMarker(map, latitude, longitude, markerName) {
    L.marker([latitude, longitude]).addTo(map);
    getLocality(latitude, longitude, markerName);
}

function createMap() {
    const map = Map();
    const markers = ['markerOne', 'markerTwo', 'markerThree'];

    for (let i = 0; i < markers.length; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);

        addMarker(map, latitude, longitude, markers[i]);
    }
}

window.onload = createMap;

