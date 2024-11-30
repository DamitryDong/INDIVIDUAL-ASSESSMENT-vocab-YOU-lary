/* eslint-disable quotes, indent, brace-style, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetCategory, GetPublicWord } from "../apiConnectFunctions/apiCategory";
import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCards = async (array, user, isPrivate) => {
    clearDom();

    let domstring = ''

    // ///////IF WE ARE ON THE MY CARD SCREEN
    if (isPrivate === true) {
      domstring += `
      <div class="text-4xl font-bold text-center my-4">
        <h2>MY CARDS</h2>
      </div>  
      `
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
      
      // If you are the user on MY CARDS have the buttons 
      array.forEach((item) =>{
        domstring += `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.wordName}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${item.Category}</h6>
            <p class="card-text">${item.definition}</p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Created: ${item.created}</h6>
            <button type="button" class="btn btn-danger" id="delete-card-btn--${item.firebaseKey}">Delete</button>
            <button type="button" class="btn btn-primary" id="edit-card-btn--${item.firebaseKey}">Edit</button>
            <button type="button" class="btn btn-warning" id="${item.communityStatus === "private" ? "goPublic-card-btn" : "goPrivate-card-btn"}--${item.firebaseKey}">
            ${item.communityStatus === "private" ? "Go Public" : "No Public"}
            </button>
        </div>
        `
        }
    )
    } 
    
    // IF WE ARE ON COMMUNITY SCREEN!!!
    //  Else is build in because community we want a way to have a filter for all the cards that are public
    else {
      domstring += `
      <div class="text-4xl font-bold text-center my-4">
        <h2>COMMUNITY!</h2>
      </div>  
      `
      try {
        const communityFilters = await GetPublicWord()
        communityFilters.forEach((category) => {
          domstring += `<button type="button" class="btn btn-outline-dark" id="catCOMFilterButton--${category.Category}">${category.Category}</button>`;
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      // Sort option newest to oldest
      domstring += `<button type="button" class="btn btn-secondary" id="sort-COM-dateNew-btn">Sort Newest</button>`
      // Sort option oldest to newest
      domstring += `<button type="button" class="btn btn-secondary" id="sort-COM-dateOld-btn">Sort Oldest</button>`
      // Sort option alphabetical
      domstring += `<button type="button" class="btn btn-secondary" id="sort-COM-alph-btn">Sort Alphabetical</button>`
      
      // If we are on community page, we don't want buttons
      array.forEach((item) =>{
        domstring += `<div class="card" style="width: 18rem;">
        <div class="card-body">

            <h5 class="card-title">
            ${item.wordName}
            ${item.uid === user.uid 
            ? `<span class="badge text-bg-secondary">Owner</span>` : ""}
            </h5>
            
            <h6 class="card-subtitle mb-2 text-body-secondary">${item.Category}</h6>
            <p class="card-text">${item.definition}</p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Created: ${item.created}</h6>
            ${item.uid === user.uid 
            ? `<button type="button" class="btn btn-warning" id="goPrivateCOM-card-btn--${item.firebaseKey}">No Public</button>` 
            : `<button type="button" class="btn btn-info" id="Copy-Community-card-btn--${item.firebaseKey}">Copy</button>`
            }
            
        </div>
        `
        }   
    )
    } 
    renderToDOM('#form-container',domstring);
}

export default showCards