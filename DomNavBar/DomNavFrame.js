/* eslint-disable */
import renderToDOM from '../utils/renderToDom';

const BuildnavBar = () => {
  const domString = `
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand title" id="navTitle">Vocab <b>You</b> Lary</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#" id="myCards">My Cards</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="addCategory">My Category</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="Community">Community</a>
            </li>
          </ul>
            <form class="d-flex" role="search" id="search-form">
              <input id="search-input" class="form-control me-2" type="search" placeholder="Search My Cards" aria-label="Search" autocomplete="off">
              <button class="btn btn-outline-success" type="submit">Search</button>
              <div id="dropdown-results" class="dropdown-menu w-100" style="display: none;"></div>
            </form>
          <span class="navbar-text">
            <div id="logout-button" style="padding-left:150px;"></div>
          </span>
        </div>
      </div>
    </nav>`;

  renderToDOM('#navigation', domString);
};

export default BuildnavBar;