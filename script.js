const link =
  "http://api.weatherstack.com/current?access_key=2a1bdddf9a990df9d9ea6738a7e112aa";

const root = document.getElementById("root");

let store = {
  city: "Samara",
  feelslike: 0,
  temperature: 0,
  observationTime: "00:00 AM",
  isDay: "yes",
  description: "",
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    uvIndex: {},
    visibility: {},
  },
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
      description: description[0],
      properties: {
        cloudcover: {
          title: "cloudcover",
          value: `${cloudcover}%`,
          icon: "cloud.png",
        },
        humidity: {
          title: "humidity",
          value: `${humidity}%`,
          icon: "humidity.png",
        },
        windSpeed: {
          title: "wind speed",
          value: `${windSpeed} km/h`,
          icon: "wind.png",
        },
        pressure: {
          title: "pressure",
          value: `${pressure} %`,
          icon: "gauge.png",
        },
        uvIndex: {
          title: "uv Index",
          value: `${uvIndex} / 100`,
          icon: "uv-index.png",
        },
        visibility: {
          title: "visibility",
          value: `${visibility}%`,
          icon: "visibility.png",
        },
      },
    };

    renderComponent();
  } catch (err) {
    console.log(err);
  }
};

const renderComponent = () => {
  root.innerHTML = markup();
};

const getImage = (description) => {
  const value = description.toLowerCase();

  switch (value) {
    case "partly cloudy":
      return "partly.png";
    case "cloud":
      return "cloud.png";
    case "fog":
      return "fog.png";
    case "sunny":
      return "sunny.png";
    case "clear":
      return "clear.png";
    default:
      return "the.png";
  }
};

const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
                <div class="property-icon">
                  <img src="./img/icons/${icon}" alt="">
                </div>
                <div class="property-info">
                  <div class="property-info__value">${value}</div>
                  <div class="property-info__description">${title}</div>
                </div>
              </div>`;
    })
    .join("");
};

const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store;

  const containerClass = isDay === "yes" ? "is-day" : "";

  return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                    <span>${city}</span>
                  </div>
                </div>
              <div class="city-info">
                <div class="top-left">
                  <img class="icon" src="/img/${getImage(
                    description
                  )}" alt="" />
                  <div class="description">${description}</div>
                </div>
                <div class="top-right">
                  <div class="city-info__subtitle">as of ${observationTime}</div>
                  <div class="city-info__title">${temperature}°</div>
                </div>
              </div>
            </div>
            <div id="properties">${renderProperty(properties)}</div>
          </div>`;
};

fetchData();
