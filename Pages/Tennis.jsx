import { TouchableOpacity, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { React, useState, useEffect } from "react";
import Item from '../Components/Item'
import { getTStadium } from '../db/Stadium/Tennis'

export default function Football({ navigation }) {
  const [stadium, setStadium] = useState([]);
  useEffect(() => {
    getTStadium().then((data) => {
      setStadium(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Pick your stadium </Text>
      <ScrollView contentContainerStyle={styles.tasks}>
        {stadium.map((item, index) => {
          return (<Item e={item} key={index} navigation={navigation}/>); // e is an object that contains name of stad
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10
  },
});

