const express = require('express');
const https = require('https')
const bodyParser=require("body-parser")

const app = express();
 app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
  const query=req.body.CityName;
  const appid="30b742b4bd8762b3fccedf50b8103bb4"
  const metric="Celsius"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+metric+"&appid="+appid;

  https.get(url, function(response) {
    console.log(response)
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp
      const icon=weatherData.weather[0].icon
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperatre in London is "+temp+" degrees Celsius.</h1>")
      res.write("<img src="+imageURL+">")
      res.send()
    })
  })

})

app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})
