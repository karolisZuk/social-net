import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { ButtonPrimary } from '../components/Buttons';
import Firebase from '../Firebase';

export default class Post extends Component {
    constructor() {
        super();
        this.db = Firebase.db;
        this.state = {
            post: '',
            isLoading: false
        }
    }

    onPressPost() {
        if (!this.state.post) {
            return;
        }
        this.setState({isLoading: true})
        this.db.collection('posts').add({
            post: this.state.post,
            userId: Firebase.user.uid,
            userEmail: Firebase.user.email
        }).then(() => {
            this.setState({post: '', isLoading: false});
            this.props.navigation.navigate('Home');
        }).catch(err => {
            console.log(err);
        })

    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title}>Post</Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Whats going on?"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={text => this.setState({post: text})}
                        value={this.state.post}
                    />
                </View>
                <View style={styles.btnWrapper}>
                    <ButtonPrimary onPress={() => this.onPressPost()}>Post</ButtonPrimary>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35
    },
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAreaContainer: {
        width: '100%',
        borderColor: 'lightgrey',
        borderWidth: 1,
      },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    btnWrapper: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center'
    }
});
