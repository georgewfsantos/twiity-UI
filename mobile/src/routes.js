import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import Login from '../src/pages/Login';
import Timeline from '../src/pages/Timeline';
import New from '../src/pages/New';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator(
      {
        Timeline,
        New,
      },
      {
        defaultNavigationOptions: {
          headerTitleAlign: 'center',
        },
      },
    ),
  }),
);

export default Routes;
