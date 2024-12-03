/* eslint-disable quotes, indent, brace-style, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetCategory, GetPublicWord } from "../apiConnectFunctions/apiCategory";
import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCards = async (array, user, isPrivate, isStudy, isFilter) => {
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

    // Sort options, stacked vertically  ** ALSO I DID SOME INLINE STYLING FOR THE STUDY CARD BTN THAT I CREATED DONT DO THIS USUALLY
    domstring += `
      <button type="button" class="btn btn-secondary mb-2" id="sort-dateNew-btn" style="width: 200px;">Sort Newest</button>
      <button type="button" class="btn btn-secondary mb-2" id="sort-dateOld-btn"style="width: 200px;">Sort Oldest</button>
      <button type="button" class="btn btn-secondary mb-2" id="sort-alph-btn"style="width: 200px;">Sort Alphabetical</button>
      <button type="button" class="btn btn-success mb-2" id="add-card-btn" style="width: 200px ;">Add Card</button>
    </div>`

    // Category filter buttons on a new line
    domstring += `<div class="text-center mb-4" id="OurCategory">`;

    try {
      const categories = await GetCategory(user.uid); // Wait for the categories to be fetched
      categories.forEach((category) => {
        domstring += `<button type="button" style="border-radius: 0; border-top:4px solid black; border-left:2px; border-right: 2px; border-bottom: 2px;" class="btn btn-outline-dark" id="catFilterButton--${category.CategoryName}">${category.CategoryName}</button>`;
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
              <div>
                ${item.communityStatus === "public" ? `<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">Shared Card</span>` : ""}
              </div>
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
                <button type="button" class="btn btn-warning" id="${item.communityStatus === "private" ? "goPublic-card-btn" : "goPrivate-card-btn"}--${item.firebaseKey}">
                  ${item.communityStatus === "private" ? "📤" : "📥"}
                </button>
                <button type="button" class="btn btn-primary" id="edit-card-btn--${item.firebaseKey}">✏️</button>
                <button type="button" class="btn btn-danger" id="delete-card-btn--${item.firebaseKey}">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    if (isFilter === true) {
      domstring += `
      <div class="text-center mb-5";>
      <style>
        #study-card-btn:hover {
          transform: scale(1.1); 
          transition: transform .3s ease-in-out; 
        }
      </style>
      <button type="button" class="btn btn-primary mb-2" id="study-card-btn" 
          style="width: 120px;
          height: 120px; 
          border-top-left-radius: 50%; 
          border-bottom-left-radius: 50%; 
          position: absolute; 
          right: 0px; 
          margin-left: 0; 
          font-family: 'Baloo 2', cursive; 
          font-size: 24px; 
          font-weight: bold;" 
      >Study These</button>
    </div>`;
    }

    domstring += `</div>`;
  }
  
  //  SECTION FOR STUDY////////////////
 else if (isStudy === true) {
  domstring += `<div style="padding-top: 60px"></div>`
  array.forEach((item) => {
    domstring += `
      <div class="card-study">
          <div class="card-Name">
            <div class="card-body">
              <h2 class="card-title" style="padding-top: 60px;"><b style="font-size: 50px">${item.wordName}</b></h4>
                <div class="card-def">
                  <p class="card-definition-study">${item.definition}</p>
                </div>
            </div>
          </div>
      </div>
    `;
  });
}

  // IF WE ARE ON COMMUNITY SCREEN!!!
  else {
    // Title for community screen
    domstring += `
      <div class="text-4xl font-bold text-center my-4" id="MyCardTitle">
        <h1><b><span class="rainbow-text">Community</span></b></h1>
      </div>
    `;
    
    // Sort options for community screen
    domstring += `
      <div class="text-center mb-4" id="noCategoryfilter">
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-dateNew-btn" style="width: 200px;">Sort Newest</button>
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-dateOld-btn" style="width: 200px;">Sort Oldest</button>
        <button type="button" class="btn btn-secondary mb-2" id="sort-COM-alph-btn" style="width: 200px;">Sort Alphabetical</button>
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
        domstring += `<button type="button" style="border-radius: 0; border-top:4px solid black; border-left:2px; border-right: 2px; border-bottom: 2px;" class="btn btn-outline-dark" id="catCOMFilterButton--${category.Category}">${category.Category}</button>`;
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
            <div class="card-front" style="background-color:${item.uid !== user.uid ? "#d4e8e6f9" : ""};color:${item.uid !== user.uid ? "black" : ""};">
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
                  ? `<button type="button" class="btn btn-warning" id="goPrivateCOM-card-btn--${item.firebaseKey}">📥</button>` 
                  : `<button type="button" class="btn btn-dark" id="Copy-Community-card-btn--${item.firebaseKey}">✙</button>`}
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
