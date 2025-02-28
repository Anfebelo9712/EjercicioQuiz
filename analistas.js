function detectCentroids(){

    //refcorrer el arreglo drawlayers
    drawLayers.forEach(
        function(layer){

            try{

                let centroid = turf.centroid(layer.toGeoJSON());
                L.geoJSON(centroid,{
                    style: {
                        color: "red",
                        fillColor: "green"
                    }
                }).addTo(map);
                console.log(centroid);
            }catch(error){  
                console.warn("Error al detectar",error)

            }
        }
    )
}

function calculateAreas(){  

    drawLayers.forEach(
        function(layer){
            try {
                let area = turf.area(layer.toGeoJSON());
                
                let centroid = turf.centroid(layer.toGeoJSON());
                x = centroid.geometry.coordinates[1];
                y = centroid.geometry.coordinates[0];
                L.marker ([x,y],{
                    icon: L.divIcon(
                        {
                            className:"area_label",
                            html: `${area}m2`

                        }
                    )
                }    
                ).addTo(map); 
                console.log(area);
                
            } catch (error) {
                console.warn("Hubo un error al calcular el área")
                
            }
        }
    )

}

function calculateDistanceCentroids() {
    if (drawLayers && drawLayers.length > 0) { //verificar que hayan más de dos geometrias
        let centroides = [];

        drawLayers.forEach((layer, index) => {
            // Convierte la capa de Leaflet a GeoJSON
            let geojson = layer.toGeoJSON();

            if (geojson.geometry && geojson.geometry.type === "Polygon") {
                let centroide = turf.centroid(geojson);
                centroides.push(centroide);
            } else {
                console.warn(`El objeto ${index + 1} no es un polígono válido.`);
            }
        });

        // Si hay al menos dos centroides, calcular distancias siguiendo la lógica dada en clase
        if (centroides.length > 1) {
            for (let i = 0; i < centroides.length; i++) {
                let centroide1 = centroides[i];
                let centroide2 = (i === centroides.length - 1) ? centroides[0] : centroides[i + 1]; // El último con el primero

                let distancia = turf.distance(centroide1, centroide2, { units: 'kilometers' });

                console.log(`Distancia entre el centroide ${i + 1} y el centroide ${(i === centroides.length - 1) ? 1 : i + 2}: ${distancia.toFixed(2)} km`); //arreglamos la salida en dos decimales, el ultimo con el primero 

                // Agregar marcadores en el mapa de cada centroide dibujado 
                L.marker(centroide1.geometry.coordinates.reverse())
                  .bindPopup(`Centroide ${i + 1}`)
                  .addTo(map);

                L.marker(centroide2.geometry.coordinates.reverse())
                  .bindPopup(`Centroide ${(i === centroides.length - 1) ? 1 : i + 2}`)
                  .addTo(map);
            }
        } else {
            console.warn("No hay suficientes centroides para calcular distancias.");
        }
    } else {
        console.warn("No se encontraron objetos en drawLayers.");
    }
}
