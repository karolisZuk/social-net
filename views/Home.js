import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ButtonSecondary } from '../components/Buttons';
import Firebase from '../Firebase';

export default class Home extends Component {

  logout(){
    Firebase.auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Authenticate');
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        <View style={styles.btnWrapper}>
          <ButtonSecondary onPress={()=>this.logout()}>Logout</ButtonSecondary>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnWrapper: {
    padding: 40,
    position: 'absolute',
    bottom: 0,
    left: '50%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
