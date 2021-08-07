$(document).ready(function () {

var API = `https://opendata.arcgis.com/datasets/454f46db2cfd49fca37245541810d18b_0.geojson`;
var select = $("#sel1");
var my_data;
var regions = [];
var confirmed = []; 
var recovred = [];
var deaths = [];

$.getJSON(API, function (data,status) {
    my_data = data.features;
    
my_data.map(function (e) {
    select.append("<option>"+e.properties.RegionFr+"</option>");
    regions.push(e.properties.RegionFr)
    confirmed.push(e.properties.Cases)
    recovred.push(e.properties.Recoveries)
    deaths.push(e.properties.Deaths)
    
})


 select.change(function () {
    var city_selected = select.val();
    my_data.map(function (h) {
        if (city_selected == h.properties.RegionFr) {
            $("#confirmed").text(h.properties.Cases);
            $("#recovered").text(h.properties.Recoveries);
            $("#deaths").text(h.properties.Deaths);
        }
    })
});
 
// ChartJs

var myChart = document.getElementById("myChart").getContext('2d')

var chart = new Chart(myChart, {

    type:"radar",
    data:{ labels : regions,
           datasets:[

                 {    label : "Confirmed",
                      data :  confirmed,
                      backgroundColor:"#f1c40f",
                      miniBarLengh:100,
                 },  


                 {    label : "Recovred",
                      data :  recovred,
                      backgroundColor:"#2ecc71",
                      miniBarLengh:100,
                 },


                 {    label : "Deceased",
                      data :  deaths,
                      backgroundColor:"#e74c3c",
                      miniBarLengh:100,
                 },

           ],
    },

    option:{},
         
    

});


});
});