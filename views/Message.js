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
        conversations: [],
        isLoading: false
        }
    }

    componentWillMount() {
        if (!Firebase.fb) {
            Firebase.init();
        }
        this.getAllConversations();
    }

    _renderScrollViewContent() {
        const data = Array.from({length: 30});
        return (
            <View>
                {data.map((_, i) =>
                <View key={i} style={styles.row}>
                    <Text>{i}</Text>
                </View>
                )}
            </View>
        );
    }

    onPressSendMessage() {
        if (!this.state.recipient || !this.state.message){
            return;
        }
        this.setState({isLoading: true});
        this.db.collection('conversations').add({
            participants: [Firebase.user.email, this.state.recipient],
            messages: [
                {
                    date: new Date().toISOString(),
                    author: Firebase.user.email,
                    body: this.state.message
                }
            ]
        }).then(postRef => {
            this.setState({recipient: '', message: '', isLoading: false});
        }).catch(err => {
            this.setState({error: err + '', isLoading: false});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
        })
    }

    async getAllConversations(){
        this.setState({isLoading: true, conversations: []});
        let conversations = await this.db.collection('conversations')
            .where('participants', 'array-contains', Firebase.user.email)
            .get()
        conversations.forEach(doc => {
            console.log(doc.data())
        });
    }

    render() {
        return (
        <ScrollableHeaderWrapper 
            title='Chat'
            headerChildComponent={
                <ChatHeaderToggles 
                    recipient={this.state.recipient}
                    message={this.state.message}
                    onPress={()=>this.onPressSendMessage()}
                    onChangeText={value => this.setState(value)} />
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
