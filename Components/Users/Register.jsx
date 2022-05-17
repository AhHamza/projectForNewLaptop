import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { React, useState } from "react";
import { register,getUserUId,login } from "../../db/Auth";
import Logo from '../../assets/2511582.jpg'
import {addUser} from "../../db/User";


const Register = ({ navigation }) => {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const role = 0
  const [error, setError] = useState("");

  const handleRegister = () => {
    console.log(displayName, email, password);
    register(email, password)
      .then(()=>{
        login(email, password).then(
            () => {
              console.log('login completed');
              getUserUId().then((id) => addUser({ id, email, password,role}));
            }
        )
      })
      .catch((e) => setError(e.message));
  }

  return (
    <KeyboardAvoidingView style={styles.mainview} >
      <View style={styles.screen}>
        <Image source={Logo} style={styles.image} />
      </View>

      <Text style={styles.text}>Let’s get started!</Text>

      <View style={styles.format}>
        <TextInput
          style={styles.textinput}
          onChangeText={setdisplayName}
          keyboardType="default"
          placeholder="User Name"
        />
        <TextInput
          style={styles.textinput}
          placeholder="example@email.com"
          onChangeText={setEmail}
          keyboardType="email-address"

        />

        <TextInput
          style={styles.textinput}
          onChangeText={setpassword}
          secureTextEntry={true}
          placeholder="password"
        />

      </View>
      <View >
        <TouchableOpacity style={styles.buttonstyle} onPress={handleRegister}>
          <Text style={styles.buttontext}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.errorText}>{error}</Text>

      <Text>Already have an account?</Text>

      <View >
        <TouchableOpacity style={styles.buttonstyle} onPress={() => { navigation.navigate('SignIn') }}>
          <Text style={styles.buttontext}>sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>


  );
};

export default Register;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#90EE90",
    paddingHorizontal: 60,
    alignSelf: "stretch",

  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 20
  },
  textinput: {
    height: 40,
    color: 'rgb(255, 255, 255)',
    borderBottomColor: "#cae9ff",
    borderBottomWidth: 4,

  },
  format: {
    paddingBottom: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
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
  errorText: {
    color: 'rgb(255, 255, 255)'
  },


});