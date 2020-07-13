const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
const xlsx = require("xlsx");
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
//========================================data gathering ================================
let wb = xlsx.readFile("SampleData.xlsx")
let wbData = wb.Sheets['Sheet1'];
let dataJson = xlsx.utils.sheet_to_json(wbData);
//========================================================================================

//=====================================data representation================================
let dataArray = [];

app.get("/",function(req,res){
    res.render("index")
});
app.post("/",function(req,res){
    let cityName = req.body.city;
    let Type = req.body.type;
    dataJson.map((element) => {
        if (element.City.toLowerCase() === cityName.toLowerCase() && element.Type.toLowerCase() === Type.toLowerCase()) {
            dataArray.push(element);
            console.log(element.Image_location);
        } 
    });
    res.redirect("/display")
});

app.get("/display",function(req,res){
    res.render("display",{
        vehicle:dataArray
    });
});
app.post("/display",function(req,res){
    res.redirect("/");
});


app.listen("3000",function(){
  console.log("the server has started");
})

