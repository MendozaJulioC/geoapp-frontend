const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })


async function buscaproyectnombre(){
    let proyecto = document.getElementById('browser').value
    let tablaTotal=''
    try {
        var dato=[];
            fetch(`http://localhost:4000/api/proyectos/${proyecto}`)
            .then(res=> res.json())
            .then(datos=>{
                console.log(datos)
                let tam= datos.data.length;
                for(let k =0; k<(tam) ;k++){
                    dato.push({
                        "category": datos.data[k].ano,
                        "column-1": Math.round(parseInt(datos.data[k].total)),
                    });
                    tablaTotal +='<tr>';
                    tablaTotal +='<td style="text-align: center; font-size: 10px;">'+ (k + 1)+'</td>';
                    tablaTotal +='<td style="text-align: center; font-size: 10px;">'+ datos.data[k].ano+'</td>';
                    tablaTotal +='<td style="text-align: center; font-size: 10px;">'+ datos.data[k].nomproy+'</td>';
                    tablaTotal +='<td style="text-align:initial;font-size: 10px;">'+datos.data[k].cod_dep+'</td>';
                    tablaTotal +='<td style="text-align:initial;font-size: 10px;">'+datos.data[k].nombre_dep+'</td>';
                    tablaTotal +='<td style="text-align:initial;font-size: 10px;">'+datos.data[k].cod_dep_actual+'</td>';
                    tablaTotal +='<td style="font-size: 10px;">'+formatter.format(parseInt((datos.data[k].total)))+'</td>'
                   
                  tablaTotal +='<tr>';
                  document.getElementById('tablaxproyectoxtabla').innerHTML=tablaTotal;
                }



                AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "categoryField": "category",
                "startDuration": 1,
                "export": {
                    "enabled": true
                },
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "trendLines": [],
                "graphs": [
                    {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "columnWidth": 0.24,
                        "fillAlphas": 0.01,
                        "fontSize": 8,
                        "id": "AmGraph-1",
                        "lineAlpha": 1,
                        "lineColor": "#008000",
                        "lineThickness": 3,
                        "minDistance": 0,
                        "negativeLineAlpha": 0,
                        "periodSpan": -15,
                        "title": "Invesión",
                        "topRadius": 0.4,
                        "type": "smoothedLine",
                        "valueField": "column-1"
                    }
                
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "cifras en millones de pesos"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Historia del proyecto"
                    }
                ],
                
                "dataProvider": dato
    
                })
            document.getElementById('nomproyecto').innerHTML= datos.data[0].nomproy
            document.getElementById('nomproyecto_tabla').innerHTML= datos.data[0].nomproy
            document.getElementById('nomproyecto_tabla2').innerHTML= datos.data[0].nomproy
            
        
            detalleproyecto_historia(proyecto, 0)

            });
    } catch (error) { console.log('Error funcion buscaproyecto por nombre:', error)}

}

async function detalleproyecto_historia(nombre, cod_bpin){
    let tabla=''
if(nombre){
    fetch(`http://localhost:4000/api/proyectos/detalle/${nombre}`)
    .then(res=> res.json())
    .then(response=>{
        
        let tam = response.data.length;
        for(let i =0; i<(tam) ;i++   ){
            tabla +='<tr>';
              tabla +='<td style="text-align: center; font-size: 10px;">'+(i+1)+'</td>';
              tabla +='<td style="text-align: center; font-size: 10px;">'+(parseInt(response.data[i].ano))+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].cod_dep+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].cod_bpin+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].nomproy+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].cod_dep_actual+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].nombre_dep+'</td>';
              tabla +='<td style="text-align:initial;font-size: 10px;">'+response.data[i].comuna+'</td>';
              tabla +='<td style="font-size: 10px;">'+formatter.format(parseInt((response.data[i].total)))+'</td>'
            
            tabla +='<tr>';
            document.getElementById('tablaxproyecto').innerHTML=tabla;

        }  
    })
    .catch(error=> console.error('Error:' , error))


}

}

async function buscaporcodbpin(){

}






