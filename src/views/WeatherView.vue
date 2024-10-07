<template>
    <div>
      <h1>Weather API</h1>
      <input type="text" v-model="city" id="city" placeholder="Enter city name" class="search-input required" />
      <button @click="searchByCity" type="submit">Search</button>
            <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->  
      <main>
        <!--If there are no data returned, then skip rendering the information-->  
        <div v-if="weatherData">
          <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->  
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->  
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>

    </div>

  </template>

  <script setup>
import { ref } from 'vue';
import axios from "axios";

const city = ref(''); 
const weatherData = ref('');
const iconUrl = ref('');
const temperature = ref('');
const apikey = "7757eb2f08fb9386523b8003ee7941cc";
const searchByCity =async () => {
    try {
          const responseLocation = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`);
          //Returned data from API is stored as JSON file in weatherData
          console.log("Response Location: ", responseLocation.data[0]);
          const lat = responseLocation.data[0].lat
          const lon = responseLocation.data[0].lon
          console.log("lat", lat)
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
            //await means wait for the fetchWeatherData method to complete before proceeding
        await fetchWeatherData(url);
        } catch (error) {
          console.error("Response Location error:", error);
        }

}

const fetchCurrentLocationWeather = async() => {
        //The navigator.geolocation object is part of the Web API provided by modern web browsers
        //Please note this function is not belongs to Vue or openweather.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            //API link to obtain the current weather based on the current location browser identified 
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            //await means wait for the fetchWeatherData method to complete before proceeding
            await fetchWeatherData(url);
          });
        }
      }
const fetchWeatherData = async (url) => {
        try {
          const response = await axios.get(url);
          //Returned data from API is stored as JSON file in weatherData
          console.log("Weather response: ", response.data);
          weatherData.value = response.data;
          iconUrl.value = response.data
          ? `http://api.openweathermap.org/img/w/${response.data.weather[0].icon}.png`
          : null;
          temperature.value = response.data
          ? Math.floor(response.data.main.temp - 273)
          : null;

        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
      fetchCurrentLocationWeather()

  </script>