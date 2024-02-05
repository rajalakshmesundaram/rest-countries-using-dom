async function getCountriesData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countriesData = await response.json();
  console.log(countriesData);
  return countriesData;
  
}
async function displayCountryCard(country) {
  const head=document.getElementById("title")
  head.innerText="country information"
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-header");
  cardTitle.textContent = country.name.common;

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const capital = document.createElement("p");
  capital.classList.add("card-text");
  capital.textContent = `Capital: ${
    country.capital ? country.capital[0] : "N/A"
  }`;

  const region = document.createElement("p");
  region.classList.add("card-text");
  region.textContent = `Region: ${country.region ? country.region : "N/A"}`;

  const countryCode = document.createElement("p");
  countryCode.classList.add("card-text-center");
  countryCode.textContent = `Country Code: ${
    country.cca3 ? country.cca3 : "N/A"
  }`;

  const flagImage = document.createElement("img");
  flagImage.src = country.flags.svg;
  flagImage.alt = "Country Flag";
  flagImage.classList.add("card-img-top");

  const weatherButton = document.createElement("button");
  weatherButton.classList.add("btn", "btn-primary");
  weatherButton.textContent = "Click for Weather";
  weatherButton.addEventListener("click", () => displayWeather(country));

  cardDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(flagImage);
  cardBodyDiv.appendChild(capital);
  cardBodyDiv.appendChild(region);
  cardBodyDiv.appendChild(countryCode);
  cardBodyDiv.appendChild(weatherButton);

  cardDiv.appendChild(cardBodyDiv);

  
  return cardDiv;
  
}

// Rest of your code remains unchanged

async function displayAllCountries() {
  const countriesData = await getCountriesData();

  const container = document.createElement("div");
  container.classList.add("container");

const row = document.createElement("div");
row.classList.add("row");


  for (const country of countriesData) {
     

    const colDiv = document.createElement("div");
    colDiv.classList.add("col-sm-6", "col-md-4","col-lg-4","col-xl-4");

    const countrycard = await displayCountryCard(country);
colDiv.appendChild(countrycard)
    row.appendChild(colDiv);
     
  }
  container.innerText=""
     container.appendChild(row);
    document.body.appendChild(container);

}
async function displayWeather(country) {
  const [lat, lon] = country.latlng;
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=75864cc60d93f4f2d1ef68ce9d0853d0`
  );
  const weatherData = await weatherResponse.json();

  alert(
    `Weather in ${country.name.common}:\nTemperature: ${weatherData.main.temp}°C\nDescription: ${weatherData.weather[0].description}`
  );
}

displayAllCountries();
