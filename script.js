const link =
  "http://api.weatherstack.com/current?access_key=2a1bdddf9a990df9d9ea6738a7e112aa";

const root = document.getElementById("root");

let store = {
  city: "London",
  feelslike: 0,
  cloudcover: 0,
  temperature: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  description: "",
  windSpeed: 0,
};

const fetchData = async () => {
  try {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();

    const {
      current: {
        feelslike,
        cloudcover,
        temperature,
        humidity,
        observation_time: observationTime,
        pressure,
        uv_index: uvIndex,
        visibility,
        is_day: isDay,
        weather_descriptions: description,
        wind_speed: windSpeed,
      },
      location: { name },
    } = data;

    store = {
      ...store,
      isDay,
      city: name,
      temperature,
      observationTime,
      feelslike,
      cloudcover,
      humidity,
      pressure,
      uvIndex,
      visibility,
      description: description[0],
      windSpeed,
    };

    renderComponent();
  } catch (err) {
    console.log(err);
  }
};

const renderComponent = () => {
  root.innerHTML = `${store.temperature}°`;
};

fetchData();
