let centroides = document.getElementById("Arboles");
centroides.addEventListener('click', function (){
    console.log("Vamos a calcular los centroides...");
    detectCentroids();
})

let areas = document.getElementById("distance");

areas.addEventListener('click',
    function(){
        console.log("Vamos  a calcuular areas");
        calculateAreas();
    }
)


    