import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './RootNavigator';
import Authenticate from '../views/Authenticate';

const C = createStackNavigator({
    Authenticate: {screen: Authenticate},
    Home: { screen: Home }
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AppNavigator = createAppContainer(C);

export default AppNavigator;