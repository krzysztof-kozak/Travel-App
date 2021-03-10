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

// coundown how soon the trip is
let usersTime;
let differenceTime;

// Weather info details

const temp = document.querySelector('.temp')
const enterCity = document.querySelector('.city')
const weatherDescription = document.querySelector('.weather')
const imgCountry = document.querySelector('.feature-plan__img-city')
// const imgIconOfWeather = document.querySelector('.weather-info__img-weather')



// API geonames api
//what we need latitude, longitude, country,

function getDataFromApi(e) {
    e.preventDefault()

    const inputDestinationValue = inputDestination.value;
    enterCity.innerHTML = inputDestination.value;

    if (inputDestinationValue === '') {
        warning.textContent = "😊 Please, enter your a travel destination ✈️ and the start date for travel 📅";
        noShow()
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
                fetch(`http://api.geonames.org/searchJSON?q=${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data)
                        const latitude = data.geonames[0].lat;
                        const longitude = data.geonames[0].lng;
                        const country = data.geonames[0].countryName;
                        // console.log(latitude, longitude, town, country)

                        //fetching current weather from weatherbit

                        if (differenceTime <= 7) {
                            fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log(data)
                                    temp.innerHTML = `${Math.round(data.data[0].temp)}°C`
                                    weatherDescription.innerHTML = `${data.data[0].weather.description}`;
                                    // imgIconOfWeather.src = `${data.data[0].weather.icon}`;
                                })
                        } else {
                            //fetching future weather from weatherbit
                            // predicted weather of the departure date
                            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log(data)
                                    temp.innerHTML = `${Math.round(data.data[0].temp)}°C`
                                    weatherDescription.innerHTML = `${data.data[0].weather.description}`;
                                })
                        }

                        //fetching pixabay image
                        fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${country}&orientation=horizontal&category=buildings&per_page=3`)
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data)
                                imgCountry.src = `${data.hits[0].webformatURL}`;
                               
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
    const currentTime = new Date();
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
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}

// const showItems = () => {
//     counddownTitle.classList.add('active')
//     timeCards.classList.add('active')
//     btnDelete.classList.add('active')
//     imgCountry.classList.add('active')
// }




//Delete trip 

function cleanUp() {
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

function noShow() {
    counddownTitle.style.display = 'none';
    timeCards.style.display = 'none';
    btnDelete.style.display = 'none'
    imgCountry.style.display = 'none'
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