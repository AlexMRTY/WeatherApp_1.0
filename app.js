const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {

    // const temp = 15.6;
    // const condition = "sunny";
    // const iconId = "10d";
    // const iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    
    // res.write(`<h1>The weather in London is currently ${condition} with a tempretures of about ${temp} degrees.</h1>`);
    // res.write(`<img src="${iconUrl}" >`)
    // res.send()


    // Take user input and inject it as querry to URL
    const city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c051861f121705f977594ca5bff98f3&units=metric`
    
    // Process the response from the API and display it to the user. 
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const condition = weatherData.weather[0].description;
            const iconId = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            
            res.write(`<h1>The weather in ${city} is currently ${condition} with a tempretures of about ${temp} degrees.</h1>`);
            res.write(`<img src="${iconUrl}" >`)
            res.send()
        })
    })


})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is deployed on port >> 3000")
})