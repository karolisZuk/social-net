import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper'
import ChatHeaderToggles from '../components/ScrollableHeaderToggles/ChatHeaderToggles';

export default class Settings extends Component {
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
    
    render() {
        return (
        <ScrollableHeaderWrapper title='Chat' headerChildComponent={<ChatHeaderToggles />} >
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
  