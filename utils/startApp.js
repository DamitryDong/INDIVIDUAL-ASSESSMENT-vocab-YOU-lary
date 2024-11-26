import domBuilder from '../DomWholeFrameBuilder/DomWholeFrameBuilder';
import logoutButton from '../LoginLogoutButtons/logoutButton';
import BuildnavBar from '../DomNavBar/DomNavFrame';

const startApp = () => {
  domBuilder();
  BuildnavBar();
  logoutButton();
};

export default startApp;
