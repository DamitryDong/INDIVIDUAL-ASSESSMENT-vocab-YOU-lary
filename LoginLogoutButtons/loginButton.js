import { signIn } from '../utils/auth';

// GOOGLE LOGIN BUTTON
const loginButton = () => {
  const domString = '<h3>Welcome to Vocab-YOU-lary</h3><button id="google-auth" class="btn btn-danger">GOOGLE LOGIN</button>';
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
