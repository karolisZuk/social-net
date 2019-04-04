import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Firebase from '../Firebase';
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import { NavigationEvents } from 'react-navigation';
import PostComponent from '../components/PostComponent';
import ClapButton from '../components/ClapButton';
import ClapCounter from '../components/ClapCounter';

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
        this.setState({isLoading: true});
        let postsResult = [];
        this.db.collection('posts').get()
        .then(response => {
            response.forEach(doc => {
            postsResult.push({id: doc.id, data: doc.data()})
            })
            this.setState({posts: postsResult, isLoading: false});
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
                {posts}
            </ScrollableHeaderWrapper>
        )
    }
}