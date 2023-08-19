// import { Option } from 'slim-select/dist/store';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.js-loader');

loader.hidden = false;

function getDataCats() {
  fetchBreeds()
    .then(data => {
      breedSelect.insertAdjacentHTML('beforeend', createMarcup(data));
      breedSelect.hidden = false;
      loader.hidden = true;
    })
    .catch(() => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loader.hidden = true;
    });
}
getDataCats();

function createMarcup(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id} >${name}</option>`)
    .join('');
}
breedSelect.addEventListener('input', handlerClick);

function handlerClick(evt) {
  loader.hidden = false;
  divCatInfo.setAttribute('hidden', true);

  fetchCatByBreed(evt.target.value)
    .then(data => {
      divCatInfo.innerHTML = createMarcupCard(data);
      loader.hidden = true;
      divCatInfo.hidden = false;
    })
    .catch(() => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loader.hidden = true;
    });
}

function createMarcupCard(arr) {
  const url = arr.map(({ url }) => url);

  return arr
    .flatMap(array => array.breeds)
    .flatMap(({ temperament, name, description }) => {
      return `<div class="div-cat">
      <img src="${url}" alt="${name}" width="500">
      <div>
         <h2>${name}</h2>
         <p>${description}</p>
        <h3>Temperament: <span>${temperament}</span></h3>
        </div>
    </div>`;
    })
    .join('');
}
