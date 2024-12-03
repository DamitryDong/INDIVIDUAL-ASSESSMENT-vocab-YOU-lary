import { signIn } from '../utils/auth';

// GOOGLE LOGIN BUTTON
const loginButton = () => {
  const domString = '<div id="Logoutbuttonlocation"><button id="google-auth" class="btn btn-danger">Clickily, Clicky click (Google login)</button></div>';
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
