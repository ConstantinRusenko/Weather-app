const getData = async days => {
  const KEY = '8bd6bd9593b54e0fbed115426200709';
  const cityInputEl = document.querySelector(".city-picker");
  const city = cityInputEl.value;
  try {
    const response = await fetch(`
      https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${KEY}&q=${city}&format=json&num_of_days=${days}&cc=yes&fx24=yes
      `);
    const weatherInfo = await response.json();
    showWeather(weatherInfo, days);
    } catch (error) {
      throw new Error('Ошибка загрузки:', error.message);
    }
}

const showWeather = (weatherInfo, days) => {
  const main = document.getElementById("main");
  const time = document.getElementById("hourly-temp");
  const isTwoWeeks = days === 14;
  time.innerHTML = "";
  main.innerHTML = "";
  main.classList.toggle('flex-wrap', isTwoWeeks);

  weatherInfo.data.weather.forEach(crntWeather => {
    const dayWeather = document.createElement('li');
    dayWeather.classList.toggle('flex', isTwoWeeks);
    dayWeather.classList.add("dayWeather");
    dayWeather.innerHTML = `
      <p class="weather-date">${crntWeather.date.slice(5)}</p>
      <div class="weather-info">
        <h2>${crntWeather.avgtempC}°</h2>
        <img src="${crntWeather.hourly[0].weatherIconUrl[0].value}"/>
      </div>
    `;
    main.appendChild(dayWeather);
    dayWeather.addEventListener("click", () => hourlyTmp(crntWeather, time));       
    });
}

const KmphToMs = speed => {
  speed = speed/3.6;
  return speed.toFixed(2);
}
    
const hourlyTmp = (crntWeather, time) => {
  time.innerHTML = "";
  crntWeather.hourly.forEach((hour, index) => {
    if (index === 0) return;
    const hourlyList = document.createElement('li');
    hourlyList.classList.add('hourly-list');
    hourlyList.innerHTML = `
      <p>${formatHours(hour.time)}</p>
      <h3>${hour.tempC}°</h3>
      <small>w:${KmphToMs(hour.windspeedKmph)}m/s</small>
      <small>${hour.winddir16Point}</small>
    `;
    time.appendChild(hourlyList);
  });
}

const formatHours = time => {
  let formattedTime = time;
  if (time.length > 1) formattedTime = time.slice(0, -2);
  return `${formattedTime}:00h`;
}