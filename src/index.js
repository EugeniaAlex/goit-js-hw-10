import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputSearchEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

fetch('https://restcountries.com/v3.1/name/peru')
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        const markup = countryCardTpl(country);
    })
    .catch(error => {
        console.log(error);
    });