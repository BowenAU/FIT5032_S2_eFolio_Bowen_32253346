<template>
  <div class="weather-container">
    <h1>Weather API</h1>
    <input
      type="text"
      v-model="city"
      id="city"
      placeholder="Enter city name"
      class="search-input required"
    />
    <button @click="searchByCity" type="submit">Search</button>
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div class="weather-info">
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const city = ref('')
const weatherData = ref('')
const iconUrl = ref('')
const temperature = ref('')
const apikey = '7757eb2f08fb9386523b8003ee7941cc'

const searchByCity = async () => {
  try {
    const responseLocation = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${apikey}`
    )
    console.log('Response Location: ', responseLocation.data[0])
    const lat = responseLocation.data[0].lat
    const lon = responseLocation.data[0].lon
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
    await fetchWeatherData(url)
  } catch (error) {
    console.error('Response Location error:', error)
  }
}

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      await fetchWeatherData(url)
    })
  }
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    console.log('Weather response: ', response.data)
    weatherData.value = response.data
    iconUrl.value = `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
    temperature.value = Math.floor(response.data.main.temp - 273.15) // Convert from Kelvin to Celsius
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

fetchCurrentLocationWeather()
</script>

<style scoped>
.weather-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Full height */
  background-color: #f0f8ff; /* Light background color */
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.search-input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  text-align: center;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;
}

button:hover {
  background-color: #45a049;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

img {
  width: 100px;
  height: 100px;
}

p {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
