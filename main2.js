// Guarda en memoria la ultima ciudad buscada por el usuario
const cityStoraged = localStorage.getItem('city')
if(cityStoraged){
    document.getElementById('ciudad').value= cityStoraged
    getData(cityStoraged)
}

document.getElementById('ciudad').addEventListener('input', handleChangeCity)
// con asynx await


async function handleChangeCity(event){
    const city = event.target.value
    localStorage.setItem('city',city)
    getData(city)
}

async function getData(city){
  const data = await getForecastFromAPI(city)  
    try{
    document.getElementById("resultadohoy").innerHTML = data.current.temp_c + " °C"
    document.getElementById("weatherhoy").innerHTML = data.current.condition.text 
    document.getElementById("resultadomañ").innerHTML = data.forecast.forecastday[0].day.avgtemp_c + " °C"
    document.getElementById("resultadopas").innerHTML = data.forecast.forecastday[1].day.avgtemp_c + " °C"
    document.getElementById("resultadopmañ").innerHTML = data.forecast.forecastday[2].day.avgtemp_c + " °C"
    document.getElementById("weathermañana").innerHTML = data.forecast.forecastday[0].day.condition.text 
    document.getElementById("weatherpas").innerHTML = data.forecast.forecastday[1].day.condition.text 
    document.getElementById("weatherpasmañ").innerHTML = data.forecast.forecastday[2].day.condition.text 
    }catch(error){
        console.log("API Error")
    }
}

async function getForecastFromAPI(ciudad){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e01154185msh240d2a50592916fp1e6ad6jsn70b1576b98c8',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
        };
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${ciudad}&days=4`
    const response = await fetch(url,options)
    return await response.json()
}
