// import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const API_KEY =
//   'live_gqCDtXROVBYQEPNW3vLvgVi7ZXwNuvMNOnquLQrpKSOZsOhw5jDghmYIy1yEpyZw';
// const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
// axios.defaults.headers.common['x-api-key'] =
//   'live_gqCDtXROVBYQEPNW3vLvgVi7ZXwNuvMNOnquLQrpKSOZsOhw5jDghmYIy1yEpyZw';

const getSelect = document.querySelector('.breed-select');
const loaderAnswer = document.querySelector('.loader');
const errorAnswer = document.querySelector('.error');

// new SlimSelect({ select: '#loaderAnswer' });

fetchBreeds()
  .then(data => {
    // console.log(data);
    getSelect.insertAdjacentHTML('beforeend', createMarkUp(data));
    loaderAnswer.classList.replace('loader', 'loader-hidden');
  })
  .catch(error => {
    // console.log('Error!!!', error);
    errorAnswer.classList.replace('error', 'error-hidden');
  });

function createMarkUp(arr) {
  return (
    arr.map(({ id, name }) => `<option value=${id}>${name}</jption>`), join('')
  );
}

const getCat = document.querySelector('.cat-info');
fetchCatByBreed()
  .then(data => {
    // console.log(data);
    getCat.insertAdjacentHTML('beforeend', createMarkUpTo(data));
    loaderAnswer.classList.replace('loader', 'loader-hidden');
  })
  .catch(error => {
    // console.log('Error!!!', error);
    errorAnswer.classList.replace('error', 'error-hidden');
  });

function createMarkUpTo(arr) {
  return (
    arr.map(
      ({ url, id, width, height }) =>
        `<img src=https://cdn2.thecatapi.com/images/${id} width=${width} height=${height}>`
    ),
    join('')
  );
}
console.log(fetchCatByBreed('abys'));
