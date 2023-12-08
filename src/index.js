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
const getCat = document.querySelector('.cat-info');

new SlimSelect({ select: '#getSelect' });

fetchBreeds()
  .then(breeds => {
    console.log(breeds.data);
    getSelect.insertAdjacentHTML('beforeend', createMarkUp(breeds.data));
    getSelect.classList.replace('error', 'error-hidden');
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(errorAnswer.textContent);
    loaderAnswer.classList.replace('.loader', '.loader-hidden');
  });

function createMarkUp(arr) {
  return (
    arr.map(({ id, name }) => `<option value=${id}>${name}</option>`), join('')
  );
}

fetchCatByBreed('abys')
  .then(cat => {
    console.log(cat.data);
    getCat.insertAdjacentHTML('beforeend', createMarkUpTo(cat.data));
    getCat.classList.replace('error', 'error-hidden');
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(errorAnswer.textContent);
    loaderAnswer.classList.replace('.loader', '.loader-hidden');
  });

function createMarkUpTo(arr) {
  console.log(arr);
  return (
    arr.map(
      ({ url, id, width, height }) =>
        `<img src=${url} id=${id} width=${width} height=${height}>`
    ),
    join('')
  );
}
