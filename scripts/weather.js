//weather api key 8361d16a52a3f959359273078fab70ef
// bvi country code for api 3577718
const icons = {
    day: {
        sunny: "images/weather-icons/sunny.png",
        cloudy_day: "images/weather-icons/cloudy_day.png",
        cloudy_rainy_day: "images/weather-icons/cloudy_rainy_day.png",
        cloudy_storm_day: "images/weather-icons/cloudy_storm_day.png"
    },
    night: {
        night: "images/weather-icons/night.png",
        cloudy_night: "images/weather-icons/cloudy_night.png",
        cloudy_rainy_night: "images/weather-icons/cloudy_rainy_night.png",
        cloudy_storm_night: "images/weather-icons/cloudy_storm_night.png"
    },
    generic: {
        windy: "images/weather-icons/windy.png",
        rainy: "images/weather-icons/rainy.png",
        cloudy: "images/weather-icons/cloudy.png",
        cloudy_storm: "images/weather-icons/cloudy_storm.png"
    }
}
const offset = -4;
const bviTime = new Date( new Date().getTime() + offset * 3600 * 1000).toGMTString().replace( / GMT$/, "" );
const bviTimeSubstring = bviTime.substring(17);
const bviTimeNum = bviTimeSubstring.substring(0,2);
const timeInt = Number(bviTimeNum);
const tempEle = document.getElementById("temp");
const condEle = document.getElementById("cond");
const iconEle = document.getElementById("weather-icon");
const tab = document.getElementById("desktop-weather-tab");
const eHeaderh3 = document.querySelector('#expanded-header > h3');
const eDate = document.getElementById("expanded-date");
const eCond = document.getElementById("expanded-condition");
const eIcon = document.getElementById("e-icon");
const eTemp = document.getElementById("eTemp");
const eRealFeel = document.getElementById("real-feel");
const eWind = document.getElementById("wind");
const eHumidity = document.getElementById("humidity");
let farenheit;
let am;
let f = true;
let main, date, description, temp, realFeel, humidity, wind, celcius, cReal;
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest(); // Open new connection w/ GET request on endpoint 
request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=3577718&APPID=8361d16a52a3f959359273078fab70ef&units=imperial', true)
request.onload = function() {// Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        let conditionCode = data.list[0].weather[0].id;
        tempEle.textContent = Math.round(data.list[0].main.temp) + String.fromCharCode(176) + "F";
        condEle.textContent = data.list[0].weather[0].main;
        if(timeInt < 17 && timeInt >= 5){
            am = true;
        }
        else{
            am = false;
        }
        if(am){
            if(conditionCode > 800){
                iconEle.src = icons.day.cloudy_day
            }
            if(conditionCode == 800){
                iconEle.src = icons.day.sunny
            }
            if(conditionCode <= 599 && conditionCode >= 300){
                iconEle.src = icons.day.cloudy_rainy_day
            }
            if(conditionCode <=299 && conditionCode >= 200){
                iconEle.src = icons.day.cloudy_storm_day
            }
        }
        else{
            if(conditionCode > 800){
                iconEle.src = icons.night.cloudy_night
            }
            if(conditionCode == 800){
                iconEle.src = icons.night.night
            }
            if(conditionCode <= 599 && conditionCode >= 300){
                iconEle.src = icons.night.cloudy_rainy_night
            }
            if(conditionCode <=299 && conditionCode >= 200){
                iconEle.src = icons.night.cloudy_storm_night
            }
        }
        main = data.list[0].weather[0].main + ' (' + data.list[0].weather[0].description + ')';
        date = bviTime.substring(0, 16);
        description = data.list[0].weather[0].description;
        realFeel = Math.round(data.list[0].main.feels_like) + String.fromCharCode(176) + "F";
        humidity = data.list[0].main.humidity;
        eDate.textContent = date;
        eCond.textContent = main;
        eIcon.src = iconEle.src;
        eTemp.textContent = Math.round(data.list[0].main.temp) + String.fromCharCode(176) + "F"
        eRealFeel.textContent += realFeel;
        eWind.textContent += Math.round(data.list[0].wind.speed) + ' mph';
        eHumidity.textContent += humidity + '%';
        celcius = (data.list[0].main.temp - 32) * 5 / 9;
        cReal = Math.round((data.list[0].main.feels_like - 32) * 5 / 9) + String.fromCharCode(176) + "C";
        celcius = Math.round(celcius) + String.fromCharCode(176) + "C";
        farenheit = Math.round(data.list[0].main.temp);
    } else {
        console.log('error')
    }
}
request.send()// Send request

tab.onclick = function(e){
    e.preventDefault();
    const ele = document.getElementById("expanded-weather");
    if(ele.style.display === "none"){
        ele.style.display = "flex";
    }
    else{
        ele.style.display = "none"
    }
}

const convert = document.getElementById("convert");
convert.onclick = function(e){
    e.preventDefault();
    if(f){
        convert.textContent = "(to farenheit)";
        eTemp.textContent = celcius;
        tempEle.textContent = celcius;
        eRealFeel.textContent = "Feels like:  " + cReal;
        f = false;
    }
    else{
        convert.textContent = "(to celcius)";
        eTemp.textContent = farenheit + String.fromCharCode(176) + "F";
        tempEle.textContent = farenheit + String.fromCharCode(176) + "F";
        eRealFeel.textContent = "Feels like:  " + realFeel;
        f = true;
    }
}