import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Card from './Card/Card';
import CardSection from './Card/CardSection';

const PostComponent = (props) => {
    const { data } = props.post;
    const { headerContent, headerText } = styles;

    return (
        <Card>
            <CardSection>
                <Text>{ data.postDate } </Text>
            </CardSection>
            { 
                data.imageUrl 
                ? (<CardSection><Image key={data.id} style={styles.imageStyle} source={{ uri: data.imageUrl }} /></CardSection>)
                : (<View></View>)
            }
            <CardSection>
                <View style={headerContent}>
                    <Text style={headerText}>{ data.post }</Text>
                </View>
            </CardSection>
            <CardSection>
                <Text>{ data.userEmail }</Text>
            </CardSection>
        </Card>
        );
};

const styles = StyleSheet.create({
    headerContent: {
        minHeight: 60
    },
    headerText: {
        fontSize: 20,
        margin: 5
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    //interesting! sets image to full width
    imageStyle: {
        borderRadius: 5,
        height: 300,
        flex: 1,
        width: null
    }
});

export default PostComponent;