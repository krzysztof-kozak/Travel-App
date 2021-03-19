import './app'

//Global variable for coundown date
const eventDay = document.querySelector('#event-day');
const eventMonth = document.querySelector('#event-month');
const eventYear = document.querySelector('#event-year');
const daysCount = document.querySelector('.days-count');
const hoursCount = document.querySelector('.hours-count');
const minutesCount = document.querySelector('.minutes-count');
const secondsCount = document.querySelector('.seconds-count');


// id for interval Coundown seconds 
let intervalId;


export const getTime = () => {
    const currentTime = new Date();
    //the difference between now and the our enter date 
    const differenceTime = getUserTimeFromForm() - currentTime;
    //differenceTime is millisecond

    //1000 milisecond is 1 seconds , 1 minutes is 60 seconds , 1 hour is 60 minutes  1 day is 24 hours
    //Time calculations for days, hours, minutes, seconds from today`s date to our enter date
    const days = Math.floor(differenceTime / 1000 / 60 / 60 / 24);
    const hours = Math.floor(differenceTime / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(differenceTime / 1000 / 60) % 60;
    const seconds = Math.floor(differenceTime / 1000) % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
        currentTime,
    }


}


export const setTime = () => {
    const {
        days,
        hours,
        minutes,
        seconds,
    } = getTime()

    daysCount.textContent = days;
    hoursCount.textContent = hours;
    minutesCount.textContent = minutes;
    secondsCount.textContent = seconds;

}


export const getUserTimeFromForm = () => {
    return new Date(`${eventMonth.value} ${eventDay.value} ${eventYear.value}`)
}


export const appUpTime = () => {
    setTime();
    clearInterval(intervalId);
    intervalId = setInterval(setTime, 1000);
}