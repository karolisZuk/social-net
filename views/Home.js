import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import Firebase from '../Firebase';
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import { NavigationEvents } from 'react-navigation';
import PostComponent from '../components/PostComponent';
import ClapButton from '../components/ClapButton';
import ClapCounter from '../components/ClapCounter';
import HeaderToggles from '../components/HeaderToggles';
import Debounce from '../utils/Debounce';

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

    async fetchAllPosts() {
        this.setState({isLoading: true, posts: []});
        let posts = await this.db.collection('posts').get()
        posts.forEach(doc => {
            let postRes = {};
            if(doc.data().withImage) {
                Firebase.storage.ref(`posts/${doc.id}`).getDownloadURL().then(url => {
                    postRes = {id: doc.id,data: {...doc.data(), imageUrl: url}};
                    this.setState({posts: [...this.state.posts, postRes]});
                    this.state.isFilteringByClaps ? this.sortOnClapsAndUpdateState() : this.sortOnDateAndUpdateState();
                })
            } else {
                postRes = {id: doc.id, data: {...doc.data(), imageUrl: ''}};
                this.setState({posts: [...this.state.posts, postRes]});
                this.state.isFilteringByClaps ? this.sortOnClapsAndUpdateState() : this.sortOnDateAndUpdateState();            }
        });
            this.setState({isLoading: false});
    }

    updatePostClaps(postId, claps) {
        let res = this.state.posts.map(post => {
            if (postId === post.id){
                post.data.claps += claps;
                Debounce(this.sendUpdatedClapsToFirebase(postId, post.data.claps), 1000);
            }
            return post;
        });
        this.setState({posts: res});
    }

    sendUpdatedClapsToFirebase (postId, claps) {
        let postRef = this.db.collection(`posts`).doc(postId);
        postRef.get().then(postData => {
            if (postData.exists){
                postRef.update({lastUpdate: new Date().toISOString(), claps});
                this.state.isFilteringByClaps ? this.sortOnClapsAndUpdateState() : this.sortOnDateAndUpdateState();
            }
        })
    }

    sortOnClapsAndUpdateState (posts = this.state.posts) {
        let sorted = posts.sort((a, b) => b.data.claps - a.data.claps);
        this.setState({posts: sorted});
    }

    sortOnDateAndUpdateState (posts = this.state.posts) {
        let sorted = posts.sort((a, b) => (a.data.postDate > b.data.postDate) ? -1 : ((a.data.postDate < b.data.postDate) ? 1 : 0));
        this.setState({posts: sorted});
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
                        <ClapCounter count={post.data.claps} />
                    </View>
                )});
        }
    }

    toggleFilter() {
        if (!this.state.isFilteringByClaps) {
            this.sortOnClapsAndUpdateState();
        } else {
            this.sortOnDateAndUpdateState();
        }
        this.setState({isFilteringByClaps: !this.state.isFilteringByClaps});
    }

    render() {
        return (
            <ScrollableHeaderWrapper title='News'
                headerChildComponent={
                    <HeaderToggles 
                        onPress={() => this.toggleFilter()} 
                        value={ this.state.isFilteringByClaps } />
                } >
                <NavigationEvents onWillFocus={() => this.fetchAllPosts()} />
                {this.renderHome()}
            </ScrollableHeaderWrapper>
        )
    }
}