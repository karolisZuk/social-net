import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator  } from 'react-native'
import Firebase from '../Firebase';
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import { NavigationEvents } from 'react-navigation';
import PostComponent from '../components/PostComponent';
import ClapButton from '../components/ClapButton';
import ClapCounter from '../components/ClapCounter';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default class Home extends Component {
    constructor() {
        super();
        this.db = Firebase.db;
        this.state = {
            posts: [],
            error: '',
            isLoading: false
        }
}

    fetchAllPosts() {
        this.setState({isLoading: true, posts: []});
        this.db.collection('posts').get()
        .then(response => {
            response.forEach(doc => {
                let postRes = {};
                let imageRef = {};
                if(doc.data().withImage) {
                    imageRef = Firebase.storage.ref(`posts/${doc.id}`);
                    imageRef.getDownloadURL().then(url => {
                        postRes = {id: doc.id,data: {...doc.data(), imageUrl: url}};
                        this.setState({posts: [...this.state.posts, postRes]});
                    })
                } else {
                    postRes = {id: doc.id, data: {...doc.data(), imageUrl: ''}};
                    this.setState({posts: [...this.state.posts, postRes]});
                }
            });
            this.setState({isLoading: false});
        }).catch(err => {
            this.setState({error: err + '', isLoading: false});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
        })
    }

    updatePostClaps(postId, claps) {
        let res = this.state.posts.map(post => {
            if (postId === post.id){
                post.data.claps = claps;
                //update backend here with throtling and debounce, then set state
            }
            return post;
        });
        this.setState({posts: res});
    }

    renderHome(){
        if (this.state.isLoading){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '50%'}}>
                    <ActivityIndicator size='large' />
                </View>
            )
        } else {
            return this.state.posts.map(post => {
                return (
                    <View key={post.id}>
                        <PostComponent post={post} />
                        <ClapButton updatePostClaps={(postId, claps) => this.updatePostClaps(postId, claps)} post={post} />
                        <Text>-Claps count-</Text>
                    </View>
            )});
        }
    }

    render() {
        const posts = this.state.posts.map(post => {
        return (
            <View key={post.id}>
                <PostComponent post={post} />
                <ClapButton updatePostClaps={(postId, claps) => this.updatePostClaps(postId, claps)} post={post} />
                <ClapCounter count={post.data.claps} />
            </View>
        )});

        return (
            <ScrollableHeaderWrapper title='News'>
                <NavigationEvents onWillFocus={()=> this.fetchAllPosts()} />
                {this.renderHome()}
                <FlashMessage position='top'/>
            </ScrollableHeaderWrapper>
        )
    }
}