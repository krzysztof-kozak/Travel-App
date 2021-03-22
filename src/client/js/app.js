import {
    getTime,
    appUpTime
} from './getTime'

import {
    cleanUp
} from './cleanUp'

import {
    alertFn,
    alertMoreDays
} from './alertFunctions'

const axios = require('axios');
const spinner = document.querySelector('.spinner')
const inputDestination = document.querySelector('.form__input-search');
const btnSubmitForm = document.querySelector('.form__input-submit');
export const btnDelete = document.querySelector('.btn-delete');
export const counddownTitle = document.querySelector('.countdown__title')
export const timeCards = document.querySelector('.time-cards')
const warning = document.querySelector('.main-form__warming')
// Weather info details
export const temp = document.querySelector('.temp')
export const enterCity = document.querySelector('.city')
export const weatherDescription = document.querySelector('.weather')
export const imgCountry = document.querySelector('.feature-plan__img-city')


// Links From APIs 
const urlGeonames = 'http://api.geonames.org/searchJSON?q=';
const urlCurrentWeatherbit = 'https://api.weatherbit.io/v2.0/current?lat=';
const urlDailytWeatherbit = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const urlPixabay = 'https://pixabay.com/api/?key=';
const urlEndPixabay = '&orientation=horizontal&category=buildings&per_page=3';


export function getDataFromApi(e) {
    e.preventDefault()
    const inputDestinationValue = inputDestination.value;
    enterCity.innerHTML = inputDestination.value;

    if (inputDestinationValue === '') {
        alertFn()
        return false;
    }
    // receive api key from server side
    fetch('/api_data')
        .then((res) => res.json())
        .then((keys) => {
            const {
                geonamesUsername,
                weatherbitApiKey,
                pixabayApiKey
            } = keys
            //fetching lat and lng from geonames api
            axios.get(`${urlGeonames}${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
                .then((res) => {
                    const latitude = res.data.geonames[0].lat;
                    const longitude = res.data.geonames[0].lng;
                    const country = res.data.geonames[0].countryName;
                    showItem()
                    const {
                        days
                    } = getTime()
                    //fetching current weather from weatherbit
                    if (days === -1 || days === 0) {
                        axios.get(`${urlCurrentWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                            .then((res) => {
                                const temperature = res.data.data[0].temp;
                                const descWeather = res.data.data[0].weather.description
                                postData('/add', {
                                        temp: temperature,
                                        weatherDescription: descWeather,
                                    })
                                    .then((res) => {
                                        const responeJson = res.json();
                                        return responeJson
                                    })
                                    .then((res) => {
                                        console.log(res)
                                        updateUI();
                                    })
                            })
                    } else if (days >= 1 && days <= 16) {
                        // fetching predicted weather of the departure date
                        axios.get(`${urlDailytWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                            .then((res) => {
                                const temperature = res.data.data[0].temp;
                                const descWeather = res.data.data[0].weather.description
                                updateFields(temperature, descWeather)
                            })
                    } else {
                        alertMoreDays()
                        cleanUp()
                        return false;
                    }

                    //fetching pixabay image
                    axios.get(`${urlPixabay}${pixabayApiKey}&q=${country}${urlEndPixabay}`)
                        .then((res) => {
                            imgCountry.src = `${res.data.hits[0].webformatURL}`;
                        })
                })
        })
        .catch((err) => {
            console.log(err, 'something went wrong')
            warning.textContent = "We are sorry but something went wrong";
        })


}



// show Items
const showItem = () => {
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}


// Function post date to my server 
function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data) // strinfigify convert object into a string 
    });
};

//  Function updateUI
const updateUI = () => {
    fetch('/all')
        .then(res => res.json())
        .then((json) => {
            temp.innerHTML = `${Math.round(json.temp)}°C`
            weatherDescription.innerHTML = json.weatherDescription;
        })
}

// Function updateFields 
const updateFields = (temperature, descWeather) => {
    temp.innerHTML = `${Math.round(temperature)}°C`
    weatherDescription.innerHTML = descWeather;
}

// show and hide loading 
const showLoading = () => {
    spinner.classList.add('spinner--visible')
}

const hideLoading = () => {
    spinner.classList.remove('spinner--visible')
}



btnSubmitForm.addEventListener('click', getDataFromApi)
btnSubmitForm.addEventListener('click', appUpTime)
btnDelete.addEventListener('click', cleanUp)