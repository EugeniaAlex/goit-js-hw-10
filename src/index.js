
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


// console.log(countryCardTpl);

const DEBOUNCE_DELAY = 300;

const inputSearchEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

function onCountryRequest(name) {
    const FILTER = '?fields=name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
        return response.json();
    })
    .then(onRenderMarkup)
    .catch(error => {
        Notify.failure("Oops, there is no country with that name");
    });
 };


inputSearchEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY)); 

function onCountrySearch(event) {
    event.preventDefault();

    // const inputEv = event.currentTarget;
    const inputValue = inputSearchEl.value;

    onCountryRequest(inputValue.trim());
};
 
function onRenderMarkup(country) {

    if (country.length >= 10 && inputSearchEl.value !== "") {
        countryListEl.innerHTML = "";
        Notify.info("Too many matches found. Please enter a more specific name.");    
    }
    if (country.length > 2 && country.length < 10) {
        countryInfoEl.innerHTML = "";
          
        const markupCountryList = countryListTpl(country);

        countryListEl.innerHTML = markupCountryList;
        const markup = country.map(el => { return countryListTpl(el);}).join('');
    countryListEl.innerHTML = markup;

    }
    if (country.length === 1) {
        countryListEl.innerHTML = "";
        const markupCountryCard = countryCardTpl(country[0]);
        countryInfoEl.innerHTML = markupCountryCard;
        return;
    }
    if (inputSearchEl.value === "") {
        countryListEl.innerHTML = "";
        countryInfoEl.innerHTML = "";

    };
    
 };