import React from "react";
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {Camera, Permissions} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CameraView extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back, 
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermission: status === 'granted'})
    }

    goBack() {
        this.props.navigation.navigate('Post')
    }

    flipCamera() {
        this.setState({
            type: this.state.type === CameraView.Constants.Type.back 
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        })
    }
    async snap(){
        setTimeout(() =>{
            this.setState({takingPicture : true})
        },1 )
        let pic = await this.camera.takePictureAsync( {skipProcessing : true, quality: 0})
        await this.setState({takingPicture: false})
        await this.props.navigation.navigate('Post', {imageRef: pic})
    }

    renderBottomBar(){
        return(
            <View styles={style.BottomView}>
                <TouchableOpacity onPress={() => this.goBack()} styles={style.secondaryButton}>
                    <Icon style={styles.btnIcon} name='ios-arrow-back' size={35} color='white'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.snap()}>
                    <Icon  name='ios-radio-nutton-on' size={70} color='white'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.flipCamera()} styles={style.secondaryButton}>
                    <Icon style={styles.btnIcon} name='ios-reserve-camera' size={35} color='white'/>
                </TouchableOpacity>
            </View>

        )
    }

    render(){
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <Text > Something went wrong</Text>
        }else if (hasCameraPermission  === false ) {
            return <Text > No access to camera </Text>
        }else {
            return (
            <View style={{flex: 1}}>
                <Camera style={{flex: 1}} type={this.state.type} ref={ref => {this.camera = ref}}>
                    {this.renderBottomBar()}
                </Camera>
            </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    BottomView : {
        flexDirection : 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    secondaryButton:{
        fontsize: 28,
        borderColor: 'white',
        color: 'white',
        borderWidth: 2,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center'
    },
    btnIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})