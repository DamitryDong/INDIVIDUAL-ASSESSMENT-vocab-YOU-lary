/* eslint-disable quotes, indent, brace-style, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetCategory, GetPublicWord } from "../apiConnectFunctions/apiCategory";
import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCards = async (array, user, isPrivate) => {
  clearDom();

  let domstring = '';

  // /////// IF WE ARE ON THE MY CARD SCREEN
  if (isPrivate === true) {
    // Center and take up the whole top space for title
    domstring += `
      <div class="text-4xl font-bold text-center my-4" id="MyCardTitle">
        <h1><b>My Cards</b></h1>
      </div>
    `;
    
    // Add spacing between the title and buttons
    domstring += `<div class="text-center mb-4" id="noCategoryfilter">`;

    // Sort options, stacked vertically
    domstring += `
      <button type="button" class="btn btn-secondary mb-2" id="sort-dateNew-btn">Sort Newest</button>
      <button type="button" class="btn btn-secondary mb-2" id="sort-dateOld-btn">Sort Oldest</button>
      <button type="button" class="btn btn-secondary mb-2" id="sort-alph-btn">Sort Alphabetical</button>
      <button type="button" class="btn btn-success mb-2" id="add-card-btn">Add Card</button>
    </div>`;
    
    // Category filter buttons on a new line
    domstring += `<div class="text-center mb-4" id="OurCategory">`;

    try {
      const categories = await GetCategory(user.uid); // Wait for the categories to be fetched
      categories.forEach((category) => {
        domstring += `<button type="button" class="btn btn-outline-dark mb-2" id="catFilterButton--${category.CategoryName}">${category.CategoryName}</button>`;
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    
    domstring += `</div><div id="MyCardsFlex">`;

    // Add cards
    array.forEach((item) => {
      domstring += `
        <div class="card">
          <div class="card-inner">
            <!-- Front Side (Initially visible) -->
            <div class="card-front">
              <div class="card-body">
                <h4 class="card-title"><b>${item.wordName}</b></h4>
                <h6 class="card-subtitle"><b>${item.Category}</b></h6>
                <h7 class="card-subtitle-smaller">Created: ${item.created}</h7>
              </div>
            </div>

            <!-- Back Side (Initially hidden) -->
            <div class="card-back">
              <div class="card-body">
                <p class="card-definition">${item.definition}</p>
                <button type="button" class="btn btn-danger" id="delete-card-btn--${item.firebaseKey}">Delete</button>
                <button type="button" class="btn btn-primary" id="edit-card-btn--${item.firebaseKey}">Edit</button>
                <button type="button" class="btn btn-warning" id="${item.communityStatus === "private" ? "goPublic-card-btn" : "goPrivate-card-btn"}--${item.firebaseKey}">
                  ${item.communityStatus === "private" ? "Share" : "Unshare"}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    domstring += `</div>`;
  }
  
  // IF WE ARE ON COMMUNITY SCREEN!!!
  else {
    // Title for community screen
    domstring += `
      <div class="text-4xl font-bold text-center my-4" id="MyCardTitle">
        <h1><b>Community</b></h1>
      </div>
    `;
    
    // Sort options for community screen
    domstring += `
      <div class="text-center mb-4" id="noCategoryfilter">
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-dateNew-btn">Sort Newest</button>
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-dateOld-btn">Sort Oldest</button>
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-alph-btn">Sort Alphabetical</button>
      </div>
    `;

    // Category filter buttons for community screen
    domstring += `<div class="text-center mb-4" id="OurCategory">`;

    try {
      const communityFilters = await GetPublicWord(); // Wait for the community categories to be fetched 
      //  THIS IS USED TO FILTER OUT DUPLICATES
      const uniqueCategories = Array.from(new Set(communityFilters.map((item) => item.Category)))
      .map((category) => communityFilters.find((item) => item.Category === category));
  
    // Add the unique categories to the DOM
    uniqueCategories.forEach((category) => {
        domstring += `<button type="button" class="btn btn-outline-dark mb-2" id="catCOMFilterButton--${category.Category}">${category.Category}</button>`;
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    domstring += `</div>`;
    
    // If we are on the community page, we don't want "Add Card" or "Delete" buttons
    domstring += `<div id="MyCardsFlex">`;
    
    array.forEach((item) => {
      domstring += `
        <div class="card">
          <div class="card-inner">
            <!-- Front Side (Initially visible) -->
            <div class="card-front">
              <div class="card-body-front">
                <div>
                  ${item.uid === user.uid ? `<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">Your Card</span>` : ""}
                </div>
                <h4 class="card-title"><b>${item.wordName}</b></h4>
                <h6 class="card-subtitle"><b>${item.Category}</b></h6>
                <h7 class="card-subtitle-smaller">Created: ${item.created}</h7>
              </div>
            </div>

            <!-- Back Side (Initially hidden) -->
            <div class="card-back">
              <div class="card-body">
                <p class="card-definition">${item.definition}</p>
                ${item.uid === user.uid 
                  ? `<button type="button" class="btn btn-warning" id="goPrivateCOM-card-btn--${item.firebaseKey}">Unshare</button>` 
                  : `<button type="button" class="btn btn-info" id="Copy-Community-card-btn--${item.firebaseKey}">Copy</button>`}
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    domstring += `</div>`;
  }
  
  renderToDOM('#form-container', domstring);
};

export default showCards;
