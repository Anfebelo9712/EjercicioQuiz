var map = L.map('map').setView([4.634358057862238, -74.06219052791752], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.pm.addControls({
    position: "topleft",
    drawCircle: false
});

let drawLayers = [];
let intersectionsLayers = [];

// Agregar un polígono más grande al cargar el mapa
let largePolygon = L.polygon([
    [4.6375, -74.0650],  
    [4.6375, -74.0590],  
    [4.6312, -74.0590],  
    [4.6312, -74.0650]   
], {
    color: 'red',  
    fillColor: 'orange',  
    fillOpacity: 0.5
}).addTo(map);

drawLayers.push(largePolygon);

// 🔍 Cargar datos GeoJSON de los árboles en Chapinero
fetch('arbolado_chapinero.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ GeoJSON cargado correctamente:", data);  // Verificar en consola

        let arbolesLayer = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,  // Ajustar tamaño de los puntos
                    color: 'green',
                    fillColor: 'lightgreen',
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    layer.bindPopup(`
                        <b>Árbol:</b> ${feature.properties.Nombre_Esp || "Desconocido"}<br>
                        <b>Altura:</b> ${feature.properties.Altura_Total ? feature.properties.Altura_Total + " m" : "N/A"}
                    `);
                }
            }
        }).addTo(map);

        console.log("🌳 Capa de árboles añadida al mapa:", arbolesLayer);
    })
    .catch(error => console.error('❌ Error cargando el GeoJSON:', error));

// Evento para detectar la creación de polígonos por el usuario
map.on("pm:create", function (e) {
    let myLayer = e.layer;
    if (myLayer instanceof L.Polygon) {
        drawLayers.push(myLayer);
        console.info("Has creado un polígono");
    }
});

// Evento para detectar la eliminación de polígonos
map.on("pm:remove", function (e) {
    drawLayers = drawLayers.filter((layer) => layer !== e.layer);
    console.log("Has borrado un polígono");
});
