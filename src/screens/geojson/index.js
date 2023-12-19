import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StatusBar,
} from 'react-native'
import styles from './styles'
import MapView, {
    Geojson, Polygon
} from 'react-native-maps'

function GeoJSON() {

    const polygonGeoJSON = {
        id: "d45e4123-485f-444a-8b49-4dbc9353a621",
        geometry: { type: "Polygon", coordinates: [ [ [ -47.494918561353188, -20.555559154675791 ], [ -47.49402372583458, -20.557706164222736 ], [ -47.492737399775621, -20.559800778602479 ], [ -47.489784187326364, -20.560942570326148 ], [ -47.487435244089511, -20.561885130382549 ], [ -47.486764117450406, -20.562984776430326 ], [ -47.48531000973216, -20.56308950421321 ], [ -47.483911829234216, -20.563037140330749 ], [ -47.482122158196461, -20.564608048983558 ], [ -47.48038841437895, -20.566126578655727 ], [ -47.478934306660733, -20.567854542327538 ], [ -47.476417581763172, -20.568011628963362 ], [ -47.474068638526376, -20.571572216050811 ], [ -47.472334894714095, -20.574242601857037 ], [ -47.469818169817444, -20.576179911349413 ], [ -47.468419989318932, -20.578693141074197 ], [ -47.466798099941514, -20.580159172633742 ], [ -47.464784720024369, -20.580473320421063 ], [ -47.463274685086418, -20.582410550818722 ], [ -47.462883194546549, -20.582724693970889 ], [ -47.456619345915158, -20.580002098497431 ], [ -47.451977386661213, -20.579687949739863 ], [ -47.447447281847275, -20.578588423995512 ], [ -47.443867939771707, -20.574137881724738 ], [ -47.442357904833727, -20.569215954463061 ], [ -47.441351214875056, -20.563246595736757 ], [ -47.441015651555546, -20.559109797997621 ], [ -47.442749395373596, -20.557800661452518 ], [ -47.447279500187506, -20.55654387981555 ], [ -47.449908079524164, -20.554030285527475 ], [ -47.453934839358737, -20.550626394021066 ], [ -47.459639415791116, -20.547274796004999 ], [ -47.463554321185654, -20.546855841084806 ], [ -47.468643698199173, -20.546227406552674 ], [ -47.472390821933971, -20.546017927801898 ], [ -47.47546681903026, -20.546175036892436 ], [ -47.477815762267056, -20.546541624141682 ], [ -47.494918561353188, -20.555559154675791 ] ] ] },
        type: "Feature",
        properties: {}
    };

    const geoJsonData = {
        type: 'FeatureCollection',
        features: [
        {
            type: 'Feature',
            geometry: {
            type: 'Point',
            coordinates: [ -47.494918561353188, -20.555559154675791 ],
            },
            properties: {
            name: 'Marker 1',
            },
        },
        {
            type: 'Feature',
            geometry: {
            type: 'Point',
            coordinates: [ -47.464784720024369, -20.580473320421063 ],
            },
            properties: {
            name: 'Marker 2',
            },
        },
        ],
    };
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={'#0ad'} />
            <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -20.555559154675791,
        longitude: -47.494918561353188,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
            >
                <Geojson geojson={geoJsonData} />
                <Polygon
                    coordinates={polygonGeoJSON.geometry.coordinates[0].map(coord => ({ latitude: coord[1], longitude: coord[0] }))}
                    fillColor="rgba(0, 255, 0, 0.5)"
                    strokeColor="rgba(0, 0, 0, 1)"
                    strokeWidth={2}
                />
            </MapView>
            <View style={styles.containerInfo}>
                <Text style={styles.labelInfo}>
                    Geojson with google maps
                </Text>
            </View>
        </View>
    )
}

/*
*/

export default GeoJSON