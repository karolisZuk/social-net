import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { ButtonPrimary, ButtonSecondary } from '../components/Buttons';
import Firebase from '../Firebase';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.db = Firebase.db;
        this.state = {
            post: '',
            isLoading: false,
            error: ''
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
            userEmail: Firebase.user.email,
            postDate: new Date().toISOString(),
            claps: 0
        }).then(() => {
            this.setState({post: '', isLoading: false});
            this.props.navigation.navigate('Home');
        }).catch(err => {
            this.setState({error: err + ''});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
        })
    }

    onPressOpenCamera(){
        this.props.navigation.push('CameraView');
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
                    <View style={styles.btnContainer}>
                        <ButtonPrimary onPress={() => this.onPressPost()}>Post</ButtonPrimary>
                    </View>
                    <View style={styles.btnContainer}>
                        <ButtonSecondary onPress={() => this.onPressOpenCamera()}><Icon name={'ios-camera'} color={'#203c4a'} size={20} /> Photo</ButtonSecondary>
                    </View>
                </View>

                <FlashMessage position='top'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        fontSize: 35
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAreaContainer: {
        borderRadius: 10,
        width: '100%',
        borderColor: 'lightgrey',
        borderWidth: 1,
      },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        margin: 5
    },
    btnWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        flex: 1,
        margin: 5
    }
});
