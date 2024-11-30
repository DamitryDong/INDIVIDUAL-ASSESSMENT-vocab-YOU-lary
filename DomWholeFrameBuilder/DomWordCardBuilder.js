/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetCategory } from "../apiConnectFunctions/apiCategory";
import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCards = async (array, user) => {
    clearDom();

    let domstring = ''

    try {
        const categories = await GetCategory(user.uid); // Wait for the categories to be fetched
        categories.forEach((category) => {
          domstring += `<button type="button" class="btn btn-outline-dark" id="catFilterButton--${category.CategoryName}">${category.CategoryName}</button>`;
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      
    // Sort option newest to oldest
    domstring += `<button type="button" class="btn btn-secondary" id="sort-dateNew-btn">Sort Newest</button>`
    // Sort option oldest to newest
    domstring += `<button type="button" class="btn btn-secondary" id="sort-dateOld-btn">Sort Oldest</button>`
    // Sort option alphabetical
    domstring += `<button type="button" class="btn btn-secondary" id="sort-alph-btn">Sort Alphabetical</button>`
    // Add card button
    domstring += '<button type="button" class="btn btn-success" id="add-card-btn">add card</button>'

    array.forEach((item) =>{
        domstring += `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.wordName}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${item.Category}</h6>
            <p class="card-text">${item.definition}</p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Created: ${item.created}</h6>
            <button type="button" class="btn btn-danger" id="delete-card-btn--${item.firebaseKey}">Delete</button>
            <button type="button" class="btn btn-primary" id="edit-card-btn--${item.firebaseKey}">Edit</button>
        </div>
        </div>
        `
        }
    )
    renderToDOM('#form-container',domstring);
}

export default showCards