//підключаємо імпортовані файли
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

//звертаємось до дом-елементів
const getSelect = document.querySelector('.breed-select');
const loaderAnswer = document.querySelector('.loader');
const errorAnswer = document.querySelector('.error');
const getCat = document.querySelector('.cat-info');

//стилізуємо елементи
getSelect.style.fontSize = '20px';
// getSelect.style.borderRadius = '';
errorAnswer.style.color = 'red';
getCat.style.display = 'flex';
getCat.style.gap = '20px';

new SlimSelect({ select: '#loader' });

//обробляємо отриманий проміс колекції котів
fetchBreeds()
  .then(breeds => {
    getSelect.insertAdjacentHTML('beforeend', createMarkUp(breeds.data));
    getSelect.classList.replace('error', 'error-hidden');
    loaderAnswer.classList.replace('.loader', '.loader-hidden');
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(errorAnswer.textContent);
    loaderAnswer.classList.replace('.loader', '.loader-hidden');
    getSelect.classList.replace('error', 'error-hidden');
  });

//відмальовуємо елементи на сторінці у вигляді випадаючого списку
function createMarkUp(event) {
  return event
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

//обробляємо отриманий проміс картинок
fetchCatByBreed('acur')
  .then(cat => {
    // console.log(cat);
    getCat.insertAdjacentHTML('beforeend', createMarkUpTo(cat.data));
    // loaderAnswer = 'false';
    loaderAnswer.classList.replace('.loader', '.loader-hidden');
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(errorAnswer.textContent);
    getCat.classList.replace('error', 'error-hidden');
  });

//відмальовуємо картинки і iформацію про котів на сторінці
function createMarkUpTo(event) {
  console.log(event);
  return event
    .map(
      ({ url, id }) =>
        `<img src=${url} id=${id}, width=500px, height=500px>
        <div class=header-cat>
        <h1>${event[0].breeds[0].name}</h1>
      <p>${event[0].breeds[0].description}</p>
      <h2>Temperament:</h2>${event[0].breeds[0].temperament}
      </div>`
    )
    .join('');
}
