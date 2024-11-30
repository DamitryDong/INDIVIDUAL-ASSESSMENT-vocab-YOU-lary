/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCategory = (array) => {
    clearDom();
    
    let domstring = ''
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
      />
      <button type="submit" class="btn btn-success" id="add-category-btn">Add Category</button>
    </div>
    </form>
  `;
       array.forEach((item) =>{
        domstring += `<div class="card w-50">
            <div class="card-body">
                <h5 class="card-title">${item.CategoryName}</h5>
                <button type="button" class="btn btn-primary" id="delete-category-btn__${item.firebasekey}">Delete</button>
            </div>
            </div>
        `
        }
    )
    renderToDOM('#form-container', domstring); // or your equivalent render function
}

export default showCategory