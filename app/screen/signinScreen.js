import axios from 'axios';
import React,{ useState } from 'react';
import { Button, Image, TouchableOpacity ,Pressable, StyleSheet,Text, TextInput, View } from 'react-native';

const SigninScreen = ({navigation}) => {
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");

    const onPress = (e) =>{
        e.preventDefault();
        console.log("click");

        const user={
            username:username,
            password:password,
        };

        axios.post("https://optum-backend-deploy.herokuapp.com/users/login",user).then((res)=>{
            alert("login successful");
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <View style={styles.container} >
            <Image
                style={styles.logo} 
                source={require('../assets/logo.png')}
            />

            <Text
                style={styles.text}
            >
                Sign In to your Account
            </Text>

            <TextInput 
                placeholder="Username"
                style = {styles.input1}
                value = {username}
                onChangeText={(text) => setusername(text)}
            />

            <TextInput 
                secureTextEntry = {true}
                placeholder="Password"
                style = {styles.input2}
                value={password}
                onChangeText={(text)=> setPassword(text)}
            />

            <Pressable
                onPress={onPress}
                style={styles.button}
            >
                <Text
                   style={styles.buttonText}             
                >SIGN IN</Text> 
            </Pressable>

            {/* <Text
                style={styles.text2}
            >
                Don't have an account? Sign Up
            </Text> */}

            <TouchableOpacity
                style={styles.signupbutton}
                onPress={()=>navigation.navigate('Signup')}
            >
                <Text
                    style={styles.signupbuttonText}
                >
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: 375,
        height: 812, 
    },
    logo:{
        position: 'absolute',
        width: 91,
        height: 18.8,
        left: 142,
        top: 79.59,
    },
    text:{
        position: 'absolute',
        width: 183,
        height: 19,
        left: 97,
        top: 178,
        // fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 19,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.1,
        color: '#172578',
    },
    input1:{
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 234,
        borderRadius: 39,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#8B91AB',
        padding: 10,
    },
    input2:{
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 302,
        borderRadius: 39,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#8B91AB',
        padding: 10,
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 104,
        paddingRight: 104,
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 380,
        borderRadius: 36,
        backgroundColor: '#172578',
    },
    buttonText:{
        color: "#F7F9FF",
    },
    text2:{
        position: 'absolute',
        width: 220,
        height: 19,
        left: 81,
        top: 580,
        // fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.1,
        color: '#172578',
    },
    signupbutton:{
        position: 'absolute',
        backgroundColor: '#fff',
        top: 500,
        width: 220,
        height: 19,
        left: 81,
    },
    signupbuttonText:{
        color:'#172578',
        fontWeight: 'normal',
        fontSize: 14,
        letterSpacing: 0.1,
    }
}) 

export default SigninScreen;