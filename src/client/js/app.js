const axios = require('axios');

const inputDestination = document.querySelector('.form__input-search');
const btnSubmitForm = document.querySelector('.form__input-submit');
const warning = document.querySelector('.warning__text');
const btnDelete = document.querySelector('.btn-delete');
//Global variable for coundown date
const eventDay = document.querySelector('#event-day');
const eventMonth = document.querySelector('#event-month');
const eventYear = document.querySelector('#event-year');
const daysCount = document.querySelector('.days-count');
const hoursCount = document.querySelector('.hours-count');
const minutesCount = document.querySelector('.minutes-count');
const secondsCount = document.querySelector('.seconds-count');
const counddownTitle = document.querySelector('.countdown__title')
const timeCards = document.querySelector('.time-cards')
let usersTime;
let differenceTime;
let currentTime;

// Weather info details
const temp = document.querySelector('.temp')
const enterCity = document.querySelector('.city')
const weatherDescription = document.querySelector('.weather')
const imgCountry = document.querySelector('.feature-plan__img-city')

// Api keys for submission purpose
const geonamesUsername = 'karolina'
const pixabayApiKey = '20598717-3c4f9262e5a960e1db9ad6571'
const weatherbitApiKey = '72fa43f538bb4b0eb570bfa7cfc92a4b'



// API geonames api
//what we need latitude, longitude, country
function getDataFromApi(e) {
    e.preventDefault()
    const inputDestinationValue = inputDestination.value;
    enterCity.innerHTML = inputDestination.value;
    if (inputDestinationValue === '') {
        alertFn()
        return false;

    } else {
        // receive api key from server side
        fetch('/api_data')
            .then((res) => res.json())
            .then((keys) => {
                console.log(keys)
                const geonamesUsername = keys.geonamesUsername;
                const weatherbitApiKey = keys.weatherbitApiKey;
                const pixabayApiKey = keys.pixabayApiKey;
                //fetching lat and lng from geonames api
                axios.get(`http://api.geonames.org/searchJSON?q=${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
                    .then((res) => {
                        console.log(res)
                        const latitude = res.data.geonames[0].lat;
                        const longitude = res.data.geonames[0].lng;
                        const country = res.data.geonames[0].countryName;
                        // console.log(latitude, longitude, town, country)
                        showItem()
                            //fetching current weather from weatherbit
                        if (currentTime) {
                            axios.get(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => {
                                    console.log(res)
                                    const temperature = res.data.data[0].temp;
                                    temp.innerHTML = `${Math.round(temperature)}°C`
                                    const descWeather = res.data.data[0].weather.description
                                    weatherDescription.innerHTML = descWeather;
                                })
                        } else {
                            //fetching future weather from weatherbit
                            // predicted weather of the departure date
                            axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => {
                                    console.log(res)
                                    temp.innerHTML = `${Math.round(res.data.data[0].temp)}°C`
                                    weatherDescription.innerHTML = `${res.data.data[0].weather.description}`;
                                })
                        }

                        //fetching pixabay image
                        axios.get(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${country}&orientation=horizontal&category=buildings&per_page=3`)
                            .then((res) => {
                                console.log(res)
                                imgCountry.src = `${res.data.hits[0].webformatURL}`;

                            })
                    })
            })
            .catch((err) => {
                console.log(err, 'something went wrong')
            })
    }
}


//Time calculations for days, hours, minutes, seconds from today`s date to our enter date
const setTime = () => {
    currentTime = new Date();
    //the difference between now and the our enter date 
    differenceTime = usersTime - currentTime;
    // console.log(differenceTime) // millisecond

    //1000 milisecond is 1 seconds , 1 minutes is 60 seconds , 1 hour is 60 minutes  1 day is 24 hours
    const days = Math.floor(differenceTime / 1000 / 60 / 60 / 24);
    const hours = Math.floor(differenceTime / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(differenceTime / 1000 / 60) % 60;
    const seconds = Math.floor(differenceTime / 1000) % 60;

    daysCount.textContent = days;
    hoursCount.textContent = hours;
    minutesCount.textContent = minutes;
    secondsCount.textContent = seconds;

}

const appUpDate = () => {
    //our enter date 
    usersTime = new Date(`${eventMonth.value} ${eventDay.value} ${eventYear.value}`)
    setTime();
}

// show Items

const showItem = () => {
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}


//Delete trip 
const cleanUp = () => {
    temp.innerHTML = "";
    weatherDescription.innerHTML = "";
    imgCountry.src = "";
    warning.textContent = "";
    enterCity.innerHTML = "";
    counddownTitle.classList.remove('active');
    timeCards.classList.remove('active');
    btnDelete.classList.remove('active')
    imgCountry.classList.remove('active')
}


// alert 
function alertFn() {
    alert("😊 Please, enter your a travel destination ✈️ and the start date for travel 📅");
}


btnSubmitForm.addEventListener('click', getDataFromApi)
btnSubmitForm.addEventListener('click', appUpDate)
btnDelete.addEventListener('click', cleanUp)

setInterval(setTime, 1000)




export {
    getDataFromApi,
    appUpDate,
    setTime,
}