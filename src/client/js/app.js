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
            .then((config) => {
                console.log(config)

            })
    }




}



btnSubmitForm.addEventListener('click', getDataFromApi)


export {
    getDataFromApi,

}