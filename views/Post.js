import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { ButtonPrimary, ButtonSecondary } from '../components/Buttons';
import Firebase from '../Firebase';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {ImageManipulator} from 'expo';
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

    async componentWillReceiveProps(){
        let image = this.props.navigation.getParam('imageRef');
        await this.setState({image});
    }

    onPressPost() {
        if (!this.state.post && !this.state.image) {
            return;
        }
        this.setState({isLoading: true})
        this.db.collection('posts').add({
            post: this.state.post,
            userId: Firebase.user.uid,
            userEmail: Firebase.user.email,
            postDate: new Date().toISOString(),
            withImage: this.state.image ? true : false, 
            claps: 0
        }).then(postRef => {
            if (this.state.image){
                this.uploadImage(this.state.image, postRef.id);
            } else {
            this.setState({post: '', isLoading: false});
            this.props.navigation.navigate('Home');
            }
        }).catch(err => {
            this.setState({error: err + ''});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
        })
    }

    async uploadImage(image, postId){
        const {uri} = image;
        let storageRef = await Firebase.storage.ref();
        let postsImagesRef = await storageRef.child(`posts/${postId}`);
        const modifiedImage = await ImageManipulator.manipulateAsync(uri, [{resize: {width: 485, height: 960}}], {compress: 0.5, format:'jpeg'});
        const blob = await this._urlToBlob(modifiedImage.uri);
        postsImagesRef.put(blob).then(snapshot => {
            this.setState({post: '', image: {}, isLoading: false});
            this.props.navigation.navigate('Home');
        }).catch(err => {
            console.log(err);
        })
    }

    _urlToBlob(url) { 
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob'; // convert type
            xhr.send();
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
        fontSize: 35
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textAreaContainer: {
        borderRadius: 10,
        width: '100%',
        borderColor: 'lightgrey',
        borderWidth: 1,
      },
    textArea: {
        height: '70%',
        margin: 5
    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnContainer: {
        flex: 1,
        margin: 5
    }
});
