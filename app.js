 


document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#searchbtn');
    const input = document.querySelector('.search-box input');
    const toastContainer = document.getElementById('toast-container');

    search.addEventListener("click", fetchWeatherData);
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchWeatherData();
        }
    });

    function fetchWeatherData() {
        const APIkey = 'd0da7b1dc4580eda9b298b09476730a5';
        const city = input.value.trim();

        if (city === '') {
            showToast('Please enter a city name.', 'error');
            return;
        }

        // Disable the input and button
        input.disabled = true;
        search.disabled = true;

        showToast('Loading...', 'info');

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(json => {
                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.temperature');
                const description = document.querySelector('.description');
                const humidity = document.querySelector('.info-humidity span');
                const wind = document.querySelector('.info-wind span');

                switch (json.weather[0].main.toLowerCase()) {
                    case 'clear':
                        image.src = 'https://www.iconattitude.com/icons/open_icon_library/status/png/256/weather-clear-3.png';
                        break;
                    case 'rain':
                        image.src = 'https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Background.png';
                        break;
                    case 'snow':
                        image.src = 'https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Images-HD.png';
                        break;
                    case 'clouds':
                        image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png';
                        break;
                    case 'mist':
                        image.src = 'https://tse1.mm.bing.net/th?id=OIP.IAFZFnXYjoAZvtqB4vX6mwHaHa&pid=Api&P=0&h=220';
                        break;
                    case 'haze':
                        image.src = 'https://tse1.mm.bing.net/th?id=OIP.IAFZFnXYjoAZvtqB4vX6mwHaHa&pid=Api&P=0&h=220';
                        break;
                    default:
                        image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png';
                }

                temperature.innerHTML = `${json.main.temp}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${json.wind.speed} km/h`;

                showToast('Weather data loaded successfully.', 'success');

                // Clear the input
                input.value = '';
            })
            .catch(err => {
                console.error('Error fetching weather data:', err);
                showToast('Error: City not found. Please check the city name and try again.', 'error');
            })
            .finally(() => {
                // Re-enable the input and button
                input.disabled = false;
                search.disabled = false;
            });
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.classList.add('toast', 'show', type);
        toast.innerText = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
