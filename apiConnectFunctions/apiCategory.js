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

  export default GetCategory;