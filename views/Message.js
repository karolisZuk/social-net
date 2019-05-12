import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper'
import ChatHeaderToggles from '../components/ScrollableHeaderToggles/ChatHeaderToggles';
import Firebase from '../Firebase';

export default class Message extends Component {
  constructor(props){
    super(props)

    this.db = Firebase.db;

    this.state = {
      recipient: '',
      message: '',
      isLoading: false,
      conversations: []
    }
  }

  componentWillMount(){
    if(!Firebase.fb){
      Firebase.init();
    }
    this.getAllConversations();
  }

    _renderScrollViewContent() {
        return (
            <View>
                {this.state.conversations.map(conversation =>
                        <View key={conversation.messages[0].date} style={styles.row}>
                            <Text>{conversation.messages[0].author}:</Text>
                            <Text> {conversation.messages[0].body}</Text>
                        </View>
                )}
            </View>
        );
      }
    
      onPressSend(){
        if (!this.state.recipient || !this.state.message){
          return;
        }
        this.setState({isLoading: true});
        this.db.collection('conversations').add({
          participants: [ Firebase.user.email, this.state.recipient],
          messages: [
            {
              date: new Date().toISOString(),
              author: Firebase.user.email,
              body: this.state.message
            }
          ]
        }).then(msgRef => {
          this.setState({recipient:'', message: '', isLoading: false})
          this.getAllConversations();
        }).catch(err => {
          this.setState({error: err+'', isLoading: false});
          console.log(err);
        })
      }

    async getAllConversations(){
        let result = [];
        this.setState({isLoading: true, conversations: []});
        let conversationsRef = await this.db.collection('conversations');
        let conversations  = await conversationsRef.where('participants', 'array-contains', Firebase.user.email).get();
        conversations.forEach(doc => {
            result.push(doc.data());
        })
        this.setState({conversations: result, isLoading: false});
    }
    
    render() {
        return (
        <ScrollableHeaderWrapper
          title='Chat'
          headerChildComponent={
            <ChatHeaderToggles
              recipient={this.state.recipient}
              message={this.state.message}
              onChangeText={value => this.setState(value)}
              onPress={()=>this.onPressSend()}

              />
            } >
            {this._renderScrollViewContent()}
        </ScrollableHeaderWrapper>
        )
    }
}

const styles = StyleSheet.create({
    row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  