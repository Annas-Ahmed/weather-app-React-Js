import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [inputValue, setInputValue] = useState("")
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState("")
  const [callApi, setCallApi] = useState('')


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue ? inputValue : 'Karachi'}&appid=69e67c8bdadf637986d2a5ad89d314c4&units=metric`)
      .then((res) => {
        setWeather(res.data)
        console.log(res);
        setCallApi(true)

      })
      .catch((err) => {
        console.log(err);
        setCallApi(false)

      })
  }, [city]);

  const handleChange = (e) => {
    e.preventDefault();
    setCity(inputValue)
  }
  return (
    <>
      <section className='main-section'>
        <h1>
          Weather App React JS
        </h1>
        <form onSubmit={handleChange}>
          <input onChange={(e) => { setInputValue(e.target.value) }} placeholder='search city' />
        </form>
        {
          callApi ?
            <section>
              <li>City: {weather.name}</li>
              <li>Temperature: {weather.main.temp} C</li>
              <li>Humidity: {weather.main.humidity} g.m.</li>
              <li>Pressure: {weather.main.pressure} Pa</li>
            </section> :
            <img className='notfound-image' src={require('./assets/error.jpg')} />
        }
      </section>
    </>
  );
}

export default App;
