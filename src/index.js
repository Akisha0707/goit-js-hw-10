//підключаємо імпортовані файли
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

//звертаємось до дом-елементів
const getSelect = document.querySelector('.breed-select'); //випадаючий список
const getCat = document.querySelector('.cat-info'); //картинки котів і інформція
const loaderAnswer = document.querySelector('.loader');
const errorAnswer = document.querySelector('.error');

//стилізуємо елементи
errorAnswer.style.color = 'red';
getCat.style.display = 'flex';
getCat.style.gap = '20px';

errorAnswer.style.visibility = 'hidden';
loaderAnswer.style.visibility = 'hidden';
loaderAnswer.style.visibility = 'visibility';

// new SlimSelect({ select: '#getSelect' });

//обробляємо отриманий проміс колекції котів
fetchBreeds()
  .then(breeds => {
    getSelect.insertAdjacentHTML('beforeend', createMarkUp(breeds.data));
    loaderAnswer.style.visibility = 'visibility';
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(errorAnswer.textContent);
  });

//відмальовуємо елементи на сторінці у вигляді випадаючого списку
function createMarkUp(event) {
  return event
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

//додаємо прослуховувач на випадаючтй списол
getSelect.addEventListener('change', onGetElement);

function onGetElement(event) {
  fetchCatByBreed(this.value)
    .then(cat => {
      getCat.insertAdjacentHTML('beforeend', createMarkUpTo(cat.data));
      loaderAnswer.style.visibility = 'visibility';
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(errorAnswer.textContent);
    });
  getCat.innerHTML = '';
}

//відмальовуємо картинки і iформацію про котів на сторінці
function createMarkUpTo(event) {
  console.log(event);
  return event
    .map(
      ({ url, id }) =>
        `<img src=${url} id=${id}, width=450px, height=450px>
        <div class=header-cat>
        <h1>${event[0].breeds[0].name}</h1>
      <p>${event[0].breeds[0].description}</p>
      <h2>Temperament:</h2>${event[0].breeds[0].temperament}
      </div>`
    )
    .join('');
}
