let container = document.querySelector(".container");
let search = document.querySelector(".search-box");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let eror404 = document.querySelector(".not-found");

search.addEventListener("click", () => {

    let APIKey = "728b0ee6df5687559812bd3169ad77b7";
    let city = document.querySelector(".search-box input").value;

    if(city === "")
    {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => 
            {
                if (json.cod === "404")
                {
                    container.style.height = "400px";
                    weatherBox.style.display = "none";
                    weatherDetails.style.display = "none";
                    eror404.style.display = "block";
                    error404.classList.add("fadeIn");
                    return;
                }

                eror404.style.display = "none";
                error404.classList.remove("fadeIn");

                let image = document.querySelector(".weather-box img");
                let temperature = document.querySelector(".weather-box .temperature");
                let description = document.querySelector(".weather-box .description");
                let humidity = document.querySelector(".weather-details .humidity span"); 
                let wind = document.querySelector(".weather-details .wind span");

                switch(json.weather[0].main)
                {
                    case "Clear" :
                        image.src = "images/clear.png";
                        break;
                    case "Rain" :
                        image.src = "images/rain.png";
                        break;
                    case "Snow" :
                        image.src = "images/snow.png";
                        break;
                    case "Clouds" :
                        image.src = "images/cloud.png";
                        break;
                    case "Haze" :
                        image.src = "images/mist.png";
                        break;
                    default:
                        image.src = "";
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.style.display = "";
                weatherDetails.style.display = "";
                weatherBox.classList.add("fadeIn");
                weatherDetails.classList.add("fadeIn");
                container.style.height = "590px";

            });
});