import "./App.sass";
import { useEffect, useState } from "react";

const App = () => {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [weather, setWeather] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        // watchPosition() updates/watches user's location if it changes
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    }, []);

    useEffect(() => {
        if (lat !== 0 && lon !== 0 && search.length === 0) {
            fetch(
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=829ecd7da6ea4a3f1780839a839c84d3`,
                { method: "GET" }
            )
                .then((res) => res.json())
                .then((data) => setWeather(data));
        }
    }, [lat, lon, search]);

    const getWeatherByCity = () => {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=829ecd7da6ea4a3f1780839a839c84d3`,
            { method: "GET" }
        )
            .then((res) => res.json())
            .then((data) => setWeather(data));
    };

    useEffect(() => {
        search.length > 0 && getWeatherByCity();

        // eslint-disable-next-line
    }, [search]);

    return (
        <div className="app">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="app-searchbar"
                placeholder="Search..."
            />
            {weather.name && weather.main.temp && weather.weather[0].icon ? (
                <div className="app-weather">
                    <p className="weather-name">{weather.name}</p>
                    <p className="weather-temp">{weather.main.temp} °C</p>
                    <img
                        src={`http://openweathermap.org/img/w/${
                            weather.weather[0].icon
                        }${".png"}`}
                        alt="weather icon"
                        className="weather-img"
                    />
                </div>
            ) : (
                <div className="app-weather">Location not found.</div>
            )}
        </div>
    );
};

export default App;
