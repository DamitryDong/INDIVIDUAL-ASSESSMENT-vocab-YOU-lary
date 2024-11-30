/* eslint-disable */
import client from "../utils/client";

const endpoint = client.databaseURL
// GET CATEGORY
const GetCategory = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Category.json?orderBy="uid"&equalTo="${uid}"`, {
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

// GET CARD WITH GIVEN CATEGORY
const getCardInCategory = (categoryName) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words.json?orderBy="Category"&equalTo="${categoryName}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// CREATE CATEGORY TODO:
const createCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Category.json`, {
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

//DELETE CATEGORY 
const deleteCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Category/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

//UPDATE CATEGORY
const updateCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Category/${payload.firebasekey}.json`, {
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

  export {
    GetCategory,
    getCardInCategory,
    createCategory,
    deleteCategory,
    updateCategory,
  }