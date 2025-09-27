import './Weather.css'
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";

import windIcon from './images/wind.gif';
import humidityIcon from './images/humidity.gif';
import Icon01d from './images/01d.gif';
import Icon01n from './images/01n.gif';
import Icon02d from './images/02d.gif';
import Icon02n from './images/02n.gif';
import Icon03dn from './images/03d&n.gif';
import Icon04dn from './images/04d&n.gif';
import Icon09dn from './images/09d&n.gif';
import Icon10d from './images/10d.gif';
import Icon10n from './images/10n.gif';
import Icon11dn from './images/11d&n.gif';
import Icon13dn from './images/13d&n.gif';
import Icon50dn from './images/50d&n.gif';

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind}) => {
    return(
        <>
        <div className="image">
            <img src={icon} alt="image" className="weather-icon"/>
        </div>
        <div className="temp">{temp}°C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
          <div>
            <span className="lat">lattitude</span>
            <span className="lat1">{lat}</span>
            </div>
          <div>
            <span className="log">longtitude</span>
            <span className="log1">{lon}</span>
          </div>
        </div>
        <div className="data-container">
           <div className="element-humidity">
            <img src={humidityIcon} alt="humidity" className="humidity" />
            <div className="data">
              <div className="percentage">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element-wind">
            <img src={windIcon} alt="wind" className="windIcon" />
            <div className="data">
              <div className="percentage">{wind}km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        </>
    )
}

export const Weather = () => {
    
    let api_key = "56182636b291c899565fd1171a724096";

    const [text, setText] = useState("Ramanathapuram");

    const [icon, setIcon] = useState(Icon02d);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const [loading, setLoading] = useState(false);
    const [cityNotFound, setCityNotFound] = useState(false);
    const [error, setError] = useState(null);
   
    const WeatherIconMap = {
      "01d" : Icon01d,
      "01n" : Icon01n,
      "02d" : Icon02d,
      "02n" : Icon02n,
      "03d" : Icon03dn,
      "03n" : Icon03dn,
      "04d" : Icon04dn,
      "04n" : Icon04dn,
      "09d" : Icon09dn,
      "09n" : Icon09dn,
      "10d" : Icon10d,
      "10n" : Icon10n,
      "11d" : Icon11dn,
      "11n" : Icon11dn,
      "13d" : Icon13dn,
      "13n" : Icon13dn,
      "50d" : Icon50dn,
      "50n" : Icon50dn
    };
   
    const search = async () => {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
      try{
        let res = await fetch(url);
        let data = await res.json();
       if(data.cod==="404")
       {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
       }

       setTemp(Math.floor(data.main.temp));
       setCity(data.name);
       setCountry(data.sys.country);
       setLat(data.coord.lat);
       setLon(data.coord.lon);
       setHumidity(data.main.humidity);
       setWind(data.wind.speed);

       const WeatherIconCode = data.weather[0].icon;
       setIcon(WeatherIconMap[WeatherIconCode] || Icon02d);

       setCityNotFound(false);
      }

      catch(error){
        console.error("An Error Occured:", error.message);
        setError("An error occured while fetching weather data");
      }
      finally{
        setLoading(false);
      }
    }

    const handleCity = (e) => {
       setText(e.target.value);
    }
    
    const handleKeyDown = (e) => {
      if(e.key==="Enter"){
         search();
      }
    }

    useEffect( function () {
      search();
    },[])

  return (
    <>
          <div className="app-container">
            <div className="input-container">
                 <input type="text" placeholder="Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
                <div className="search" onClick={()=>search()}>
                    <FaSearch color="#757575"/>
                </div>
            </div>
             {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} />}
            
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {cityNotFound && <div className="city-not-found">City not found</div>}
          </div>
    </>
        
  )
}

