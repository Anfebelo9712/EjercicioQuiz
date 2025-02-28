var map = L.map('map').setView([4.634358057862238, -74.06219052791752], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.pm.addControls({
    position:"topleft",
    drawCircle: false
})

let drawLayers = [];
let intersectionsLayers = [];

//Manejadores de eventos funciones que defino que se ejecuten para cuando haya un evento especifico
map.on("pm:create", function (e){
    let myLayer = e.layer;
    //si la capa es un poligono entonces agregarlo al arreglo drawLayers
    if (myLayer instanceof L.Polygon){
        //Agregar el objeto capa al arreglo
        drawLayers.push(myLayer);
        console.info("Haz creado un poligono")
    }
})


map.on("pm:remove", function (e){
    
    //L1|L2|L3 Layer muestras las que no se borran 
    drawLayers = drawLayers.filtrer((layer) => layer != e.layer);
    console.log("Haz borrado un poligono");
})


