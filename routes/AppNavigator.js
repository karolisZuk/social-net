import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Home from './AuthenticatedNavigator';
import Authenticate from '../views/Authenticate';

//sis komponentas pagal musu paduotus parametrus pasirenka koki komponenta rodyti. Tai yra tarsi ejimas is vieno puslapio i kita
const C = createSwitchNavigator({
    Authenticate: {screen: Authenticate}, //Route pavadinimas: paramaterai, kaip pvz komponentas kuri uzkrauna
    Home: { screen: Home }
});

// Pagal naujausia react-navigation modulio dokumentacija, visi navigation objektai turi buti apvilkti AppContainer.
const AppNavigator = createAppContainer(C);

export default AppNavigator;