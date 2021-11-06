import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Pressable,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'Doctor', value: 'doctor' },
    {label: 'Patient', value: 'patient' }
];

const SignupScreen = ({ navigation }) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [usertype, setusertype] = useState('patient');
  const [loading,setLoading]=useState(false);

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "User successfully registered",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const onPress = (e) => {
    e.preventDefault();
  
    setLoading(true);

    const user = {
      username: username,
      user_type: usertype,
      firstName: firstname,
      lastName: lastname,
      password: password,
    };

    axios
      .post("https://optum-backend-deploy.herokuapp.com/users/signup", user)
      .then((res) => {
        navigation.navigate('Signin')
        setLoading(false);
        showToastWithGravity();
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head_text}>Doctors App</Text>

      <Text style={styles.text}>Create Your Account</Text>

      <TextInput
        placeholder="FirstName"
        style={styles.input1}
        value={firstname}
        onChangeText={(text) => setfirstname(text)}
      />

      <TextInput
        placeholder="LastName"
        style={styles.input2}
        value={lastname}
        onChangeText={(text) => setlastname(text)}
      />

      <TextInput
        placeholder="Username"
        style={styles.input3}
        value={username}
        onChangeText={(text) => setusername(text)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.input4}
        value={password}
        onChangeText={(text) => setpassword(text)}
      />

      {/* <TextInput
        placeholder="UserType"
        style={styles.input5}
        value={usertype}
        onChangeText={(text) => setusertype(text)}
      /> */}
       <Text style={styles.textew}>Select user type :</Text>
       <RadioForm
          radio_props={radio_props}
          initial={'patient'}
          onPress={(value) => {setusertype(value)}}
       />

      <Pressable onPress={onPress} style={styles.button}>
          {
              (loading)?(
                <Text style={styles.buttonText}>Loading...</Text>
              ):(
                <Text style={styles.buttonText}>SIGN UP</Text>
              )
          }
       
      </Pressable>


      <TouchableOpacity
        style={styles.signinbutton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.signinbuttonText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    textew:{
        color: "#172578",
        textAlign:'left',
        width: 264,
        marginTop:10,
        fontWeight:'bold',
        marginBottom:10
    },
  head_text: {
    marginTop: "20%",
    fontSize: 30,
    marginBottom: 20,
    color: "#172578",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 91,
    height: 18.8,
    left: 142,
    top: 50.59,
  },
  text: {
    width: 183,
    height: 19,
    marginBottom:20,
    // fontFamily: 'Rubik',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.1,
    color: "#172578",
  },
  input1: {
    width: 264,
    height: 48,
    marginTop:10,
    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  input2: {
    width: 264,
    height: 48,
    marginTop:10,
    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  input3: {
    width: 264,
    height: 48,
    marginTop:10,

    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  input4: {
    width: 264,
    height: 48,
    marginTop:10,

    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  input5: {
    width: 264,
    height: 48,
    marginTop:10,

    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 264,
    marginTop:20,
    height: 48,
    borderRadius: 36,
    backgroundColor: "#172578",
  },
  buttonText: {
    color: "#F7F9FF",
  },
  text2: {
    width: 220,
    height: 19,
    marginTop:10,

    // fontFamily: 'Rubik',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 19,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.1,
    color: "#172578",
  },
  signinbutton: {
    backgroundColor: "#fff",
    width: '100%',
    textAlign:'center',
    marginTop:10,
  },
  signinbuttonText: {
      textAlign:'center',
    color: "#172578",
    fontWeight: "normal",
    fontSize: 14,
    width:'100%'
  },
});

export default SignupScreen;
