import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SigninScreen = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onPress = (e) => {
    e.preventDefault();
    console.log("click");

    const user = {
      username: username,
      password: password,
    };
    setLoading(true);
    axios
      .post("https://optum-backend-deploy.herokuapp.com/users/login", user)
      .then((res) => {
        // alert("login successful");
        // console.log(res.data.user.user_type)
        var User_Type = res.data.user.user_type;

        setLoading(false);

        if(User_Type === "doctor"){
          navigation.navigate('ProfileDoctor', { 
            user : res.data
           })
        }else if(User_Type == "patient"){
          navigation.navigate('ProfilePatient')
        }
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head_text}>Doctors App</Text>

      <Text style={styles.text}>Sign In to your Account</Text>

      <TextInput
        placeholder="Username"
        style={styles.input1}
        value={username}
        onChangeText={(text) => setusername(text)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.input2}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable onPress={onPress} style={styles.button}>
        {loading ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <Text style={styles.buttonText}>SIGN IN</Text>
        )}
      </Pressable>

      <TouchableOpacity
        style={styles.signupbutton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupbuttonText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  head_text: {
    marginTop: "30%",
    fontSize: 30,
    marginBottom: 20,
    color: "#172578",
    fontWeight: "bold",
  },
  container: {
    // position: 'relative',
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
    top: 79.59,
  },
  text: {
    width: "100%",
    textAlign: "center",

    // fontFamily: 'Rubik',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.1,
    color: "#172578",
    marginBottom: 18,
  },
  input1: {
    marginTop: 40,
    marginBottom: 16,
    width: 264,
    height: 48,

    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
  },
  input2: {
    width: 264,
    height: 48,

    borderRadius: 39,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8B91AB",
    padding: 10,
    marginBottom: 16,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: 264,
    height: 48,

    borderRadius: 36,
    backgroundColor: "#172578",
  },
  buttonText: {
    color: "#F7F9FF",
  },
  text2: {
    // position: 'absolute',
    width: 220,
    height: 19,

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
  signupbutton: {
    backgroundColor: "#fff",
    marginTop: 20,
    width: 220,
  },
  signupbuttonText: {
    color: "#172578",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: 0.1,
  },
});

export default SigninScreen;
