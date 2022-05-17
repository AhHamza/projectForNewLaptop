import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/OIP.jpg'
import {Linking} from "react-native-web";

export default function item({ e , navigation} , key ) {
    function handle(){                          // name of stadium
            navigation.navigate('ValidationPage', {name: e.name})
        console.log("stad name is: ",e.name)

    }

    function location(){
        Linking.openURL(e.link)
                        .then()
                        .catch((err) => console.error('An error occurred', err))
    }

    return (
        <View key={key} style={styles.container}>
            <View style={styles.component}>
                <Image source={{uri : e.pic}} style={styles.image} />
            </View>
            <View style={styles.details}>
                <Text style={styles.text}> Name : {e.name} </Text>
                <Text style={styles.text}> Price : {e.price} </Text>
            </View>
            <View style={styles.buttonstyle}>
                <TouchableOpacity style={styles.button} onPress={handle}>
                    <Text style={styles.text}> Book </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={location}>
                    <Text style={styles.text}> Location </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
      },
      component: {
        paddingBottom: 10,
      },
      button: {
        backgroundColor: 'green',
        width: '40%',
        height: 40,
        padding: 5
      },
      buttonstyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
      },
      text: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
      },
      details: {
        backgroundColor: 'green',
        width: '100%',
        height: 80,
      },
      image: {
        borderRadius: 10,
        maxWidth: '100%',
        height: 100,
      },
})

