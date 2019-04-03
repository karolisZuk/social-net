import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CameraView extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    flipCamera(){
        this.setState({
            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front:
                                                Camera.Constants.Type.back
        });
    }

    goBack(){
        this.props.navigation.goBack();
    }

    snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          console.log(photo);
        }
    };

    renderBottomBar() {
        return (
            <View style={ styles.bottomView} >
                <TouchableOpacity onPress={() => this.goBack()} style={styles.secondaryButtons}>
                    <Icon style={styles.btnIcon} name="ios-arrow-back" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.snap}>
                    <Icon name="ios-radio-button-on" size={70} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButtons} onPress={() => this.flipCamera()}>
                    <Icon style={styles.btnIcon} name="ios-reverse-camera" size={35} color="white" />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
                        <View style={{flex: 1, backgroundColor: 'transparent'}}>
                            {this.renderBottomBar()} 
                        </View>
                    </Camera>
            </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    bottomView:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    btnIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryButtons: {
        fontSize: 18,
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
    }
});