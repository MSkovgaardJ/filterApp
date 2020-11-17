import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps';
import * as Battery from 'expo-battery';


export default class EnergyMap extends Component {
constructor(props) {
    super(props)

    this.state = {
        batterystate: undefined,
        location:'high',
        frec: 1000,
    }
}

getBattery = async() => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    this.setState({batterystate: batteryLevel})
    if(this.state.batterystate < 0.5)
        {this.setState({location:'low', frec: 10000})}
   console.log("Batterlevell", this.state.batterystate, this.state.location)
  }


    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                userLocationPriority={this.state.location}
                showsUserLocation={true}
                userLocationUpdateInterval={this.state.frec}
                >

                </MapView>
                <TouchableOpacity style={styles.button} onPress={this.getBattery}>
                    <Text style={{color:'white', fontSize:20,}}>Get battery Level</Text>
                </TouchableOpacity>
                <Text style={{bottom:30, backgroundColor:'lightgray'}}>
                    Battery level: {this.state.batterystate}
                </Text>
                <Text style={{bottom:25, backgroundColor:'lightgray'}}>userLocationPriority: {this.state.location}</Text>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    button: {
    backgroundColor:'blue', 
    position:'absolute', 
    height:50, 
    width:150, 
    bottom:50, 
    justifyContent:'center', 
    alignItems:'center'

    }
  });