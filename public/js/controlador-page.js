
//Creación de la información -----------
var totMeses=[];
var myChart = "";
var categorias = [];
categorias.push(
{
    nombreCategoria:'Ropa',
    id:1, 
    productos:[
        {
        nombreProducto:'Jeans',
        id:1,        
        marcas:[
            {
            nombreMarca: 'Tommy',
            id:1,
            ventas:[{
                enero:1500,
                febrero:1800,
                marzo:2000,
                abril:4000
            }]
        }, 
            {
            nombreMarca: 'D&G',
            id:2,
            ventas:[{
                enero:1100,
                febrero:800,
                marzo:900,
                abril:300
            }]
        }
    ]
    },
    {
        nombreProducto:'Shirts',
        id:2,        
        marcas:[
            {
                nombreMarca: 'Nike', 
                id:3,
                ventas:[{
                    enero:550,
                    febrero:660,
                    marzo:840,
                    abril:1230
                }]
            }, 
            {
                nombreMarca: 'Puma', 
                id:4,
                ventas:[{
                    enero:1473,
                    febrero:1852,
                    marzo:2500,
                    abril:2363
                }]
            }
        ]  
    }
    ]
},
{
    nombreCategoria:'Comida', 
    id:2,
    productos:[
        {
        nombreProducto:'Hamburguesas',
        id:3,        
        marcas:[
            {
                nombreMarca: 'Burguer Chiken', 
                id:5,
                ventas:[{
                    enero:335,
                    febrero:855,
                    marzo:900,
                    abril:999
                }]
            }, 
            {
                nombreMarca: 'Burger Bacon', 
                id:6,
                ventas:[{
                    enero:840,
                    febrero:501,
                    marzo:2000,
                    abril:1574
                }]
            }
        ]
    },
    {
        nombreProducto:'Pizza Hut',
        id:4,        
        marcas:[
            {
                nombreMarca: 'Pizza Sencilla', 
                id:7,
                ventas:[{
                    enero:1500,
                    febrero:1954,
                    marzo:1266,
                    abril:3044
                }]
            }, 
            {
                nombreMarca: 'Pizza Deluxe', 
                id:8,
                ventas:[{
                    enero:1478,
                    febrero:6524,
                    marzo:2014,
                    abril:2304
                }]
            }
        ]  
    }
]
}
);
//Fin de la información ------------

//document ready
$(document).ready(function(){
    completarCategorias(categorias);
});

//Función para completar las opciones de las categorias
function completarCategorias(categorias) {
    let html = "";
    if (categorias.length > 0) {
        for (let i = 0; i < categorias.length; i++) {
            if (i==0) 
                html = html + `<option value="${categorias[i].id}" selected>${categorias[i].nombreCategoria}</option>`;
            else
                html = html + `<option value="${categorias[i].id}">${categorias[i].nombreCategoria}</option>`;                       
        }
        $("#categoria").append(html);
        iniciarSimulacion(categorias);
    }
}

function controlSelects(categorias) {
    //Reiniciamos el select
    $("#marca").html("");
    //Preparamos la información para llenar el select
    let proSel = $("#producto").val();
    let html = "";

    //llenamos el 2do select
    if (categorias.length > 0) {        
        for (let i = 0; i < categorias.length; i++) {            
            if (categorias[i].productos.length > 0) {
                for (let j = 0; j < categorias[i].productos.length; j++) {
                    if (categorias[i].productos[j].id == proSel) {                        
                        if (categorias[i].productos[j].marcas.length > 0) {                            
                            for (let z = 0; z < categorias[i].productos[j].marcas.length; z++) {
                                if (z == 0) {
                                    html = html + `<option 
                                    value="${categorias[i].productos[j].marcas[z].id}" selected>${categorias[i].productos[j].marcas[z].nombreMarca}
                                    </option>`;
                                }else{
                                    html = html + `<option 
                                    value="${categorias[i].productos[j].marcas[z].id}">${categorias[i].productos[j].marcas[z].nombreMarca}
                                    </option>`;
                                }
                            }                            
                            $("#marca").append(html);
                            generarGrafica(categorias);                           
                        }
                    }
                }
            }
        }
    }
}

function generarGrafica(categorias) {
    //Generamos el total de venta de cada mes por marca
    let marcaSel = $("#marca").val();
    let prodSel = $("#producto").val();
    let nombreMarca = "";
    let nombreProducto = "";
    let totE = 0;
    let totF = 0;
    let totM = 0;
    let totA = 0;
    totMeses = [];
    for (let i = 0; i < categorias.length; i++) {
        for (let j = 0; j < categorias[i].productos.length; j++) {
            if (categorias[i].productos[j].id == prodSel) {
                nombreProducto = categorias[i].productos[j].nombreProducto;
            }
            for (let z = 0; z < categorias[i].productos[j].marcas.length; z++) {
                if (categorias[i].productos[j].marcas[z].id == marcaSel) {
                    totE = categorias[i].productos[j].marcas[z].ventas[0].enero;
                    totF = categorias[i].productos[j].marcas[z].ventas[0].febrero;
                    totM = categorias[i].productos[j].marcas[z].ventas[0].marzo;
                    totA = categorias[i].productos[j].marcas[z].ventas[0].abril;                                
                    totMeses.push(totE,totF, totM, totA);
                    nombreMarca = categorias[i].productos[j].marcas[z].nombreMarca;
                }
            }
        }        
    }
    //Preparamos la gráfica
    var ctx = document.getElementById('myChart').getContext('2d');    
    if (myChart != "") {
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
                datasets: [{
                    label: `Total de ${nombreProducto} vendidos(as) de la marca ${nombreMarca}`,
                    data: totMeses,
                    backgroundColor: [
                        'rgba(95, 191, 100,0.9)',
                        'rgba(64, 93, 155,0.9)',
                        'rgb(221, 50, 67,0.9)',
                        'rgba(255, 159, 64, 0.9)'
                    ],
                    borderColor: [
                        'rgba(95, 191, 100,1)',
                        'rgba(64, 93, 155,1)',
                        'rgba(221, 50, 67,1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {	    
                responsive:true,
                scales: { yAxes: [{
                    ticks: {fontSize: 15,beginAtZero: true } 
                    }] 
                },
                animation: {
                    animateScale: true
                }
            }
        });            
    }else{
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
                datasets: [{
                    label: `Total de ${nombreProducto} vendidos(as) de la marca ${nombreMarca}`,
                    data: totMeses,
                    backgroundColor: [
                        'rgba(95, 191, 100,0.9)',
                        'rgba(64, 93, 155,0.9)',
                        'rgb(221, 50, 67,0.9)',
                        'rgba(255, 159, 64, 0.9)'
                    ],
                    borderColor: [
                        'rgba(95, 191, 100,1)',
                        'rgba(64, 93, 155,1)',
                        'rgba(221, 50, 67,1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {	    
                responsive:true,
                scales: { yAxes: [{ ticks: { fontSize: 15,beginAtZero: true} }] },
                animation: {
                    animateScale: true
                }
            }
        });         
    }
}

function iniciarSimulacion(categorias){
    //Reiniciamos el select
    $("#producto").html("");
    //Preparamos la información para llenar el select
    let catSel = $("#categoria").val();
    let html = "";        
    //llenamos el 2do select
    if (categorias.length > 0) {        
        for (let i = 0; i < categorias.length; i++) {            
            if (categorias[i].id == catSel) {                
                if (categorias[i].productos.length > 0) {
                    for (let j = 0; j < categorias[i].productos.length; j++) {
                        html = html + `<option value="${categorias[i].productos[j].id}">${categorias[i].productos[j].nombreProducto}</option>`;
                    }
                    $("#producto").append(html);  
                    controlSelects(categorias);
                }              
            }            
        }
    }    
}

//Evento Select De La Categoría
$("#categoria").change(function(){
    //Reiniciamos el select
    $("#producto").html("");
    //Preparamos la información para llenar el select
    let catSel = $("#categoria").val();
    let html = "";        
    //llenamos el 2do select
    if (categorias.length > 0) {        
        for (let i = 0; i < categorias.length; i++) {            
            if (categorias[i].id == catSel) {                
                if (categorias[i].productos.length > 0) {
                    for (let j = 0; j < categorias[i].productos.length; j++) {
                        html = html + `<option value="${categorias[i].productos[j].id}">${categorias[i].productos[j].nombreProducto}</option>`;
                    }
                    $("#producto").append(html);  
                    controlSelects(categorias);
                }              
            }            
        }
    }
});

//Evento Select Del Producto
$("#producto").change(function(){
    //Reiniciamos el select de marcas
    $("#marca").html("");
    //Variables utilizadas
    let proSel = $("#producto").val();
    let html = "";        
    //Generamos el ciclo para completar el Select de marcas
    if (categorias.length > 0) {  
        //Existen categorías      
        for (let i = 0; i < categorias.length; i++) {                        
            if (categorias[i].productos.length > 0) {
                //Existen productos
                for (let j = 0; j < categorias[i].productos.length; j++) {
                    if (categorias[i].productos[j].id == proSel) {                        
                        if (categorias[i].productos[j].marcas.length > 0) {
                            //Existen marcas de al menos un producto                            
                            for (let z = 0; z < categorias[i].productos[j].marcas.length; z++) {
                                html = html + `<option 
                                value="${categorias[i].productos[j].marcas[z].id}">${categorias[i].productos[j].marcas[z].nombreMarca}
                                </option>`;
                            }
                            //Colocamos las opciones del Select de marcas
                            $("#marca").append(html);
                            //Generamos la gráfica
                            generarGrafica(categorias);
                        }
                    }
                }
            }
        }
    }
});

//Evento Select Del Marca
$("#marca").change(function(){
    generarGrafica(categorias);
});
