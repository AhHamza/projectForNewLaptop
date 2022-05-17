import { TouchableOpacity,StyleSheet, Text, View, Image, Button, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'

import Logo from '../assets/2511582.jpg'
import {deleteFStadium, getFStadium} from "../db/Stadium/Football";
import {getUserUId} from "../db/Auth";
import {addUsersToDocuments, updateFootball, test, getUsers, addUser, updateUsers} from "../db/User";
import {getBStadium} from "../db/Stadium/Basketball";
import {getTStadium} from "../db/Stadium/Tennis";

export default function Payment({navigation,route}) {
  let currentUserId;
  const [name, setName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [date, setDate] = useState("");
  const [Fstadium, setFStadium] = useState([]);
  const [Bstadium, setBStadium] = useState([]);
  const [Tstadium, setTStadium] = useState([]);
  // const [currentUserBalance,setCurrentUserBalance] = useState();
  let currentFStadPrice;
  let currentBStadPrice;
  let currentTStadPrice;
  let {stadName} = route.params;


  // set currentUserId with userId
  useEffect(()=>{
    getUserUId().then((userId)=>{
      currentUserId = userId;
    })
  },[]);

  useEffect(() => {
    getFStadium().then((data) => {
      setFStadium(data);
    })
  },[]);


  useEffect(() => {
    getBStadium().then((data) => {
      setBStadium(data);
    })
  },[]);


  useEffect(() => {
    getTStadium().then((data) => {
      setTStadium(data);
    })
  },[]);

  const Handler = () => {
              /*Handle Football*/
    console.log("here in paymethod")
    //get currentFStadPrice
    getFStadium().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === stadName) {
          console.log("Fstad name in db is " +data[i].name )
          console.log("Fstad price in db is " +data[i].price )
          currentFStadPrice = data[i].price
          console.log("Fstad price locally is " +currentFStadPrice )
        }
      }
    })

    getBStadium().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === stadName) {
          console.log("Bstad name in db is " +data[i].name )
          console.log("Bstad price in db is " +data[i].price )
          currentBStadPrice = data[i].price
          console.log("Bstad price locally is " +currentFStadPrice )
        }
      }
    })

    getTStadium().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === stadName) {
          console.log("Tstad name in db is " +data[i].name )
          console.log("Tstad price in db is " +data[i].price )
          currentTStadPrice = data[i].price
          console.log("Tstad price locally is " +currentFStadPrice )
        }
      }
    })

    //update current user balance
    getUsers().then((users) => {
      getUserUId().then((userId) => {
        console.log("inside getUsers()")
        console.log(users)
        for (let i = 0; i < users.length; i++) {
          console.log("should be printed" + users.length + " times")
          if (userId == users[i].id) {
            console.log("userId == users[i].id is true")
            for (let i = 0; i < Fstadium.length; i++) {
              if (Fstadium[i].name !== undefined) {   //to remove error "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'name')"
                if (stadName === Fstadium[i].name) {
                  if (currentFStadPrice > users[i].balance) {
                    alert("you dont have enough money") // ASK doc -> not working
                    Fstadium[i].state.pop();
                    updateFootball(Fstadium[i]);
                    navigation.goBack(); // there is a problem with navigation
                    break;
                  } else {
                    console.log(currentFStadPrice)
                    users[i].balance = users[i].balance - currentFStadPrice;
                    updateUsers(users[i]).then(() => alert("user's balance has been updated"));
                  }
                }
            }
              else if(stadName === Bstadium[i].name){
                if (currentBStadPrice > users[i].balance) {
                  alert("you dont have enough money")
                  Bstadium[i].state.pop();
                  updateFootball(Bstadium[i]); // there is a problem with navigation
                  navigation.goBack();
                  break;
                } else {
                  console.log(currentBStadPrice)
                  users[i].balance = users[i].balance - currentBStadPrice;
                  updateUsers(users[i]).then(() => alert("user's balance has been updated"));
                }
              }
              else if(stadName === Tstadium[i].name){
                if (currentTStadPrice > users[i].balance) {
                  alert("you dont have enough money")
                  Tstadium[i].state.pop();
                  updateFootball(Tstadium[i]); // there is a problem with navigation
                  navigation.goBack();
                  break;
                } else {
                  console.log(currentTStadPrice)
                  users[i].balance = users[i].balance - currentTStadPrice;
                  updateUsers(users[i]).then(() => alert("user's balance has been updated"));
                }
              }
            }
          }
        }
      })
    })

    if (name != '' && cardnumber.toString() != '' && cvv.toString() != '' && date.toString() != '') {
      console.log("data is valid and size of Fstadium.length=", Fstadium.length, ' and currentUserId', currentUserId);
    }
    else {
      alert("please fill the information of yout card")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.format}>
        <TextInput
          style={styles.input}
          placeholder="Card Name"
          onChangeText={setName}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          onChangeText={setDate}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          onChangeText={setCVV}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.buttonstyle} onPress={Handler}>
          <Text style={styles.buttontext}>Pay</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    textAlign: 'center',
    paddingHorizontal: 50

  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    paddingTop: 100,
    paddingBottom: 50
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  input: {
    height:40,
    color:'rgb(255, 255, 255)',
    borderBottomColor: "#cae9ff" ,
    borderBottomWidth: 4,
  },
  buttonstyle: {
    backgroundColor: '#022b3a',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttontext: {
    color: 'rgb(255, 255, 255)',
    fontWeight: '700',
    fontSize: 16,
  },
  format: {
    paddingBottom: 20
  }
})