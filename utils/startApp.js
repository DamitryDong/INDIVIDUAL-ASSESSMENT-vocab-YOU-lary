/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import domBuilder from '../DomWholeFrameBuilder/DomWholeFrameBuilder';
import logoutButton from '../LoginLogoutButtons/logoutButton';
import BuildnavBar from '../DomNavBar/DomNavFrame';
import showCards from '../DomWholeFrameBuilder/DomWordCardBuilder';
import { GetWord } from '../apiConnectFunctions/apiWords';
import allEvents from '../DomForm/AllEvents';
import formEvents from '../DomForm/FormEvents'
import navigationEvents from '../DomNavBar/NavEvent';

const startApp = (user) => {
   // eslint-disable-next-line no-console
  console.log("User UID:", user.uid);
  domBuilder();
  BuildnavBar();
  allEvents(user);
  formEvents(user);
  logoutButton();
  navigationEvents(user);

  GetWord(user.uid).then((Words) => showCards(Words));
};

export default startApp;
