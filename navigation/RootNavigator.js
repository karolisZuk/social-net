import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import RootNavigationHeader from '../components/RootNavigationHeader';
import Home from '../views/Home';
import Settings from '../views/Settings';
import Post from '../views/Post';
import Message from '../views/Message';
import Icon from 'react-native-vector-icons/Ionicons';

export default RootNavigator = createBottomTabNavigator({
    Home: createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                header: <RootNavigationHeader title='News feed' subtitle='Here is what you missed' />,
                animationEnabled: true
            }
        }
    }, {
        navigationOptions: {
            tabBarLabel: 'News feed',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    }),
    Post: createStackNavigator({
        Post: {
            screen: Post,
            navigationOptions: {
                header: <RootNavigationHeader title='Post' subtitle="What's on your mind?" />,
                animationEnabled: true
            }
        }
    }, {
        navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-megaphone" color={tintColor} size={24} />
            )
        }
    }),
    Message: createStackNavigator({
        Message: {
            screen: Message,
            navigationOptions: {
                header: <RootNavigationHeader title='Messages' subtitle="Say hi to someone" />,
                animationEnabled: true
            }
        }
    }, {
        navigationOptions: {
            tabBarLabel: 'Message',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-mail" color={tintColor} size={24} />
            )
        }
    }),
    Settings: createStackNavigator({
        Settings: {
            screen: Settings,
            navigationOptions: {
                header: <RootNavigationHeader title='Profile' subtitle="Update your info" />,
                animationEnabled: true
            }
        }
    }, {
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-contact" color={tintColor} size={24} />
            )
        }
    })
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        tabBarVisible: true
    },
    tabBarOptions: {
        activeTintColor: '#00aeef',
        inactiveTintColor: 'lightgrey'
    }
});