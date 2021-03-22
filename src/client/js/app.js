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
const inputDestination = document.querySelector('.form__input-search');
const btnSubmitForm = document.querySelector('.form__input-submit');
export const btnDelete = document.querySelector('.btn-delete');
export const counddownTitle = document.querySelector('.countdown__title');
export const timeCards = document.querySelector('.time-cards');
const warning = document.querySelector('.main-form__warming');
// Weather info details
export const temp = document.querySelector('.temp');
export const enterCity = document.querySelector('.city');
export const weatherDescription = document.querySelector('.weather');
export const imgCountry = document.querySelector('.feature-plan__img-city');

// Links From APIs 

const urlGeonames = 'http://api.geonames.org/searchJSON?q=';
const urlCurrentWeatherbit = 'https://api.weatherbit.io/v2.0/current?lat=';
const urlDailytWeatherbit = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const urlPixabay = 'https://pixabay.com/api/?key=';
const urlEndPixabay = '&orientation=horizontal&category=buildings&per_page=3';


export async function getDataFromApi(e) {
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

            const location = await getDataFromGeonames(urlGeonames, inputDestinationValue, geonamesUsername)
            showItem()
            const {
                days
            } = getTime()
            if (days === -1 || days === 0) {
                const currentWeather = await getCurrentWeather(urlCurrentWeatherbit, {
                    latitude: location.geonames[0].lat,
                    longitude: location.geonames[0].lng,
                    country: location.geonames[0].countryName,
                }, weatherbitApiKey)
            } else if (days >= 1 && days <= 16) {
                const predictedWeather = await getPredictedWeather(urlDailytWeatherbit, {
                    latitude: location.geonames[0].lat,
                    longitude: location.geonames[0].lng,
                    country: location.geonames[0].countryName,
                }, weatherbitApiKey)
            } else {
                alertMoreDays()
                cleanUp()
                return false;
            }
            if (currentWeather) {
                const pixabayData = await getImgPixabay(urlPixabay, pixabayApiKey, country, urlEndPixabay {
                    temperature: currentWeather.data[0].temp,
                    descWeather: currentWeather.data[0].weather.description,
                })
            } else if (predictedWeather) {
                const pixabayData = await getImgPixabay(urlPixabay, pixabayApiKey, country, urlEndPixabay {
                        temperature: currentWeather.data[0].temp,
                        descWeather: currentWeather.data[0].weather.description,
                    }




                })
        }
    }
})
// asynchronous function to fetch the data 

const getDataFromGeonames = async (urlGeonames, inputDestinationValue, geonamesUsername) => {
    const res = await axios.get(`${urlGeonames}${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("error with geonames", error)
    }
}


const getCurrentWeather = async (urlCurrentWeatherbit, latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(`${urlCurrentWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error with current weather ')
    }
}

const getPredictedWeather = async (urlDailytWeatherbit, latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(`${urlDailytWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error with predicted weather ')
    }

}

const getImgPixabay = async (urlPixabay, pixabayApiKey, country, urlEndPixabay) => {
    const res = await axios.get(`${urlPixabay}${pixabayApiKey}&q=${country}${urlEndPixabay}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error with Pixabay ')
    }
}



// Show Items
const showItem = () => {
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}


// Function post date to my server 
// function postData(url, data) {
//     return fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(data) // strinfigify convert object into a string 
//     });
// };

// //  Function updateUI
// const updateUI = () => {
//     fetch('/all')
//         .then(res => res.json())
//         .then((json) => {
//             temp.innerHTML = `${Math.round(json.temp)}°C`
//             weatherDescription.innerHTML = json.weatherDescription;
//         })
// }



btnSubmitForm.addEventListener('click', getDataFromApi) btnSubmitForm.addEventListener('click', appUpTime) btnDelete.addEventListener('click', cleanUp)