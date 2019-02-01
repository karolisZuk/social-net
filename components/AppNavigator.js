import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Authenticate from '../views/Authenticate';

const C = createStackNavigator({
    Authenticate: {screen: Authenticate},
    Home: { screen: Home }
});

const AppNavigator = createAppContainer(C);

export default AppNavigator;