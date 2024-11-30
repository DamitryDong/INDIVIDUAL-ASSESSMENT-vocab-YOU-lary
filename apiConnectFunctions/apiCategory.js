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

//GET COMMUNITY CATEGORY 
//First we get the words that are public
const GetPublicWord = () => new Promise((resolve, reject) => {
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

// GET CARD WITH GIVEN CATEGORY
const getCardInCategory = (categoryName, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Words.json?orderBy="Category"&equalTo="${categoryName}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // IF WE ARE GIVEN A UID
        if(uid) {        
          const filteredData = Object.values(data).filter((item) => item.uid === uid);
          resolve(filteredData);}
        // IF WE ARE NOT GIVEN A UID (FOR COMMUNITY PAGE)
        else {
          resolve(Object.values(data))
        }
        // Filter the fetched results to match the given uid
      } else {
        resolve([]); // No matching data
      }
    })
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

//  UPDATE CATEGORY
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
    GetPublicWord,
  }