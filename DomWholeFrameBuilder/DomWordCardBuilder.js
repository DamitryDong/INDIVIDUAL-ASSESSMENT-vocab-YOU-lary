/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCards = (array) => {
    clearDom();
    
    let domstring = ''
    domstring += '<button type="button" class="btn btn-success" id="add-card-btn">add card</button>'
    array.forEach((item) =>{
        domstring += `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.wordName}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${item.Category}</h6>
            <p class="card-text">${item.definition}</p>
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