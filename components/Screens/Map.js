import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native'

import MapView, { Polyline } from 'react-native-maps';


const Driving = require('../../assets/Driv.json');

export default class Map extends Component {
    
  constructor(props){
      super(props)
  }
  state={
      GPS:[],
      meanGPS:[],
      medianGPS:[],
      Phone:[],
      meanPhone:[],
      medianPhone:[]
  }
  
  componentDidMount(){
      let GP =[];
      let PH = [];
      for(var key in Driving){
          var gps = {}; 
          var pho = {};
          gps.latitude=Driving[key].gt_lat;
          gps.longitude=Driving[key].gt_long;
          pho.latitude=Driving[key].phone_lat;
          pho.longitude=Driving[key].phone_long;
          GP.push(gps);
          PH.push(pho);
      }
      this.setState({GPS:GP});
      this.setState({Phone:PH});
  }

  loadData = () => {
    console.log("load")
    this.getMeanGPS();
    //this.getMeanPhone();
    this.getMedianGPS();
    //this.getMedianPhone();
    console.log("GPSMean",this.state.meanGPS.length)
    console.log("GPSMedian",this.state.medianGPS.length)
  }

  getMeanGPS = () => {
    console.log("Mean GPS")
    let temp = []; 
    let final = [];
    this.state.GPS.forEach((item) => {
      if (temp.length == 5) {
      var latSum = 0.0
      var longSum = 0.0
        temp.forEach((item) => {
          latSum += parseFloat(item.latitude);
          longSum += parseFloat(item.longitude);
        });
        console.log("GPSmean: ",temp.length)
        final.push({latitude: (latSum/5), longitude: (longSum/5)})
        temp.shift();
        temp.push(item)
        console.log(final)
      }else {
        temp.push(item);
      };
    })
      this.setState({meanGPS: final})
      /*return ( 
        <Polyline
          coordinates={this.state.meanGPS}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#022278'
          ]}
          strokeWidth={2}
        />
      )*/
      console.log(this.state.GPS.length)
  }

  getMedianGPS = () => {
    console.log("median GPS")
  let temp = []; 
  let final = [];
  this.state.GPS.forEach((item) => {
    if (temp.length == 6) {
      let latSum = [];
      let longSum = [];
      temp.forEach((item) => {
        latSum.push(item.latitude);
        longSum.push(item.longitude);
      });
      latSum.sort();
      longSum.sort();
      final.push({latitude: latSum[3],longitude: longSum[3]});
      temp.shift();
      temp.push(item)
    }else {
      temp.push(item);
    };
  });
    this.setState({medianGPS: final})
    /*return ( 
      <Polyline
        coordinates={this.state.medianGPS}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#022278'
        ]}
        strokeWidth={2}
      />
    )*/
  }

  getMeanPhone = () => {
    console.log("Mean Phone")
    let temp = []; 
    let final = [];
    this.state.Phone.forEach((item) => {
      if (temp.length == 5) {
      var latSum = 0.0
      var longSum = 0.0
        temp.forEach((item) => {
          latSum += parseFloat(item.latitude);
          longSum += parseFloat(item.longitude);
        });
        final.push({latitude: (latSum/5), longitude: (longSum/5)})
        temp.shift();
        temp.push(item)
      }else {
        temp.push(item);
      };
    })
      this.setState({meanPhone: final})
      /*return ( 
        <Polyline
          coordinates={this.state.meanPhone}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#022278'
          ]}
          strokeWidth={2}
        />
      )*/
    }
  
    getMedianPhone = () => {
      let temp = []; 
      let final = [];
      this.state.Phone.forEach((item) => {
        if (temp.length == 6) {
          let latSum = [];
          let longSum = [];
          temp.forEach((item) => {
            latSum.push(item.latitude);
            longSum.push(item.longitude);
          });
          latSum.sort();
          longSum.sort();
          final.push({latitude: latSum[3],longitude: longSum[3]});
          temp.shift();
          temp.push(item)
        }else {
          temp.push(item);
        };
      });
        this.setState({medianPhone: final})
        /*return ( 
          <Polyline
            coordinates={this.state.medianPhone}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#022278'
            ]}
            strokeWidth={2}
          />
        )*/
      }
    
  render() {
    console.log(this.state.GPS.length)
    return (
      <View style={styles.container}>
        <View>
        <Button
        onPress={this.loadData}
        title="Load data"
      />
        </View>
        <MapView style={styles.mapStyle}>
          <Polyline
            coordinates={this.state.GPS}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000'
            ]}
            strokeWidth={6}
          />
          <Polyline
            coordinates={this.state.meanGPS}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#022278'
            ]}
            strokeWidth={3}
          />
          <Polyline
            coordinates={this.state.medianGPS}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#09e042'
            ]}
            strokeWidth={1}
          />
        </MapView>
      </View>
    );
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
    height: Dimensions.get('window').height-100,
  },
});
