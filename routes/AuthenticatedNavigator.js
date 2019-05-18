import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
// @Depricated, use if you want old header without animations.
import AuthenticatedNavigatorHeader from '../components/AuthenticatedNavigatorHeader';
import Home from '../views/Home';
import Settings from '../views/Settings';
import Post from '../views/Post';
import Message from '../views/Message';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraView from '../views/CameraView';

export default AuthenticatedNavigator = createMaterialTopTabNavigator({
    Home: createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                animationEnabled: true
            }
        }
    }, {
        headerMode: 'none',
            navigationOptions: {
            headerVisible: false,
        },
        navigationOptions: {
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={20} />
            )
        }
    }),
    Post: createStackNavigator({
        Post: {
            screen: Post,
            navigationOptions: {
                animationEnabled: true
            }
        },
        CameraView: {
            screen: CameraView,
            navigationOptions: {
                animationEnabled: true
            }
        }
    }, {
        headerMode: 'none',
            navigationOptions: {
            headerVisible: false,
        },
        navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-megaphone" color={tintColor} size={20} />
            )
        }
    }),
    Message: createStackNavigator({
        Message: {
            screen: Message,
            navigationOptions: {
                animationEnabled: true
            }
        }
    }, {
        headerMode: 'none',
            navigationOptions: {
            headerVisible: false,
        },
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-mail" color={tintColor} size={20} />
            )
        }
    }),
    Settings: createStackNavigator({
        Settings: {
            screen: Settings,
            navigationOptions: {
                animationEnabled: true
            }
        }
    }, {
        headerMode: 'none',
            navigationOptions: {
            headerVisible: false,
        },
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-contact" color={tintColor} size={20} />
            )
        }
    })
}, {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    optimizationsEnabled: true,
    tabBarOptions: {
        activeTintColor: '#ffc928',
        inactiveTintColor: 'white',
        showIcon: true,
        tabStyle: {
            backgroundColor: '#203c4a'
        },
        labelStyle: {
            fontSize: 12
        }
    }
});