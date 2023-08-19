import axios from "axios";

 axios.defaults.headers.common["x-api-key"] = "live_Va0eUJzG3zNDYiwOWt7XJdQ7DSKYQfhgYi8ahPtYovPp5HoShX7tVSsvePWBu0HR ";

const BASES_URL = 'https://api.thecatapi.com/v1/'
const SEARCH_URL ='https://api.thecatapi.com/v1/images/search'
function fetchBreeds(){
  return  fetch(`${BASES_URL}breeds`).then(resp => {
       if(!resp.ok){
        throw new Error(resp.status)
       }
    return resp.json()
    })


}

function fetchCatByBreed(breedId){
 return fetch(` ${SEARCH_URL}?breed_ids=${breedId}&api_key=live_Va0eUJzG3zNDYiwOWt7XJdQ7DSKYQfhgYi8ahPtYovPp5HoShX7tVSsvePWBu0HR`).then(resp => {
    if(!resp.ok){
     throw new Error(resp.status)
    }
 return resp.json()
 })
}


export {fetchBreeds, fetchCatByBreed}