import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Image,Button
} from "react-native";
import React, {useEffect, useState} from "react";
import {addFStadium, deleteFStadium, getFStadium} from "../db/Stadium/Football";
import footballBackground from "../assets/footballBackground.png";
import tennisBackground from "../assets/tennisBackground.png";
import basketballBackground from "../assets/basketballBackground.png";
import {getUserUId} from "../db/Auth";
import {updateBasketball, updateFootball, updateTennis} from "../db/User";
import {getBStadium} from "../db/Stadium/Basketball";
import {getTStadium} from "../db/Stadium/Tennis";


export default function ValidationPage ({navigation, route}) {

    let {name: stadName} = route.params; //name -> att. in doc.

    const [stDate,setStDate] = useState("") //start date
    const [edDate,setEdDate] = useState("")//end date
    const [day,setDay] =  useState("")

    function handel(){

        /*Handle football*/
        useEffect(() => {
            console.log('begin handle', stadName);
            console.log('after validate');
            getFStadium().then((data) => {
                if(stDate!=='' && edDate !== '' && day !== '' && stDate!==edDate){
                    console.log('number of Fstad = ', data.length);
                    for(let i=0; i<data.length; i++ ){
                        if(data[i].name === stadName){
                            console.log('found the stad', data[i]);
                            let flag = true; // true ->stad is available
                            if(data[i].state === null){ //if there is no array, set a new one
                                data[i].state = []; //new array
                            }
                            /* add "balance" in db and manage it here*/
                            for(let j=0; j<data[i].state.length; j++ ){
                                if(data[i].state[j].day === day ){ //same day isn't enough
                                    if((stDate<data[i].state[j].edDate &&stDate>= data[i].state[j].stDate) || //check in same hours interval
                                        ( data[i].state[j].stDate>=stDate  && data[i].state[j].stDate<edDate)){
                                        alert("already occupied");
                                        flag = false; //stad is unavailable after occupation
                                        navigation.navigate('Football');
                                    }
                                }
                            }
                            if(flag){ //if flag is available i.e. "true", add userId with the "date" that he
                                getUserUId().then((id)=>{ // gets id of current user in "id"
                                    data[i].state.push({day, stDate, edDate, id}); //note that we made "id" same as "document ID" manually
                                    updateFootball(data[i]);
                                });
                                navigation.navigate('Payment', {stadName});
                            }
                            break;
                        }
                    }
                }
                else {
                    alert("data is required")
                }
            })
        },[]);

        /*Handle basketball*/
        useEffect(() => {
            getBStadium().then((data) => {
                if (stDate !== '' && edDate !== '' && day !== '' && stDate !== edDate) {
                    console.log('number of Bstad = ', data.length);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === stadName) {  /* This identifies the stadium type !!!!!!!! */
                            console.log('found the stad', stadName);
                            let flag = true; // true ->stad is available
                            if (data[i].state === null) { //if there is no array, set a new one
                                data[i].state = []; //new array
                            }
                            for (let j = 0; j < data[i].state.length; j++) {
                                if (data[i].state[j].day === day) { //same day isn't enough
                                    if ((stDate < data[i].state[j].edDate && stDate >= data[i].state[j].stDate) || //check in same hours interval
                                        (data[i].state[j].stDate >= stDate && data[i].state[j].stDate < edDate)) {
                                        alert("already occupied");
                                        flag = false; //stad is unavailable after occupation
                                        navigation.navigate('Basketball');
                                    }
                                }
                            }
                            if (flag) { //if flag is available i.e. "true", add userId with the "date" that he
                                getUserUId().then((id) => { // gets id of current user in "id"
                                    data[i].state.push({day, stDate, edDate, id}); //note that we made "id" same as "document ID" manually
                                    updateBasketball(data[i]);
                                });
                                navigation.navigate('Payment', {stadName});
                            }
                            break;
                        }
                    }
                }
                else {
                    alert("data is required")
                }
            });
        },[]);

        /*Handle tennis*/
        useEffect(() => {
            getTStadium().then((data) => {
                if (stDate !== '' && edDate !== '' && day !== '' && stDate !== edDate) {
                    console.log('number of Tstad = ', data.length);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === stadName) {  /* This identifies the stadium type !!!!!!!! */
                            console.log('found the stad', stadName);
                            let flag = true; // true ->stad is available
                            if (data[i].state === null) { //if there is no array, set a new one
                                data[i].state = []; //new array
                            }
                            for (let j = 0; j < data[i].state.length; j++) {
                                if (data[i].state[j].day === day) { //same day isn't enough
                                    if ((stDate < data[i].state[j].edDate && stDate >= data[i].state[j].stDate) || //check in same hours interval
                                        (data[i].state[j].stDate >= stDate && data[i].state[j].stDate < edDate)) {
                                        alert("already occupied");
                                        console.log("tennis is already occupied")
                                        flag = false; //stad is unavailable after occupation
                                        navigation.navigate('Tennis'); // Ask doc : when navigating it goes 1st to Football.jsx then BasketBall.jsx then Tennis.jsx when it should have directly moved to Tennis
                                    }
                                }
                            }
                            if (flag) { //if flag is available i.e. "true", add userId with the "date" that he
                                getUserUId().then((id) => { // gets id of current user in "id"
                                    data[i].state.push({day, stDate, edDate, id}); //note that we made "id" same as "document ID" manually
                                    updateTennis(data[i]); //!NOTE! we want to updateTennis when we press "pay"-> in "Payment.jsx" no here
                                });
                                navigation.navigate('Payment', {stadName});
                            }
                            break;
                        }
                    }
                }
                else {
                    alert("data is required")
                }
            });
        },[]);


    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}> Enter Your Booking Club </Text>
            <ScrollView>
                <TextInput placeholder="Enter day" onChangeText={setDay}/>
                <TextInput placeholder="Enter start date" onChangeText={setStDate}/>
                <TextInput placeholder="Enter end date" onChangeText={setEdDate}/>
                <Button title={"submit"} onPress={handel}/>

            </ScrollView>

        </View>

    );
}
    const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        alignContent:"center"
    }
    })