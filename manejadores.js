let centroides = document.getElementById("centroid");
centroides.addEventListener('click', function (){
    console.log("Vamos a calcular los centroides...");
    detectCentroids();
})

let areas = document.getElementById("areas");

areas.addEventListener('click',
    function(){
        console.log("Vamos  a calcuular areas");
        calculateAreas();
    }
)

let centroidDistance = document.getElementById("centroid_distance");
centroid_distance.addEventListener('click',
    function(){
        console.log("Vamos a calcular distancia entre los centroides");
        calculateDistanceCentroids();
    }
)
    