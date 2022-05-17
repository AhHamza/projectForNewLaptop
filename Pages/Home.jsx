import { ScrollView, TouchableOpacity ,StyleSheet, Text,TextInput, View, Image, Button } from 'react-native'
import React from 'react'
import { useEffect } from "react";

import footballBackground from '../assets/footballBackground.png'
import tennisBackground from '../assets/tennisBackground.png'
import basketballBackground from '../assets/basketballBackground.png'





export default function Home({ navigation, route }) {


  return (
    <View style={styles.container}>


      <Text style={styles.header}> Enter Your Booking Club </Text>
      <ScrollView>
        <View style={styles.cardsContainer}>
          <View>
            <Text style={styles.cardTitle}>Football</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Football') }}>
              <Image source={footballBackground} style={styles.ImageStyle} />
            </TouchableOpacity>
          </View>

          <View source={basketballBackground} style={styles.basketballStyle}>
            <Text style={styles.cardTitle}>Basketball</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Basketball') }}>
              <Image source={basketballBackground} style={styles.ImageStyle} />
            </TouchableOpacity>
          </View>

          <View style={styles.tennisStyle}>
            <Text style={styles.cardTitle}>Tennis</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Tennis') }}>
              <Image source={tennisBackground} style={styles.ImageStyle} />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    </View>

  );


}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: "#e7e9ea",
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    color: 'rgb(255, 255, 255)'

  },
  cardsContainer: {
    justifyContent: 'space-between',
    padding: 20
  },

  ImageStyle: {
    width: 300,
    height: 200,
    borderRadius: 16
  },
  cardTitle: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)'

  }

})