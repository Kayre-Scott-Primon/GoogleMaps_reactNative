import React, {useEffect} from "react";
import styles from './style'
import {
    View,
    Text,
    Platform,
    StatusBar,
    ScrollView,
    BackHandler,
    TouchableOpacity,
} from 'react-native'
import { PermissionFineLocation, PermissionLocation, checkGPSstatus } from "../../location";
function Home({navigation}){

    const requestLocationPermission = async () => {
        await PermissionLocation()
        await PermissionFineLocation(13)
        await checkGPSstatus()
    }

    useEffect(() => {
        requestLocationPermission()
    },[])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            backButtonClick()
            return true
        }) 
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", () => {});
    },[])

    function backButtonClick() {
        BackHandler.exitApp()
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={'#0ad'}/>
            <ScrollView>
                <Text style={styles.textInfo}>App for to make a tests the react native with google maps</Text>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('BaseMap')}}>
                        <Text style={styles.buttonTextTrack}>Show base map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('UserLocation')}}>
                        <Text style={styles.buttonTextTrack}>User Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Layers')}}>
                        <Text style={styles.buttonTextTrack}>Layers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Image')}}>
                        <Text style={styles.buttonTextTrack}>Show image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('GeoJSON')}}>
                        <Text style={styles.buttonTextTrack}>GeoJSON</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    ) 
}

export  default Home