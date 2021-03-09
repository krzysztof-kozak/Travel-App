const inputDestination = document.querySelector('.form__input-search')
const inputDateOfTravel = document.querySelector('.form__input-date')
const btnSubmitForm = document.querySelector('.form__input-submit')
const warning = document.querySelector('.warning__text')

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









// API geonames api
//what we need latitude, longitude, country,




function getDataFromApi(e) {
    e.preventDefault()

    const inputDestinationValue = inputDestination.value;


    if (inputDestinationValue === '') {
        warning.textContent = "😊 Please, enter your a travel destination ✈️ and the start date for travel 📅";
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
                        const town = data.geonames[0].name
                        console.log(latitude, longitude, country, town)

                    })
            })

    }




}


// coundown how soon the trip is
let usersTime;


//Time calculations for days, hours, minutes, seconds from today`s date to our enter date
const setTime = () => {
    const currentTime = new Date();
    //the difference between now and the our enter date 
    const differenceTime = usersTime - currentTime;
    console.log(differenceTime) // millisecond

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
    console.log(usersTime)
    setTime()
}


function activeClass() {
    counddownTitle.classList.toggle('active')
    timeCards.classList.toggle('active')
}





btnSubmitForm.addEventListener('click', getDataFromApi)
btnSubmitForm.addEventListener('click', activeClass)
btnSubmitForm.addEventListener('click', appUpDate)

appUpDate()
setInterval(setTime, 1000)








export {
    getDataFromApi,
    activeClass,
    appUpDate,
    setTime,
    

}