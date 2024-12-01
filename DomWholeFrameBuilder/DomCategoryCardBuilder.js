/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCategory = (array) => {
    clearDom();
    
    let domstring = '';
    domstring += `
      <form id="category-form" class="input-group mb-3">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="category-input"
            placeholder="Enter category name"
            aria-label="Category Name"
            required
            autocomplete="off" 
          />
          <button type="submit" class="btn btn-success" id="add-category-btn">Add Category</button>
        </div>
      </form>
    `;
    
    // Wrap the cards in a div with ID "CategoryCardDiv"
    domstring += `<div id="CategoryCardDiv">`;
    
    array.forEach((item) => {
      domstring += `
          <div class="card-body" style="border-radius: 5%; border: 2px solid white; padding: 30px; background-color: rgba(28, 28, 28, 0.954); color: white; width: 30%; height 200px;">
            <h5 class="card-title">${item.CategoryName}</h5>
            <button type="button" class="btn btn-dark" id="delete-category-btn__${item.firebasekey}">Delete</button>
          </div>
      `;
    });
    
    domstring += `</div>`; // Close the "CategoryCardDiv" div
    
    renderToDOM('#form-container', domstring); // or your equivalent render function
}

export default showCategory