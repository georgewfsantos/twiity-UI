import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from '../src/pages/Login';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
  }),
);

export default Routes;
