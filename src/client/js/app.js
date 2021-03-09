const inputDestination = document.querySelector('.form__input-search')
const inputDateOfTravel = document.querySelector('.form__input-date')
const btnSubmitForm = document.querySelector('.form__input-submit')
const warning = document.querySelector('.warning__text')

// Current Date 
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;




// API geonames api
//what we need latitude, longitude, country,




function getDataFromApi(e) {
    e.preventDefault()

    const inputDestinationValue = inputDestination.value;
    const dateofTravelValue = inputDateOfTravel.value;

    if (inputDestinationValue === '' && dateofTravelValue === '') {
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



btnSubmitForm.addEventListener('click', getDataFromApi)


export {
    getDataFromApi,

}