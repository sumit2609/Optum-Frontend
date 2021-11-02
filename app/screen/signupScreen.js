import React,{useState} from 'react'
import { View,StyleSheet,Image, TextInput,Text, Pressable, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const SignupScreen = ({navigation}) => {
    const [firstname,setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [usertype,setusertype] = useState("");

    const onPress = (e) =>{
        e.preventDefault();
        console.log("click")
        const user = {
            username : username,
            user_type : usertype,
            firstName : firstname,
            lastName : lastname,
            password : password
        };

        axios.post("https://optum-backend-deploy.herokuapp.com/users/signup",user).then((res) => {
            alert("user registered successfully");
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
                Create Your Account
            </Text>

            <TextInput 
                placeholder="FirstName"
                style = {styles.input1}
                value={firstname}
                onChangeText={(text) => setfirstname(text)}
                
            />

            <TextInput 
                placeholder="LastName"
                style = {styles.input2}
                value={lastname}
                onChangeText={(text) => setlastname(text)}

            />

            <TextInput 
                placeholder="Username"
                style = {styles.input3}
                value={username}
                onChangeText={(text) => setusername(text)}
            />  

            <TextInput 
                secureTextEntry = {true}
                placeholder="Password"
                style = {styles.input4}
                value={password}
                onChangeText={(text) => setpassword(text)}
            />

            <TextInput 
                placeholder="UserType"
                style = {styles.input5}
                value={usertype}
                onChangeText={(text) => setusertype(text)}
            /> 

            <Pressable
                onPress={onPress}
                style={styles.button}
            >
                <Text
                   style={styles.buttonText}             
                >SIGN UP</Text>
            </Pressable>

            {/* <Pressable
                onPress={()=>navigation.navigate('Signin')}
            >
                <Text
                    style={styles.text2}
                >
                    Already have an account? Signin 
                </Text>
            </Pressable> */}
        
            <TouchableOpacity
                style={styles.signinbutton}
                onPress={()=>navigation.navigate('Signin')}
            >
                <Text
                    style={styles.signinbuttonText}
                >
                    Already have an account? Sign In
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
        top: 50.59,
    },
    text:{
        position: 'absolute',
        width: 183,
        height: 19,
        left: 97,
        top: 100,
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
        top: 160,
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
        top: 220,
        borderRadius: 39,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#8B91AB',
        padding: 10,
    },
    input3:{
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 280,
        borderRadius: 39,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#8B91AB',
        padding: 10,
    },
    input4:{
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 340,
        borderRadius: 39,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#8B91AB',
        padding: 10,
    },
    input5:{
        position: 'absolute',
        width: 264,
        height: 48,
        left: 56,
        top: 400,
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
        top: 460,
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
        top: 623,
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
    signinbutton:{
        position: 'absolute',
        backgroundColor: '#fff',
        top: 540,
        width: 220,
        height: 19,
        left: 81, 
    },
    signinbuttonText:{
        color:'#172578',
        fontWeight: 'normal',
        fontSize: 14,
        letterSpacing: 0.1,
    }
})

export default SignupScreen
