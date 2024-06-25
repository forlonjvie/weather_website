let weather = {
    "apiKey": "3e9d1de56bd387f38e12cf3b6857d480",
    "unsplashApiKey": "5eM4NUxArHBGDIK90XYwq7wf0w8joTS7zcKaMlHKs1E", // Add your Unsplash API key here
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&APPID=" +
            this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " m/s";

        document.querySelector(".weather").classList.remove("loading");

        this.fetchBackgroundImage(name);
    },
    fetchBackgroundImage: function(query) {
        fetch(
            `https://api.unsplash.com/photos/random?query=${query}&client_id=${this.unsplashApiKey}`
        )
        .then((response) => response.json())
        .then((data) => {
            const imageUrl = data.urls.full;
            console.log("Updating background image URL to:", imageUrl); // Debugging line
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        })
        .catch((error) => console.error("Error fetching background image:", error));
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
});
