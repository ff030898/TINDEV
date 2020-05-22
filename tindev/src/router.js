import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

const mainNavigation = createSwitchNavigator({
  Login,
  Main,
});

export default createAppContainer(mainNavigation);