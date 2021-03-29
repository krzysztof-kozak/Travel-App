import {
    btnDelete,
    counddownTitle,
    timeCards,
    temp,
    enterCity,
    weatherDescription,
    imgCountry
} from './app'


//Delete info about trip 
export const cleanUp = () => {
    temp.innerHTML = "";
    weatherDescription.innerHTML = "";
    imgCountry.src = "";
    enterCity.innerHTML = "";
    counddownTitle.classList.remove('active');
    timeCards.classList.remove('active');
    btnDelete.classList.remove('active')
    imgCountry.classList.remove('active')
}