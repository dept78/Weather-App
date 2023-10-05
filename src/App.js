import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  const getWeatherIcon = (temperature) => {
    if (temperature < 20) {
      return (
        <img
          className="weathorIcon"
          src="https://static.vecteezy.com/system/resources/previews/010/425/906/original/scattered-snow-color-icon-snowy-light-snow-partly-cloudy-winter-weather-cloud-snowflake-and-sun-weather-forecast-isolated-illustration-vector.jpg"
          alt="Cold Weather"
        />
      );
    } else {
      return (
        <img
          className="weathorIcon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvKPeKthp2gxef2Z2VXfcJurzs1rH2pUnLsckqoJyUEOQ_3cg&s"
          alt="Weather Icon"
        />
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            {getWeatherIcon((data?.main?.temp) - 273.15)}
            <h5 className="weathorCity">{data?.name}</h5>
            <h6 className="weathorTemp">
              {((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

