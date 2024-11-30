/* eslint-disable */
import client from "../utils/client";

const endpoint = client.databaseURL
// GET YOUR CARDS
const GetWord = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Words.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// GET SINGLE CARD INFO
const getSingleCard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, 
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// CREATE CARD
const createWord = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then((response) => response.json())
  .then((data) => resolve(data)) // On success, resolve with the data
  .catch((error) => reject(error)); // Reject if there's an error
});

//DELETE CARD
const deleteWord = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

//UPDATE CARD
const updateWord = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET COMMUNITY CARDS (PUBLIC CARDS)
const GetCommunityWords = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words.json?orderBy="communityStatus"&equalTo="public"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});


export {
  GetWord,
  createWord, 
  deleteWord,
  updateWord,
  getSingleCard,
  GetCommunityWords,
}