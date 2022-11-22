import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

document.getElementById('ciudad').addEventListener('input', setWeather)

function setWeather(){
  let ciudad = document.getElementById("ciudad").value
  let yourDate = new Date()
  var year = yourDate.toLocaleString("default", { year: "numeric" });
  var month = yourDate.toLocaleString("default", { month: "2-digit" });
  var day = yourDate.toLocaleString("default", { day: "2-digit" });
  yourDate=year + "-" + month + "-" + day;
  console.log(yourDate)
  fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q='+ciudad+'&days=4', options)
	.then(response => response.json())
	.then(response => {
    console.log(response)
    document.getElementById("resultadohoy").innerHTML = response.current.temp_c + " °C"
    document.getElementById("resultadomañ").innerHTML = response.forecast.forecastday[0].day.avgtemp_c + " °C"
    document.getElementById("resultadopas").innerHTML = response.forecast.forecastday[1].day.avgtemp_c + " °C"
    document.getElementById("resultadopmañ").innerHTML = response.forecast.forecastday[2].day.avgtemp_c + " °C"
    document.getElementById("weatherhoy").innerHTML = response.current.condition.text 
    document.getElementById("weathermañana").innerHTML = response.forecast.forecastday[0].day.condition.text 
    document.getElementById("weatherpas").innerHTML = response.forecast.forecastday[1].day.condition.text 
    document.getElementById("weatherpasmañ").innerHTML = response.forecast.forecastday[2].day.condition.text 
  })
  //problemas con el segundo response,porque funciona en ese response y no en el otro????
	.catch(err => console.error(err));
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4e01154185msh240d2a50592916fp1e6ad6jsn70b1576b98c8',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
