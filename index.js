#! /usr/bin/env node
require('dotenv').config()

const program = require('commander');
const axios = require('axios');
const boxen = require('boxen');
const chalk = require('chalk');

const ubCityId = "2028461";
const WEATHERAPI = "YOUR_API_KEY";
const url = `https://api.openweathermap.org/data/2.5/weather?id=${ubCityId}&appid=${WEATHERAPI}&units=metric`;

const boxenSuccessOption = {
  borderColor: "green",
  borderStyle: "round",
  padding: 2,
  float: "left",
  align: "center",
}

const boxenFailOption = {
  borderColor: "red",
  borderStyle: "bold",
  padding: 2,
  float: "left",
  align: "center",
}

program
  .version('0.0.1')
  .option('-c, --cord [string]','getting coordination')
  .parse(process.argv)

const arglistSize = program.args.length;

if(arglistSize == 0){
  // Get Current Weather
  getCurrentWeather();
}





function getCurrentWeather(){
  axios.get(url)
    .then(function (resp) {
      let temp = resp.data.main.temp
      let weather_status = resp.data.weather[0].main;
      let weather_msg = getWeatherMsg(weather_status);


      console.log(boxen(chalk.bold.yellowBright(`\"Улаанбаатар хотод яг одоо ${temp} C байна 🧐\nӨнөөдөр цаг агаар ${weather_msg} байна\"`)
        + chalk.bold.whiteBright("\n\n- mnkhod [amateur developer]"),boxenSuccessOption));
    })
    .catch(function (e) {
      if(e.code == "ENOTFOUND"){
          console.log(boxen(chalk.bold.redBright("Таны Internet Байхгүй Байна"),boxenFailOption));
      }else{
        switch(e.response.status){
          case 404:
            console.log(boxen(chalk.bold.redBright("Хотын ID олдсонгүй"),boxenFailOption));
            break;
          case 401:
            console.log(boxen(chalk.bold.redBright("Таны API Түлхүүр Буруу Байна"),boxenFailOption));
            break;
          default:
            console.log(boxen(chalk.bold.redBright(e),boxenFailOption));
        }
      }
    })
    .then(function () {
      // always executed
    });
}

function getWeatherMsg(stat){
  switch(stat){
    case "Clouds" :
      return "үүлэрхэг 💨";
    case "Thunderstorm" :
      return "аадар бороотой 🌊";
    case "Rain" :
      return "бороотой 💦";
    case "Drizzle" :
      return "бороотой 💧";
    case "Snow" :
      return "цастай 🥶";
    case "Clear" :
      return "сайхан 💞";
    default:
      return "сайхан 💞";
  }
}




// {
//   coord: { lon: 106.92, lat: 47.92 },
//   weather: [
//     { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }
//   ],
//   base: 'stations',
//   main: {
//     temp: 15,
//     feels_like: 11.73,
//     temp_min: 15,
//     temp_max: 15,
//     pressure: 1017,
//     humidity: 38
//   },
//   visibility: 10000,
//   wind: { speed: 2, deg: 0 },
//   clouds: { all: 20 },
//   dt: 1600837961,
//   sys: {
//     type: 1,
//     id: 9644,
//     country: 'MN',
//     sunrise: 1600814420,
//     sunset: 1600858143
//   },
//   timezone: 28800,
//   id: 2028461,
//   name: 'Ulaanbaatar Hot',
//   cod: 200
// }
