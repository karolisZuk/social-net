import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Firebase from '../Firebase';
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import { NavigationEvents } from 'react-navigation';
import PostComponent from '../components/PostComponent';
import ClapButton from '../components/ClapButton';

export default class Home extends Component {
  constructor() {
    super();
    this.db = Firebase.db;
    this.state = {
        posts: []
    }
}

  fetchAllPosts() {
    let postsResult = [];
    this.db.collection('posts').get()
      .then(response => {
        response.forEach(doc => {
          postsResult.push({id: doc.id, data: doc.data()})
        })
        this.setState({posts: postsResult});
      })
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <View key={post.id}>
          <PostComponent post={post} />
          <ClapButton />
        </View>
      )
    });

    return (
      <ScrollableHeaderWrapper title='News'>
        <NavigationEvents
        onWillFocus={() => this.fetchAllPosts()}
      />
        {posts}
    </ScrollableHeaderWrapper>
    )
  }
}