import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../LoginLogoutButtons/loginButton';
import client from './client';
import startApp from './startApp';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    // eslint-disable-next-line no-console
    console.log('Auth state changed:', user);
    if (user) {
      // person is logged in do something...;
      startApp(user);
    } else {
      // person is NOT logged in
      loginButton();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
