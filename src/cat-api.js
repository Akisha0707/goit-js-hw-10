import axios from 'axios';
//апи ключ до TheCatApi
const API_Key =
  'live_gqCDtXROVBYQEPNW3vLvgVi7ZXwNuvMNOnquLQrpKSOZsOhw5jDghmYIy1yEpyZw';

//назва сайту,куди відправляємо запит
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common['x-api-key'] =
  'live_gqCDtXROVBYQEPNW3vLvgVi7ZXwNuvMNOnquLQrpKSOZsOhw5jDghmYIy1yEpyZw';

//отримуємо проміс всієї колекції порід собак

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
  // .then(breeds => console.log(breeds.data));
}

//отримуємо проміс всіх картинок котів
function fetchCatByBreed(breed_ids) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed_ids}`
  );
  // .then(cat => console.log(cat.data));
}

//експортуємо дані на сторінку index.js
export { fetchBreeds, fetchCatByBreed };
