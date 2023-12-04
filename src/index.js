import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_gqCDtXROVBYQEPNW3vLvgVi7ZXwNuvMNOnquLQrpKSOZsOhw5jDghmYIy1yEpyZw';

console.log(
  axios.get('https://api.thecatapi.com/v1/images/search?breed_ids=beng,abys')
);

// fetchCatByBreed(breedId) {
//     return
// };
// select.breed-select
